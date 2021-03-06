context('Busca pelo CEP', () => {
    beforeEach(() => {
        cy.visit('/encontrar-diarista');
    });
    it('botao desabilitado e habilitado', () => {
        cy.get('#mui-1').type('1234567');
        const button = cy.get('button').contains(/buscar/i);
        button.should('be.disabled');

        cy.get('#mui-1').type('57038485');
        button.should('not.be.disabled');
    });

    it('buscar cep', () => {
        cy.get('#mui-1').type('57038485');
        cy.get('button')
            .contains(/buscar/i)
            .click();
    });
});
