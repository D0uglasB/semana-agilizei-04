/*
Esse arquivo é a documentação dos comandos customizados
com esse documento conseguimos usalos uisando o autocomplit
*/

declare namespace Cypress {
    interface Chainable {
  
      /**
       * @example cy.login()
       */
      login(): void
  
      /**
       * @example cy.token()
       */
  
      token(): void
  
    }
  }