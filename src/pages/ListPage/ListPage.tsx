import { useLazyLoadQuery } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import type { ListPageQuery as ListPageQueryType } from "./__generated__/ListPageQuery.graphql";
import { uniqueId } from "lodash-es";
import "./ListPage.scss";
import { KeyboardEvent, useState } from "react";
import { List } from "../../component";
import { InputText } from "primereact/inputtext";

const ListPageQuery = graphql`
  query ListPageQuery($query: String!, $first: Int) {
    search(query: $query, type: USER, first: $first) {
      edges {
        node {
          ...ListFragment
        }
      }
    }
  }
`;

export default function ListPage(): React.ReactElement {
  const [value, setValue] = useState("");
  const [query, setQuery] = useState("a");
  const first = 100;

  const data = useLazyLoadQuery<ListPageQueryType>(ListPageQuery, {
    query,
    first,
  });
  const listData = data.search.edges;

  function handleKeyPress(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      setValue("");
      alert((e.target as HTMLInputElement).value);
    }
  }

  return (
    <div className="list-page flex justify-content-center">
      <div>
        <span className="p-input-icon-left mt-3 mb-2">
          <i className="pi pi-search" />
          <InputText
            placeholder="Enter Account"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => handleKeyPress(e)}
          />
        </span>
        {listData.map((list) => (
          <List key={uniqueId("list")} node={list.node}></List>
        ))}
      </div>
    </div>
  );
}
