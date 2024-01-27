describe('Test get board', () => {
    it ('Check get board', () => {
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
        cy.intercept('GET', 'api/leaderboard/very-hard/0', { fixture: '/game/very-hard.json' }).as('getBoards'); cy.intercept('GET', 'api/game/easy', { fixture: '/map/easy.json' }).as('getBoards');
        cy.intercept(`GET`, `api/leaderboard/easy/0`, { fixture: '/game/easy.json' }).as('getLeaderboard');

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