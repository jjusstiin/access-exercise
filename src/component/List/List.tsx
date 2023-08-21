import * as React from "react";
import defaultUserImage from "../../assets/images/default-user-image.png";
import clsx from "clsx";
import Admin from "./../Admin/Admin";
import { useFragment } from "react-relay";
import { Card } from "primereact/card";
import { ListFragment } from "./ListFragment";
import type {
  ListFragment$data,
  ListFragment$key,
} from "./__generated__/ListFragment.graphql";
import "./List.scss";

type Props = {
  node: ListFragment$key;
  onClick: (data: ListFragment$data) => void;
};

export default function List({ node, onClick }: Props): React.ReactElement {
  const data = useFragment(ListFragment, node);

  function handleUserDetail() {
    onClick(data);
  }

  return (
    <Card
      onClick={handleUserDetail}
      className={clsx("page-card", {
        "page-card__available": data.login,
      })}
    >
      <div className="list flex align-content-center">
        <img
          alt=""
          src={data.avatarUrl ?? defaultUserImage}
          className="list__image"
        />
        {data.login ? (
          <div className="ml-3">
            <div className="list__login">{data.login}</div>
            <Admin admin={data.isSiteAdmin}></Admin>
          </div>
        ) : (
          <div className="list__unavailable ml-3">User Not available</div>
        )}
      </div>
    </Card>
  );
}
