describe('Test name input', () => {
    it ('Check contains', () => {
        cy.intercept('GET', 'api/game/easy', { fixture: '/map/easy.json' }).as('getBoards');
        cy.intercept(`GET`, `api/leaderboard/easy/0`, { fixture: '/game/easy.json' }).as('getLeaderboard');

        cy.visit('/');
        cy.url().should('include', '/menu');

        cy.get('.mat-form-field-type-mat-input > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').type('foooooooooooooo')
        cy.get('.board').click();
        cy.get('div.mat-form-field-flex').type('{selectall}{backspace} hoang');
    })
})