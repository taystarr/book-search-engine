const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }
  type Auth {
    token: ID!
    user: User
  }
  type Book {
    // or string??
    bookId: ID!
    authors: [String]
    description: String
    title: String!
    image: String
  }
  input bookInput {
    bookId: String
    authors: [String]
    title: String
    description: String
    image: String
  }
  input userInput {
    _id: ID!
    username: String!
    email: String!
  }
  type Query {
    me: User
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(userInput: userInput!, newBook: bookInput!): User
    deleteBook(userInput: userInput!, bookId: ID!): User
  }
`;

module.exports = typeDefs;