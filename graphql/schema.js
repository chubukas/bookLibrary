const { gql } = require("apollo-server-express");

module.exports = gql`
  type Book {
    id: ID!
    title: String!
    author: Author!
    addedBy: User!
  }

  type AddedBooks {
    id: ID!
    title: String!
    author: Author!
  }

  type Author {
    firstname: String!
    lastname: String
    email: String
  }

  type User {
    id: ID!
    username: String!
    email: String!
    addedBooks: [AddedBooks]!
  }

  input signupInput {
    username: String!
    email: String!
    password: String!
    comfirmPassword: String!
  }

  enum bookResponse {
    Book
    String
  }

  type Query {
    books: [Book!]!
    book(id: ID!): Book!
    users: [User!]!
    user(id: ID!): User!
  }

  type Mutation {
    addBook(
      title: String!
      authorFirstname: String!
      authorLastname: String!
      authorEmail: String
    ): Book!
    updateBook(id: ID!, title: String!, author: String): Book!
    deleteBook(id: ID!): Boolean!
    signUp(inputs: signupInput): String!
    signIn(UserNameOrEmail: String!, password: String!): String!
  }
`;
