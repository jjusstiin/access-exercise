/**
 * @generated SignedSource<<912edba57f7d8c2d025dbc8e1e550254>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type MergeableState = "CONFLICTING" | "MERGEABLE" | "UNKNOWN" | "%future added value";
export type ListPageQuery$variables = {};
export type ListPageQuery$data = {
  readonly repository: {
    readonly pullRequests: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly mergeable: MergeableState | null;
          readonly number: number | null;
        } | null;
      } | null> | null;
    } | null;
  } | null;
};
export type ListPageQuery = {
  response: ListPageQuery$data;
  variables: ListPageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Literal",
        "name": "name",
        "value": "Hello-World"
      },
      {
        "kind": "Literal",
        "name": "owner",
        "value": "octocat"
      }
    ],
    "concreteType": "Repository",
    "kind": "LinkedField",
    "name": "repository",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": [
          {
            "kind": "Literal",
            "name": "last",
            "value": 10
          }
        ],
        "concreteType": "PullRequestConnection",
        "kind": "LinkedField",
        "name": "pullRequests",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "PullRequestEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "PullRequest",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "number",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "mergeable",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "pullRequests(last:10)"
      }
    ],
    "storageKey": "repository(name:\"Hello-World\",owner:\"octocat\")"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ListPageQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ListPageQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "736695cd23ca0098b7c1bab7cb5d4ac5",
    "id": null,
    "metadata": {},
    "name": "ListPageQuery",
    "operationKind": "query",
    "text": "query ListPageQuery {\n  repository(owner: \"octocat\", name: \"Hello-World\") {\n    pullRequests(last: 10) {\n      edges {\n        node {\n          number\n          mergeable\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "415fb43800fa758224567e21d18eb55c";

export default node;
