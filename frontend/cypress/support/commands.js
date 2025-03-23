// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

/**
 * Custom command to drag and drop elements
 * 
 * @param {string} dragSelector - Selector for the element to drag
 * @param {string} dropSelector - Selector for the target drop area
 */
Cypress.Commands.add('dragAndDrop', (dragSelector, dropSelector) => {
  // Get the drag element
  cy.get(dragSelector).first().then($dragElement => {
    // Get the drop element
    cy.get(dropSelector).first().then($dropElement => {
      // Get coordinates
      const dragRect = $dragElement[0].getBoundingClientRect();
      const dropRect = $dropElement[0].getBoundingClientRect();
      
      // Calculate center coordinates
      const dragX = dragRect.left + dragRect.width / 2;
      const dragY = dragRect.top + dragRect.height / 2;
      const dropX = dropRect.left + dropRect.width / 2;
      const dropY = dropRect.top + dropRect.height / 2;
      
      // Start drag operation
      cy.get(dragSelector)
        .first()
        .trigger('mousedown', { which: 1, pageX: dragX, pageY: dragY })
        .trigger('mousemove', { which: 1, pageX: dragX + 10, pageY: dragY + 10 })
        .trigger('mousemove', { which: 1, pageX: dropX, pageY: dropY });
      
      // Drop element
      cy.get(dropSelector)
        .first()
        .trigger('mouseup', { which: 1, force: true });
    });
  });
}); 