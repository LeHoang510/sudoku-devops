describe('Test error display', () => {
    beforeEach(() => {
        cy.intercept('GET', 'api/game/easy', { fixture: '/map/easy.json' }).as('getBoards');
        cy.intercept(`GET`, `api/leaderboard/easy/0`, { fixture: '/game/easy.json' }).as('getLeaderboard');
        cy.visit('/');
        cy.url().should('include', '/menu');

        cy.get('.board').click();
    })
    it ('Check row', () => {

        ///////////////////////////////////////////////////////////
        cy.get('#mat-select-2 > .mat-select-trigger').click();
        cy.get('span.mat-option-text').contains('5').click();
        cy.get('[style="left: calc((11.1111% - 0.888889px + 1px) * 7); width: calc((11.1111% - 0.888889px) * 1 + 0px); margin-top: 0px; padding-top: calc((11.1111% - 0.888889px) * 1 + 0px);"] > .mat-grid-tile-content > .ng-star-inserted').should('have.css','background-color','rgb(240, 128, 128)');
    });
    it ('Check col', () => {

        ///////////////////////////////////////////////////////////

        cy.get('#mat-select-2 > .mat-select-trigger').click();
        cy.get('span.mat-option-text').contains('9').click();
        cy.get('[style="left: 0px; width: calc((11.1111% - 0.888889px) * 1 + 0px); margin-top: calc((11.1111% - 0.888889px + 1px) * 3); padding-top: calc((11.1111% - 0.888889px) * 1 + 0px);"] > .mat-grid-tile-content > .ng-star-inserted').should('have.css','background-color','rgb(240, 128, 128)');
    });
    it ('Check square', () => {

        ///////////////////////////////////////////////////////////

        cy.get('#mat-select-2 > .mat-select-trigger').click();
        cy.get('span.mat-option-text').contains('4').click();
        cy.get('[style="left: calc((11.1111% - 0.888889px + 1px) * 2); width: calc((11.1111% - 0.888889px) * 1 + 0px); margin-top: calc((11.1111% - 0.888889px + 1px) * 2); padding-top: calc((11.1111% - 0.888889px) * 1 + 0px);"] > .mat-grid-tile-content > .ng-star-inserted').should('have.css','background-color','rgb(240, 128, 128)');

    });
})

