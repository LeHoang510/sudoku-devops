describe('Test a full game', () => {
  it ('Check contains', () => {
    cy.intercept('GET', 'api/game/easy', { fixture: '/map/easy.json' }).as('getBoards');
    cy.intercept('GET', 'api/game/hard', { fixture: '/map/hard.json' }).as('getBoards');
    cy.intercept('GET', 'api/game/inhuman', { fixture: '/map/inhuman.json' }).as('getBoards');
    cy.intercept('GET', 'api/game/insane', { fixture: '/map/insane.json' }).as('getBoards');
    cy.intercept('GET', 'api/game/medium', { fixture: '/map/medium.json' }).as('getBoards');
    cy.intercept('GET', 'api/game/very-hard', { fixture: '/map/very-hard.json' }).as('getBoards');


    cy.intercept(`GET`, `api/leaderboard/easy/0`, { fixture: '/game/easy.json' }).as('getLeaderboard');
    cy.intercept('GET', 'api/leaderboard/hard/0', { fixture: '/game/hard.json' }).as('getBoards');
    cy.intercept('GET', 'api/leaderboard/inhuman/0', { fixture: '/game/inhuman.json' }).as('getBoards');
    cy.intercept('GET', 'api/leaderboard/insane/0', { fixture: '/game/insane.json' }).as('getBoards');
    cy.intercept('GET', 'api/leaderboard/medium/0', { fixture: '/game/medium.json' }).as('getBoards');
    cy.intercept('GET', 'api/leaderboard/very-hard/0', { fixture: '/game/very-hard.json' }).as('getBoards');

    cy.visit('/');
    cy.url().should('include', '/menu');

    cy.contains('Sudoku');
    cy.contains('With suggestions (prevent recording the score)');
    cy.contains('Select a map to play or replay with');
    cy.contains('Player name');
    cy.contains('Generate random board');

    cy.get('.mat-form-field-type-mat-input > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').type('foooooooooooooo')

    for(let i = 0; i < 6; i++){
      cy.get('.box-map > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').click();
      cy.get('#mat-option-'+i).click();
    }
    cy.get('.box-map > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').click();
    cy.get('#mat-option-0').click();

    cy.get('.mat-checkbox-inner-container').click();

    cy.contains('Click on a Sudoku board to launch the game with.');

    cy.get('.board').click();

    ///////////////////////////////////////////////////////////

    cy.contains('Sudoku');
    // cy.contains('return to menu');
    cy.contains('HISTORY');
    cy.contains('undo');
    cy.contains('redo');
    cy.get('.buttonRanking').click();
    cy.contains('Top 5 Scores');
    cy.contains('Rank');
    cy.contains('Name');
    cy.contains('Score');
    cy.get('body').click(100,100, {multiple: true});
    cy.get('body').click(100,100, {multiple: true});

    cy.contains('Sudoku');
    cy.contains('HISTORY');
    cy.contains('undo');
    cy.contains('redo');

    ///////////////////////////////////////////////////////////

    cy.get('div.mat-form-field-flex').type('{selectall}{backspace} hoang');

    cy.get('#mat-select-2 > .mat-select-trigger').click();
    cy.get('span.mat-option-text').contains('5').click();

    cy.get('button.button-undo-redo').contains('undo').click();
    cy.get('button.button-undo-redo').contains('redo').click();
    cy.get('[style="left: 10px; top: 10px;"] > div > img').click();

    const input: string = "000342850000079420284061739973186540000234978802957613000790284398425167427618395";
    const arrayOfInput: string[] = Array.from(input);
    const res: string = "719342856536879421284561739973186542165234978842957613651793284398425167427618395";
    const arrayOfRes: string[] = Array.from(res);

    let count = 1;

    for(let i = 0; i < arrayOfInput.length; i++){
      if(parseInt(arrayOfInput[i]) === 0){
        let box='#mat-select-'+count*2+' > .mat-select-trigger';
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
    cy.url().should('include', '/menu');
  });
})

