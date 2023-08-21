import useUserStore from "../../stores/useUserStore";
import graphql from "babel-plugin-relay/macro";
import debounce from "lodash-es/debounce";
import { uniqueId } from "lodash-es";
import { List } from "../../component";
import { useLazyLoadQuery, useRefetchableFragment } from "react-relay";
import { generatePath, useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useState, useTransition } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import { ListFragment$data } from "../../component/List/__generated__/ListFragment.graphql";
import { InputText } from "primereact/inputtext";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import type { ListPageQuery as ListPageQueryType } from "./__generated__/ListPageQuery.graphql";
import type { ListPageFragment$key } from "./__generated__/ListPageFragment.graphql";
import "./ListPage.scss";

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
  const navigate = useNavigate();
  const { searchFirst, searchPage, searchValue, setUser, clearUser } =
    useUserStore();

  const [value, setValue] = useState("");
  const [first, setFirst] = useState(0);
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(20);

  const [isPending, startTransition] = useTransition();
  const data = useLazyLoadQuery<ListPageQueryType>(ListPageQuery, {});
  const [userListData, refetch] = useRefetchableFragment(
    ListPageFragment,
    data as ListPageFragment$key
  );
  const listData = userListData.search.edges;

  useEffect(() => {
    startTransition(() => {
      setFirst(searchFirst);
      setPage(searchPage);
      setValue(searchValue);
      refetch({ query: searchValue ? searchValue : "a" });
      clearUser();
    });
  }, []);

  function onPageChange(event: PaginatorPageChangeEvent) {
    setFirst(event.first);
    setRows(event.rows);
    setPage(event.page);
  }

  function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.trim();
    setValue(value);
    onPageChange({ first: 0, rows: 20, page: 0, pageCount: 0 });
    debouncedSearch(value);
  }

  const debouncedSearch = debounce((query) => {
    startTransition(() => {
      refetch({ query: query ? query : "a" });
    });
  }, 300);

  function handleUserDetail(data: ListFragment$data) {
    setUser({
      user: data,
      searchFirst: first,
      searchPage: page,
      searchValue: value,
    });
    navigate(generatePath("/detail"));
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
          listData.slice(page * rows, (page + 1) * rows).map((list) => (
            <div
              key={uniqueId("list")}
              // onClick={() => handleUserDetail(list.node)}
            >
              <List
                node={list.node}
                onClick={(e) => handleUserDetail(e)}
              ></List>
            </div>
          ))
        ) : (
          <div>No Result</div>
        )}
      </div>
    </div>
  );
}
