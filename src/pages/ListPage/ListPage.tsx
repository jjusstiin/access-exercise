import { useLazyLoadQuery, useRefetchableFragment } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import type { ListPageQuery as ListPageQueryType } from "./__generated__/ListPageQuery.graphql";
import { uniqueId } from "lodash-es";
import "./ListPage.scss";
import { ChangeEvent, useState, useTransition } from "react";
import { List } from "../../component";
import { InputText } from "primereact/inputtext";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import type { ListPageFragment$key } from "./__generated__/ListPageFragment.graphql";
import { ProgressSpinner } from "primereact/progressspinner";

const ListPageQuery = graphql`
  query ListPageQuery {
    ...ListPageFragment
  }
`;

const ListPageFragment = graphql`
  fragment ListPageFragment on Query
  @refetchable(queryName: "ListPageRefetchQuery")
  @argumentDefinitions(query: { type: "String", defaultValue: "a" }) {
    search(query: $query, type: USER, first: 100) {
      edges {
        node {
          ...ListFragment
        }
      }
    }
  }
`;

export default function ListPage(): React.ReactElement {
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState("");
  const [first, setFirst] = useState(0);
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(20);

  const data = useLazyLoadQuery<ListPageQueryType>(ListPageQuery, {});

  const [userListData, refetch] = useRefetchableFragment(
    ListPageFragment,
    data as ListPageFragment$key
  );

  const listData = userListData.search.edges;

  function onPageChange(event: PaginatorPageChangeEvent) {
    setFirst(event.first);
    setRows(event.rows);
    setPage(event.page);
  }

  function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.trim();
    setValue(value);
    onPageChange({ first: 0, rows: 20, page: 0, pageCount: 0 });
    startTransition(() => {
      refetch({ query: value ? value : "a" });
    });
  }

  return (
    <div className="list-page flex justify-content-center">
      <div>
        <div
          className="p-input-icon-left mt-3 mb-2 flex align-items-center"
          style={{ width: "500px" }}
        >
          <i className="pi pi-search" />

          <InputText
            placeholder="Enter Account"
            value={value}
            onChange={(e) => handleSearchChange(e)}
          />
          {isPending && (
            <span>
              <ProgressSpinner
                style={{
                  width: "30px",
                  height: "30px",
                  right: "120%",
                }}
                animationDuration=".5s"
              />
            </span>
          )}
        </div>
        <div>
          <Paginator
            first={first}
            rows={rows}
            totalRecords={Math.min(listData.length, 100)}
            onPageChange={onPageChange}
          />
        </div>
        {listData.length ? (
          listData
            .slice(page * rows, (page + 1) * rows)
            .map((list) => (
              <List key={uniqueId("list")} node={list.node}></List>
            ))
        ) : (
          <div>No Result</div>
        )}
      </div>
    </div>
  );
}
