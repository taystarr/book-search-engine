import { gql } from '@apollo/client';

export const GET_ME = gql`
    query me($username: Stirng, $email: String, $_id: ID) {
        me(username: $username, email: $email,  _id: $_id) {
            savedBooks {
                bookId
                authors
                description
                title
                image
            }
        }
    }
`;