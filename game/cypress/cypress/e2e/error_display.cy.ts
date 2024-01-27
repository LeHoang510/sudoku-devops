describe('Test error display', () => {
    beforeEach(() => {
        cy.intercept('GET', 'game/easy', { fixture: '/map/easy.json' }).as('getBoards');
        cy.intercept(`GET`, `leaderboard/easy/0`, { fixture: '/game/easy.json' }).as('getLeaderboard');
        cy.visit('/');
        cy.url().should('include', '/menu');

        cy.get('.board').click();
    })
    it ('Check row', () => {

        ///////////////////////////////////////////////////////////
        cy.get('#mat-select-2 > .mat-select-trigger').click();
        cy.get('span.mat-option-text').contains('5').click();
        cy.get('[style="left: calc(77.7778% + 0.777778px); width: calc(11.1111% - 0.888889px); margin-top: 0px; padding-top: calc(11.1111% - 0.888889px);"] > .mat-grid-tile-content > .ng-star-inserted').should('have.css','background-color','rgb(240, 128, 128)');
    });
    it ('Check col', () => {

        ///////////////////////////////////////////////////////////

        cy.get('#mat-select-2 > .mat-select-trigger').click();
        cy.get('span.mat-option-text').contains('9').click();
        cy.get('[style="left: 0px; width: calc(11.1111% - 0.888889px); margin-top: calc(33.3333% + 0.333333px); padding-top: calc(11.1111% - 0.888889px);"] > .mat-grid-tile-content > .ng-star-inserted').should('have.css','background-color','rgb(240, 128, 128)');
    });
    it ('Check square', () => {

        ///////////////////////////////////////////////////////////

        cy.get('#mat-select-2 > .mat-select-trigger').click();
        cy.get('span.mat-option-text').contains('4').click();
        cy.get('[style="left: 0px; width: calc(11.1111% - 0.888889px); margin-top: calc(88.8889% + 0.888889px); padding-top: calc(11.1111% - 0.888889px);"] > .mat-grid-tile-content > .ng-star-inserted').should('have.css','background-color','rgb(240, 128, 128)');

    });
})

