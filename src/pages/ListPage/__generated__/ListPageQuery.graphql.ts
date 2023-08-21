/**
 * @generated SignedSource<<64d953ee03d4bf6689af5a1f0cf6494c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ListPageQuery$variables = {};
export type ListPageQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ListPageFragment">;
};
export type ListPageQuery = {
  response: ListPageQuery$data;
  variables: ListPageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = [
  (v0/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ListPageQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "ListPageFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ListPageQuery",
    "selections": [
      {
        "alias": null,
        "args": [
          {
            "kind": "Literal",
            "name": "first",
            "value": 100
          },
          {
            "kind": "Literal",
            "name": "query",
            "value": "a"
          },
          {
            "kind": "Literal",
            "name": "type",
            "value": "USER"
          }
        ],
        "concreteType": "SearchConnection",
        "kind": "LinkedField",
        "name": "search",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "SearchEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v0/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isSiteAdmin",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "avatarUrl",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "login",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "bio",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "location",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "name",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "websiteUrl",
                        "storageKey": null
                      }
                    ],
                    "type": "User",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": (v1/*: any*/),
                    "type": "Organization",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": (v1/*: any*/),
                    "type": "Repository",
                    "abstractKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "search(first:100,query:\"a\",type:\"USER\")"
      }
    ]
  },
  "params": {
    "cacheID": "8f00c9e134ee602895aafcb8baa88812",
    "id": null,
    "metadata": {},
    "name": "ListPageQuery",
    "operationKind": "query",
    "text": "query ListPageQuery {\n  ...ListPageFragment\n}\n\nfragment ListFragment on User {\n  id\n  isSiteAdmin\n  avatarUrl\n  login\n  bio\n  location\n  name\n  websiteUrl\n}\n\nfragment ListPageFragment on Query {\n  search(query: \"a\", type: USER, first: 100) {\n    edges {\n      node {\n        __typename\n        ...ListFragment\n        ... on Organization {\n          id\n        }\n        ... on Repository {\n          id\n        }\n        ... on User {\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "87e0e66bad29eff2857bce02f83d6661";

export default node;
