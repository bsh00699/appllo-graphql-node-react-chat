const { gql } = require('apollo-server');

module.exports = gql`
type User {
  username: String!
  createdAt: String!
  imageUrl: String!
  email: String
  token: String
  latestMessage: Message
}
type Message {
  uuid: String!
  content: String!
  to: String!
  from: String!
  createdAt: String!
}

type Query {
  getUsers: [User]!
  login (username: String! password: String!): User!
  getMessage (from: String): [Message]!
}

type Mutation {
  register (
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  ): User!
  sendMessage (
    to: String!
    content: String!
  ): Message
}
`;