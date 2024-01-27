describe('Test get board', () => {
    it ('Check get board', () => {
        cy.intercept('GET', 'game/easy', { fixture: '/map/easy.json' }).as('getBoards');
        cy.intercept('GET', 'game/hard', { fixture: '/map/hard.json' }).as('getBoards');
        cy.intercept('GET', 'game/inhuman', { fixture: '/map/inhuman.json' }).as('getBoards');
        cy.intercept('GET', 'game/insane', { fixture: '/map/insane.json' }).as('getBoards');
        cy.intercept('GET', 'game/medium', { fixture: '/map/medium.json' }).as('getBoards');
        cy.intercept('GET', 'game/very-hard', { fixture: '/map/very-hard.json' }).as('getBoards');


        cy.intercept(`GET`, `leaderboard/easy/0`, { fixture: '/game/easy.json' }).as('getLeaderboard');
        cy.intercept('GET', 'leaderboard/hard/0', { fixture: '/game/hard.json' }).as('getBoards');
        cy.intercept('GET', 'leaderboard/inhuman/0', { fixture: '/game/inhuman.json' }).as('getBoards');
        cy.intercept('GET', 'leaderboard/insane/0', { fixture: '/game/insane.json' }).as('getBoards');
        cy.intercept('GET', 'leaderboard/medium/0', { fixture: '/game/medium.json' }).as('getBoards');
        cy.intercept('GET', 'leaderboard/very-hard/0', { fixture: '/game/very-hard.json' }).as('getBoards'); cy.intercept('GET', 'api/game/easy', { fixture: '/map/easy.json' }).as('getBoards');
        cy.intercept(`GET`, `leaderboard/easy/0`, { fixture: '/game/easy.json' }).as('getLeaderboard');

        cy.visit('/');
        cy.url().should('include', '/menu');

        for(let i = 0; i < 6; i++){
            cy.get('.box-map > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').click();
            cy.get('#mat-option-'+i).click();
        }
        cy.get('.board').click();
        cy.url().should('include', '/board');

    })
    it ('Check generate board', () => {
        cy.intercept('GET', 'api/game/easy', { fixture: '/map/easy.json' }).as('getBoards');
        cy.intercept('GET', 'api/newgame/easy', { fixture: '/map/easy.json' }).as('getBoards');


        cy.visit('/');
        cy.url().should('include', '/menu');

        cy.contains('Generate random board').click();
        cy.url().should('include', '/board');
    })
})