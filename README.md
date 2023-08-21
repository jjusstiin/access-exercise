## 啟動

先申請個人訪問Token取代

[Token超連結](
https://github.com/settings/tokens?type=beta)

[Github 申請Token教學](
https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens
)


`/src/relay/RelayEnvironment.ts`


```ts
Authorization:"bearer `(Your Token)`"
```

```sh
npm i
npm run dev
```

## GitHub API

設定 Github API

 `/src/relay/RelayEnvironment.ts`
```ts
const HTTP_ENDPOINT = "https://api.github.com/graphql";
```

[Github API](https://api.github.com/)


[Github Api Explorer](https://docs.github.com/en/graphql/overview/explorer)

## Relay專案建置

```sh
npx create-react-app access-exercise --template typescript

npm create @tobiastengler/relay-app
```

安裝延伸模組 `Relay GraphQL`

建立 `src/relay`

放入 `fechGraphQl.ts` `RelayEnvironment.ts` `schema.graphql`

到 `relay.config.json` 修改schema路徑

```json
"schema": "./src/relay/schema.graphql",
```

index.tsx 設定

`React.Suspense` 處理異步加載
>DetailPage refresh 回到 ListPage 就是少了這個出現錯誤畫面

```ts
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <RelayEnvironmentProvider environment={RelayEnvironment}>
    <React.StrictMode>
      <React.Suspense>
        <App />
      </React.Suspense>
    </React.StrictMode>
  </RelayEnvironmentProvider>
);

```

## 1. graphql

接收API畫面或元件寫graphql

`on User` [解釋](#on解釋)

```ts
import graphql from "babel-plugin-relay/macro";


  const ListPageQuery = graphql`
  query ListPageQuery {
  search(query: "a", type: USER, first: 5) {
    edges {
      node {
        ... on User {
          id
          isSiteAdmin
          avatarUrl
          login
          url
        }
      }
    }
  }
}
`;
```

> ```ts
>import graphql from "relay-runtime";
> ```
>is not working. use
> ```ts
>import graphql from "babel-plugin-relay/macro";
> ```

## 2. schema.graphql

定義graphql型別

`!` 必回傳值

`union` 在graphql得以呈現 
```graphql
...on User ...on Repository ...on Organization
```

```graphql
type User {
  id: ID!
  isSiteAdmin: Boolean!
  avatarUrl: String
  login: String!
  url: String
}

type Repository {
  id: ID!
  name: String
}

type Organization {
  id: ID!
  email: String
}

union SearchResultItem = User | Repository | Organization

type SearchEdge {
  node: SearchResultItem!
}

type SearchConnection {
  edges: [SearchEdge!]!
}

type Query {
  search(query: String!, type: Type!, first: Int): SearchConnection!
}

enum Type {
  ISSUE
  REPOSITORY
  USER
  DISCUSSION
}
```

## 3. useLazyLoadQuery

使用 `useLazyLoadQuery` 取得資料
```ts
export default function ListPage({}) {
  const data = useLazyLoadQuery(
    ListPageQuery,
    {},
  );
  ...
  return (...)
}
```

但這時是無法執行的，需要提供 `useLazyLoadQuery` 型別

執行 relay 編譯

```sh
npm run relay
```

將得到 `__generated__` 檔案，取得型別

```ts
import type { ListPageQuery as ListPageQueryType } from "./__generated__/ListPageQuery.graphql";


export default function ListPage({}) {
  const data = useLazyLoadQuery<ListPageQueryType>(
    ListPageQuery,
    {},
  );
  ...
  return (...)
}
```

Get data

```json
{
  "data": {
    "search": {
      "edges": [
        {
          "node": {
            "id": "MDQ6VXNlcjE0MTAxMDY=",
            "isSiteAdmin": false,
            "avatarUrl": "https://avatars.githubusercontent.com/u/1410106?u=33e416fb9551313cab3d4e9a87fcf073211ab28a&v=4",
            "login": "A",
            "url": "https://github.com/A"
          }
        },
        ...
      ]
    }
  }
}
```

第二參數，用來傳遞參數到graphql內

`useLazyLoadQuery(
    ListPageQuery,
    { userId: userId }
  )`

```ts
const ListPageQuery = graphql`
      query UserQuery($userId: ID!) {
        user(id: $userId) {
          id
          username
          email
        }
      }
    `;

export default function UserComponent({userId}) {
  const data = useLazyLoadQuery(
    ListPageQuery,
    { userId: userId }
  );
  ...

  return (...);
};
```
 
## 4. Fragment

[上述 graphql](#graphql) 可以改寫如下，將graphql寫至各別元件上

注意，要重新 `npm run relay` 取得 Props 型別
  ```ts
  const ListPageFragment = graphql`
  fragment ListPageFragment on Query
    search(query: $query, type: USER, first: 100) {
      edges {
        node {
          ...ListFragment
        }
      }
    }
  }
`;
  ```

```ts
import type { ListFragment$key } from "./__generated__/ListFragment.graphql";


const ListFragment = graphql`
  fragment ListFragment on User {
    id
    isSiteAdmin
    avatarUrl
    login
    url
  }
`;

type Props = {
  node: ListFragment$key;
};

export default function List({ node }: Props): React.ReactElement {
  const data = useFragment(ListFragment, node);

  return (...)
}
```  

## 5. refetchable & argumentDefinition

重新 call api

`@refetchable` 定義query名稱，重新抓取資料不抓錯

`@argumentDefinition{type:型別, defaultValue:預設值}` 參數定義

```ts
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
```

## 6. useRefetchableFragment & useTransition

useRefetchableFragment(`fragment的graphql`, `目前graphql取得的值`)
  
`userListData` 重新call api 取得的值

` refetch()` 使用時，帶入參數重新 call api 

```ts
const [userListData, refetch] = useRefetchableFragment(
  ListPageFragment,
  data as ListPageFragment$key
);
```

`startTransition` 重新 call api 的過程中保留畫面避免出錯

`isPending` 回傳 boolean 是否正在 call api，可以用來作，例如：spinner

```ts
const [isPending, startTransition] = useTransition();

function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
  ...
  startTransition(() => {
    refetch({ query: value ? value : "a" });
  });
}
```

因在pageList就要進重新抓值，所以將 graphql 寫成fragment 來使用 useRefetchableFragment

  ```ts
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

function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.trim();
    setValue(value);
    onPageChange({ first: 0, rows: 20, page: 0, pageCount: 0 });
    startTransition(() => {
      refetch({ query: value ? value : "a" });
    });
  }

  return(...)
  }
  ```

## 錯誤紀錄

我嘗試在 ListPage (父階) 將 graphql 結果 data (fragment 型別資料) 存入 store， 並切換路徑 `/detail` ，資料取出後用 `useFragment` 使用資料，資料可以使用，但在重新整理後，將沒有 api 被呼叫，useFragment 無法解析出已不存在 api 資料。

解決方法：在 list component 中，將已經 useFragment 的資 料，非 fragment 資料型別存入 store，可能有更好的解決方式，或是 relay 有對其解決方式需要再研究。 

## on解釋

```graphql
{
  user {
    ... on User {
      id
      username
    }
  }
}
```

```graphql
{
  user {
    ...UserFragment
  }
}

fragment UserFragment on User {
  id
  username
}
```
是相同的

```graphql
{
  user {
    ...RegularUserFragment
    ...AdminFragment
  }
}

fragment RegularUserFragment on RegularUser {
  id
  username
}

fragment AdminFragment on Admin {
  id
  username
  accessLevel
}
```

[Relay Code Exercise 官網使用 newsfeed 練習](https://github.com/facebook/relay)

## 其他套件

```sh
npm install react-router-dom
npm install primereact
npm install primeicons
npm install primeflex
npm install sass
npm install clsx
npm install zustand
npm install @types/lodash.debounce
```

PrimeReact `index.tsx` import css 

```ts
// theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
// core css
import "primereact/resources/primereact.css";
// icons
import "primeicons/primeicons.css";
```