import { useLazyLoadQuery } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import type { ListPageQuery as ListPageQueryType } from "./__generated__/ListPageQuery.graphql";

// const ListPageQuery = graphql`
//   query ListPageQuery {
//     locations {
//       id
//       name
//       description
//       photo
//     }
//   }
// `;

const ListPageQuery = graphql`
  query ListPageQuery {
    repository(owner: "octocat", name: "Hello-World") {
      pullRequests(last: 10) {
        edges {
          node {
            number
            mergeable
          }
        }
      }
    }
  }
`;

const ListPage = (): JSX.Element => {
  const data = useLazyLoadQuery<ListPageQueryType>(ListPageQuery, {});

  return (
    <>
      <div>data</div>
      {/* {data.locations?.map(({ id, name, description, photo }: any) => (
        <div key={id}>
          <h3>{name}</h3>
          <img
            width="400"
            height="250"
            alt="location-reference"
            src={`${photo}`}
          />
          <br />
          <b>About this location:</b>
          <p>{description}</p>
          <br />
        </div>
      ))} */}
    </>
  );
};

export default ListPage;
