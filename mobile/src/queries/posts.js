import { gql } from "@apollo/client";

export const GET_POSTS = gql`
    query Query {
        posts {
            _id
            title
            body
            user {
                _id
                username
            }
        }
    }
`;
