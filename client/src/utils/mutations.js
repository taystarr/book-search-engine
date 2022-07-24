import { gql } from '@apollo/client';

// addUser
export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

// login
export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

// saveBook
export const SAVE_BOOK = gql`
    // bookInput instead of newBook??
    mutation saveBook($userInput: userInput!, $newBook: bookInput) {
        saveBook(userInput: $userInput, newBook: $newBook) {
            username
        }
    }
`;

// deleteBook
export const DELETE_BOOK = gql`
  mutation deleteBook($userInput: userInput!, $bookId: String!) {
    deleteBook(userInput: $userInput, bookId: $bookId) {
      username
    }
  }
`;