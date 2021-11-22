// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Formar mais trabalhosa do comando de login
/*Cypress.Commands.add('login', () => {
    cy.get('input[type=email]').type('scavalcante@mail.com');
    cy.get('input[type=password]').type('Cavalcante456');
    cy.get('button[type=submit').click();

})
*/

//Comando para extrair e set as informações obtidas pelo o token no localstorage
Cypress.Commands.add('login', () => {
//Estou pegando as informações do comando token e setando as informações para realizar o login
    cy.token().then(response => {
//Desestruturando a resposta para obter só o que eu quero        
        const { token, user } = response.body.data.login
//Definindo o nome do  LocalStorage
        window.localStorage.setItem('token', token)
//Definindo o LoccalStorage para o user fazendo a "Stringify"        
        window.localStorage.setItem('user', JSON.stringify(user))
    })
})

//Comando token para obter as informações do usuário via requisição
Cypress.Commands.add('token', () => {
    cy.request({
        method: 'POST',
//Devemos adicionar ao Url do backend essas informações
//encontramos no Network "Headers" e "Payload"        
        url: `${Cypress.env('apiUrl')}`,
        body: {
            "operationName": "login",
            "variables": {
                "email": "scavalcante@mail.com",
                "password": "Cavalcante456"
            },
//Esses informações são do request Payload            
            "query": "mutation login($email: String!, $password: String!) {\n  login(email: $email, password: $password) {\n    token\n    user {\n      id\n      handle\n      avatar\n      fullname\n      __typename\n    }\n    __typename\n  }\n}\n"
        }
    })
})