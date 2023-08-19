import * as React from "react";
import "./List.scss";
import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import type { ListFragment$key } from "./__generated__/ListFragment.graphql";
import Admin from "./../Admin/Admin";
import { Card } from "primereact/card";

const ListFragment = graphql`
  fragment ListFragment on SearchResultItem {
    ... on User {
      id
      isSiteAdmin
      avatarUrl
      login
      url
    }
  }
`;

type Props = {
  node: ListFragment$key;
};

export default function List({ node }: Props): React.ReactElement {
  const data = useFragment(ListFragment, node);

  return (
    <Card className="page-card">
      <div className="list flex align-content-center">
        <img
          alt=""
          src={data.avatarUrl ?? "../assets/images/default-user-image.png"}
          className="list__image"
        />
        <div className="ml-3">
          <div className="list__login">
            {data.login ?? "User Not available "}
          </div>
          <Admin admin={data.isSiteAdmin}></Admin>
        </div>
      </div>
    </Card>
  );
}
