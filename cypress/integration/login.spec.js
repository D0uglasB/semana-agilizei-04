/// <reference types="cypress" />

/*
    1. O que está sendo testado? Twitter Clone, Login
    2. Sob que circustâncias, condições? Ao autenticar com credenciais válidas
    3. Qual o resultado esperado? Deve ser direncionado para o feed
*/

describe("Twitter Clone - Login", () => {
    it("Ao autenticar com credencias válidas, deve ser direcionado para o feed", () => {
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

        //comando para acessar uma pagina
        cy.visit('https://twitter-clone-example.herokuapp.com/');

        //get comando para encontrar objeto em pagina usando seletor
        //type comando para escrever
        //click comando para clicar
        cy.get('input[type=email]').type('scavalcante@mail.com');
        cy.get('input[type=password]').type('Cavalcante456');
        cy.get('button[type=submit').click();

        //adicioando asserções
        //estaremos verificando se o menu está sendo carregado
        cy.get('nav ul li')
            //o menu deve está visivel
            .should('be.visible')
            //o menu deve conter 6 itens    
            .and('have.length', 6)
    });
});