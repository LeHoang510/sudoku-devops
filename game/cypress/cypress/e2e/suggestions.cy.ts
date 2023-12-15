describe('Suggestion Test', () => {
  it ('Check contains', () => {
    cy.intercept('GET', '/game/easy', { fixture: '/easy.json' }).as('getBoards');

    cy.visit('/');
    cy.contains('Sudoku');
    cy.contains('With suggestions (prevent recording the score)');
    cy.contains('Select a map to play or replay with');
    cy.contains('Player name');
    cy.contains('Generate random board');

    cy.contains('easy').click();
    cy.contains('hard').click();
    cy.contains('hard').click();
    cy.contains('inhuman').click();
    cy.contains('inhuman').click();
    cy.contains('insane').click();
    cy.contains('insane').click();
    cy.contains('medium').click();
    cy.contains('medium').click();
    cy.contains('very-hard').click();
    cy.contains('very-hard').click();
    cy.contains('easy').click();

    cy.get('span.mat-checkbox-inner-container').click();

    cy.contains('Click on a Sudoku board to launch the game with.');

    cy.get('div.board').click();

    ///////////////////////////////////////////////////////////

    cy.contains('Sudoku');
    cy.contains('return to menu');
    cy.contains('HISTORY');
    cy.contains('undo');
    cy.contains('redo');
    cy.get('button.buttonRanking').click();
    cy.contains('Top 5 Scores');
    cy.contains('Rank');
    cy.contains('Name');
    cy.contains('Score');

  });
})
