describe('Test play game', () => {
  it ('Check contains', () => {
    cy.intercept('GET', '/game/easy', { fixture: '/map/easy.json' }).as('getBoards');
    cy.intercept('GET', '/game/hard', { fixture: '/map/hard.json' }).as('getBoards');
    cy.intercept('GET', '/game/inhuman', { fixture: '/map/inhuman.json' }).as('getBoards');
    cy.intercept('GET', '/game/insane', { fixture: '/map/insane.json' }).as('getBoards');
    cy.intercept('GET', '/game/medium', { fixture: '/map/medium.json' }).as('getBoards');
    cy.intercept('GET', '/game/very-hard', { fixture: '/map/very-hard.json' }).as('getBoards');


    cy.intercept(`GET`, `/leaderboard/easy/0`, { fixture: '/game/easy.json' }).as('getLeaderboard');
    cy.intercept('GET', '/leaderboard/hard/0', { fixture: '/game/hard.json' }).as('getBoards');
    cy.intercept('GET', '/leaderboard/inhuman/0', { fixture: '/game/inhuman.json' }).as('getBoards');
    cy.intercept('GET', '/leaderboard/insane/0', { fixture: '/game/insane.json' }).as('getBoards');
    cy.intercept('GET', '/leaderboard/medium/0', { fixture: '/game/medium.json' }).as('getBoards');
    cy.intercept('GET', '/leaderboard/very-hard/0', { fixture: '/game/very-hard.json' }).as('getBoards');

    cy.visit('/');
    cy.contains('Sudoku');
    cy.contains('With suggestions (prevent recording the score)');
    cy.contains('Select a map to play or replay with');
    cy.contains('Player name');
    cy.contains('Generate random board');

    cy.get('div.mat-form-field-infix.ng-tns-c49-0').type('foooooooooooooo')

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
    // cy.contains('return to menu');
    cy.contains('HISTORY');
    cy.contains('undo');
    cy.contains('redo');
    cy.get('button.buttonRanking').click();
    cy.contains('Top 5 Scores');
    cy.contains('Rank');
    cy.contains('Name');
    cy.contains('Score');
    cy.get('body').dblclick(100,100);

    cy.contains('Sudoku');
    cy.contains('HISTORY');
    cy.contains('undo');
    cy.contains('redo');

    ///////////////////////////////////////////////////////////

    cy.get('div.mat-form-field-flex').type('{selectall}{backspace} hoang');

    const input: string = "000342850000079420284061739973186540000234978802957613000790284398425167427618395";
    const arrayOfInput: string[] = Array.from(input);
    const res: string = "719342856536879421284561739973186542165234978842957613651793284398425167427618395";
    const arrayOfRes: string[] = Array.from(res);

    let count = 0;

    for(let i = 0; i < arrayOfInput.length; i++){
      if(parseInt(arrayOfInput[i]) === 0){
        let box= "div.mat-select-value.ng-tns-c84-" + (4+count);
        cy.get(box).click();
        cy.get("span.mat-option-text").contains(arrayOfRes[i]).click();
        count++;
      }
    }

    /////////////////////////////////////////////////////////////

    cy.contains("END GAME hoang !!!");
    cy.contains("Score: ");
    cy.contains("return to menu");
    cy.get("span.mat-button-wrapper").click();
  });
})

