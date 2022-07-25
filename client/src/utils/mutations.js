import { gql } from '@apollo/client';

// addUser
export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
                email
                bookCount
                savedBooks {
                    authors
                    bookId
                    title
                    description
                    image
                    link
                }
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
    mutation saveBook($newBook: bookInput!) {
        saveBook(newBook: $newBook) {
            username
            _id
            email
            savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;

// deleteBook
export const DELETE_BOOK = gql`
  mutation deleteBook($bookId: ID!) {
    deleteBook(bookId: $bookId) {
      username
      _id
      email
      savedBooks {
        bookId
        authors
        title
        description
        image
        link
      }
    }
  }
`;