# Cypress E2E Tests

This directory contains the End-to-End (E2E) tests for our frontend application using Cypress.

## Structure

```
cypress/
├── e2e/            # Test files
│   └── position.spec.js   # Position page tests
├── support/        # Support files
│   ├── commands.js        # Custom commands
│   └── e2e.js             # Configuration for E2E tests
└── fixtures/       # Test data (when needed)
```

## Running Tests

To run the Cypress tests, use one of the following commands:

```bash
# Open Cypress in interactive mode
npm run cypress

# Run tests in headless mode
npm run cypress:run
```

## Position Page Tests

The `position.spec.js` file contains tests for the Position page, specifically:

1. **Page Load Verification**: Checks that the title, columns, and candidate cards load correctly
2. **Drag and Drop Functionality**: Tests that candidates can be moved between phases via drag and drop

### Test Requirements

To run these tests successfully, ensure:

1. The application is running locally at `http://localhost:3000`
2. A test position with ID `1` exists in the system
3. The position has at least one candidate in one of its phases

## Custom Commands

We've added a custom `dragAndDrop` command that simplifies testing drag-and-drop functionality. 
Use it like this:

```javascript
cy.dragAndDrop(sourceSelector, targetSelector);
```

## Data Attributes

The tests rely on the following data attributes:

- `data-testid="stage-column"` on each column representing a stage/phase
- `data-testid="candidate-card"` on each candidate card
- `data-candidate-id` with the candidate ID value on each candidate card

These attributes should not be removed or changed without updating the tests. 