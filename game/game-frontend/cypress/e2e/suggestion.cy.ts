describe('Suggestion Test', () => {
  it ('Check contains', () => {
    cy.get("[(ngModel)]=gameService.game.player").contains("sudoku")
    cy.contains("With suggestions (prevent recording the score)")
    cy.contains("Select a map to play or replay with:")
    cy.contains("Generate random map")

  });
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('app is running!')
  })
})
