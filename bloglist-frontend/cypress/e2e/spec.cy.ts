describe('Blog app', function() {

  beforeEach(function() {

    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'David Orban Jozsef',
      username: 'David',
      password: '987456123'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user) 

    cy.visit('')
  })

  it('front page can be opened', function() {
    cy.contains('Blogs')
  })

  describe('Login', function() {
    it('Successful login with right credentials', function() {
      cy.contains('Login').click()
      cy.get('#username').type('David')
      cy.get('#password').type('987456123')
      cy.get('#login-button').click()
  
      cy.contains('David Orban Jozsef is logged in')
    })

    it('Unsuccessful login witth wrong credentials', function() {
      cy.contains('Login').click()
      cy.get('#username').type('Wrong')
      cy.get('#password').type('Credentials')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'David Orban Jozsef is logged in')
    })
  })

  describe('When logged in', function() {

    beforeEach(function() {
      cy.login({username: 'David', password: '987456123'});
    })

    it('Creating a new blog', function() {
      cy.createBlog({
        author: 'Testing author field',
        title: 'Testing title field',
        url: 'Testing url field'
      })
      cy.contains('Testing title field Testing author field')
    })
    describe('A blog exists', function() {
      beforeEach(function() {
        cy.createBlog({
          author: 'Testing author field',
          title: 'Testing title field',
          url: 'Testing url field'
        })
        cy.contains('Testing title field Testing author field')
      })

      it('Liking a blog', function() {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('1')
      })
    })
  })
})