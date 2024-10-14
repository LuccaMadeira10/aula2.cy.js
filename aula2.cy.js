describe("Teste de criação, registro, login e exclusão", () => {
    
    it("Teste criação de usuario com sucesso", () => {
        cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
        cy.get('#firstName').type('lucca')
        cy.get('#lastName').type('mad')
        cy.get('#username').type('lucca')
        cy.get('#password').type('Lucca1960')
        cy.get('.btn-primary').click()
        cy.get('h1.ng-binding').should('contain.text', 'Registration successful')
    })

    it.skip("Teste criação de usuario com falha", () => {
        cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
        cy.get('.btn-link').click()
        cy.get('#firstName').type('lucca')
        cy.get('#lastName').type('mad')
        cy.get('#username').type('lucca')
        cy.get('#password').type('Lucca1960')
        cy.get('.btn-primary').click()
        cy.get('.btn-primary').should('be.disabled')
    })

    it("Teste de login com sucesso", () => {
        let infos = criarUser()
        cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
        cy.get('#username').type(infos[0])
        cy.get('#password').type(infos[1])
        cy.get('.btn-primary').click()
        cy.get('h1.ng-binding').should('contain.text', infos[0])
    })

    it("Teste de exclusão de item com sucesso", () => {
        let infos = criarUser()
        cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
        cy.get('#username').type(infos[0])
        cy.get('#password').type(infos[1])
        cy.get('.btn-primary').click()

        // Simula a exclusão de um item com sucesso
        cy.get('.btn-delete').click()
        cy.get('.item').should('not.exist')
    })

    it("Teste de exclusão do mesmo item duas vezes", () => {
        let infos = criarUser()
        cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
        cy.get('#username').type(infos[0])
        cy.get('#password').type(infos[1])
        cy.get('.btn-primary').click()

        // Exclui o item uma vez
        cy.get('.btn-delete').click()
        cy.get('.item').should('not.exist')

        // Tenta excluir o mesmo item novamente
        cy.get('.btn-delete').click()  // Aqui pode ser simulada a falha ao tentar excluir algo que já não existe
        cy.get('.error-message').should('contain.text', 'Item não encontrado') // Mensagem de erro esperada
    })
})

function criarUser() {
    let hora = new Date().getHours().toString()
    let minuto = new Date().getMinutes().toString()
    let seg = new Date().getSeconds().toString()
    let ID = hora + minuto + seg + "ID"
    let Senha = hora + minuto + seg + "Senha"
    let infos = [ID, Senha]

    cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
    cy.get('.btn-link').click()
    cy.get('#firstName').type(ID)
    cy.get('#lastName').type(ID)
    cy.get('#username').type(ID)
    cy.get('#password').type(Senha)
    cy.get('.btn-primary').click()
    cy.get('h1.ng-binding').should('contain.text', 'Registration successful')

    return infos
}
