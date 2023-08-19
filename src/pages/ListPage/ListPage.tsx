import { useLazyLoadQuery } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import type { ListPageQuery as ListPageQueryType } from "./__generated__/ListPageQuery.graphql";
import { uniqueId } from "lodash-es";
import "./ListPage.scss";
import { KeyboardEvent, useState } from "react";
import { List } from "../../component";
import { InputText } from "primereact/inputtext";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";

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
  const [first, setFirst] = useState(0);
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(20);
  const [query, setQuery] = useState("a");

  const data = useLazyLoadQuery<ListPageQueryType>(ListPageQuery, {
    query,
    first: 100,
  });
  const listData = data.search.edges;

  function onPageChange(event: PaginatorPageChangeEvent) {
    setFirst(event.first);
    setRows(event.rows);
    setPage(event.page);
  }

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
        <Paginator
          first={first}
          rows={rows}
          totalRecords={100}
          onPageChange={onPageChange}
        />
        {listData.slice(page * rows, (page + 1) * rows).map((list) => (
          <List key={uniqueId("list")} node={list.node}></List>
        ))}
      </div>
    </div>
  );
}
