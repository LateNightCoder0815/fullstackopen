describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Root User',
      username: 'root',
      password: 'password123'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('password123')
      cy.get('#login-button').click()

      cy.contains('Root User logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'root', password: 'password123' })
    })

    it('successfully', function() {
      cy.contains('Root User logged in')
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('My superior blog')
      cy.get('#author').type('Mr Great')
      cy.get('#url').type('http://edgeofnowhere')
      cy.contains('create').click()
      cy.contains('My superior blog')
    })

    describe('and several blogs exist', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'test 1',
          author: 'test 1',
          url: 'test 1',
          likes: 12
        })
        cy.createBlog({
          title: 'test 2',
          author: 'test 2',
          url: 'test 2',
          likes: 2
        })
        cy.createBlog({
          title: 'test 3',
          author: 'test 3',
          url: 'test 3',
          likes: 10
        })
      })
      it('A blog can be liked', function() {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('likes 13')
      })

      it('A blog can be deleted', function() {
        cy.contains('view').click()
        cy.contains('remove').click()
      })

      it('Blogs are ordered according to likes', function() {
        cy.contains('test 1').contains('view').click()
        cy.contains('test 2').contains('view').click()
        cy.contains('test 3').contains('view').click()
        cy.get('.likesDisplay').then( element => {
          const first = parseInt(element[0].childNodes[1].nodeValue)
          const second = parseInt(element[1].childNodes[1].nodeValue)
          const third = parseInt(element[2].childNodes[1].nodeValue)
          expect(first).to.be.greaterThan(second)
          expect(second).to.be.greaterThan(third)
        })
      })
    })
  })
})