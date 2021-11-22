/// <reference types="cypress" />

/*
    1. O que está sendo testado? Twitter Clone, Login
    2. Sob que circustâncias, condições? Ao autenticar com credenciais válidas
    3. Qual o resultado esperado? Deve ser direncionado para o feed
*/

describe("Twitter Clone - Login", () => {
    //esse comando será executado antes de cada teste
    beforeEach(() => {
        //serve para apilidar uma requisição mapeada ou dizer o que a requisição deve retornar (mock)
        //estão isolando um fator externo
        //primeira parte do comando é o RouteMatcher
        cy.intercept({
            method: 'GET',
            hostname: 'res.cloudinary.com'
        //segunda parte do comando é o RouteHandle    
        }, {
            statusCode: 200,
            fixture: 'sonic'
        }).as('cloudinary')
    });


    it("Ao autenticar com credencias válidas, deve ser direcionado para o feed", () => {
        //utilizando o commands (comando personalizado)
        //dessa forma ele não passa pela a tela de login
        cy.login();

        //comando para acessar uma pagina que está no arquivo cypress.json
        cy.visit('/');

        //adicioando asserções
        //estaremos verificando se o menu está sendo carregado
        cy.get('nav ul li')
            //o menu deve está visivel
            .should('be.visible')
            //o menu deve conter 6 itens    
            .and('have.length', 6)
    });
});