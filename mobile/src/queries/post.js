import { gql } from '@apollo/client';
const GET_POSTS = gql`
  query Query {
    posts {
      _id
      userId
      title
      body
      tags
    }
  }
`;

export const GET_POST_DETAIL = gql`
  query Query($postId: ID!) {
    postById(postId: $postId) {
      _id
      userId
      title
      body
      tags
    }
  }
`;

export default GET_POSTS;