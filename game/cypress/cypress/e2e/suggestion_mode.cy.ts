describe('Test suggestion mode', () => {

    it ('Check row', () => {
        cy.intercept('GET', 'game/easy', { fixture: '/map/easy.json' }).as('getBoards');
        cy.intercept(`GET`, `leaderboard/easy/0`, { fixture: '/game/easy.json' }).as('getLeaderboard');
        cy.visit('/');
        cy.url().should('include', '/menu');

        cy.get('.mat-checkbox-inner-container').click();

        cy.get('.board').click();
        cy.get("p.ng-star-inserted").first().contains("167")
        ///////////////////////////////////////////////////////////

    });
})

