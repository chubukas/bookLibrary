const { gql } = require("apollo-server-express");

module.exports = gql`
  type Book {
    id: ID!
    title: String!
    author: User!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    books: [Book]!
  }

  type signupInput {
    username: String!
    email: String!
    password: String!
    comfirmPassword: String!
  }

  type Query {
    books: [Book!]!
    book(id: ID!): Book!
  }

  type Mutation {
    addBook(title: String!, author: String!): Book!
    updateBook(id: ID!, title: String!, author: String): Book!
    deleteBook(id: ID!): Boolean!
    signUp({...signupInput}): String!
  }
`;
