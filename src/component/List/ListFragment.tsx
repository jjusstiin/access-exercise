import graphql from "babel-plugin-relay/macro";

export const ListFragment = graphql`
  fragment ListFragment on User {
    id
    isSiteAdmin
    avatarUrl
    login
    bio
    location
    name
    websiteUrl
  }
`;
