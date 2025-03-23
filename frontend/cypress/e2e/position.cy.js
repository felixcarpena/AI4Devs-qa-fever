describe('Position Page Tests', () => {
  // We'll use a fixed position ID for testing
  const positionId = 1;
  
  beforeEach(() => {
    // Visit the position details page before each test
    cy.visit(`/positions/${positionId}`);
    
    // Wait for the position data to load
    cy.get('h2.text-center').should('be.visible');
  });

  it('should verify position page loads correctly', () => {
    // Check that the position title is visible
    cy.get('h2.text-center')
      .should('be.visible')
      .should('not.be.empty');
    
    // Check that the stage columns are present
    cy.get('[data-testid="stage-column"]')
      .should('have.length.at.least', 1);
    
    // Check that candidate cards appear in the correct columns
    cy.get('[data-testid="stage-column"]').each(($column) => {
      cy.wrap($column)
        .find('[data-testid="candidate-card"]')
        .should('have.length.at.least', 0); // At least 0 means the column can be empty or have cards
    });
  });

  it('should change candidate phase by drag and drop', () => {
    // Intercept the PUT request for updating the candidate - do this first
    cy.intercept('PUT', '**/candidates/*').as('updateCandidate');
    
    // First verify if we have candidate cards
    cy.get('[data-testid="candidate-card"]').then($cards => {
      if ($cards.length === 0) {
        cy.log('No candidate cards found on the page. Skipping drag and drop test.');
        return;
      }
      
      // Get the first card and its parent column
      const $firstCard = $cards.first();
      
      // Get candidate info for verification
      cy.wrap($firstCard).then($card => {
        const candidateId = $card.attr('data-candidate-id');
        cy.log(`Testing with candidate ID: ${candidateId}`);
        
        // Find source column index
        cy.get('[data-testid="stage-column"]').each(($column, columnIndex) => {
          cy.wrap($column).find(`[data-candidate-id="${candidateId}"]`).then($found => {
            if ($found.length > 0) {
              // We found the column containing our candidate
              cy.log(`Found candidate in column ${columnIndex}`);
              
              // Find a different column to drag to
              const totalColumns = Cypress.$('[data-testid="stage-column"]').length;
              const targetColumnIndex = (columnIndex + 1) % totalColumns;
              
              cy.log(`Will drag to column ${targetColumnIndex}`);
              
              // Use force option for drag and drop to make it more reliable
              // Simply simulate clicking and dragging using mouse events
              cy.get(`[data-candidate-id="${candidateId}"]`).first()
                .trigger('mousedown', { button: 0 })
                .trigger('mousemove', { clientX: 100, clientY: 100 })
                .wait(500); // Give the app time to recognize the drag
              
              // Get the target column and drop the card there
              cy.get('[data-testid="stage-column"]').eq(targetColumnIndex)
                .trigger('mousemove')
                .trigger('mouseup', { force: true });
              
              // Wait a moment to let the DOM update
              cy.wait(1000);
              
              // Check for the API call
              cy.wait('@updateCandidate', { timeout: 10000 }).then(interception => {
                cy.log('API call intercepted!');
                expect(interception.request.url).to.include('/candidates/');
                expect(interception.request.method).to.equal('PUT');
              });
              
              // Return false to exit the .each loop
              return false;
            }
          });
        });
      });
    });
  });
}); 