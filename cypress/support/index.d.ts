/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Click button
     * @example
     * cy.buttonClick(`[data-cy=${'643d69a5c3f7b9001cfa0940'}]`)
     */
    buttonClick(value: string): Chainable<JQuery<HTMLButtonElement>>;

    /**
     * Get modal
     * @example
     * cy.getModal()
     */
    getModal(): Chainable<JQuery<HTMLElement>>;

    /**
     * Get Ingredient
     * min index 0 
     * @example
     * cy.getIngredient(0)
     */
    getIngredient(index: number): Chainable<JQuery<HTMLElement>>;
  }
}
