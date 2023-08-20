/**
 * @generated SignedSource<<94f9bcf12365e8fca41356df6c95d1ce>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ListPageRefetchQuery$variables = {
  query?: string | null;
};
export type ListPageRefetchQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ListPageFragment">;
};
export type ListPageRefetchQuery = {
  response: ListPageRefetchQuery$data;
  variables: ListPageRefetchQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": "a",
    "kind": "LocalArgument",
    "name": "query"
  }
],
v1 = {
  "kind": "Variable",
  "name": "query",
  "variableName": "query"
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = [
  (v2/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ListPageRefetchQuery",
    "selections": [
      {
        "args": [
          (v1/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "ListPageFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ListPageRefetchQuery",
    "selections": [
      {
        "alias": null,
        "args": [
          {
            "kind": "Literal",
            "name": "first",
            "value": 100
          },
          (v1/*: any*/),
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
                      (v2/*: any*/),
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
                        "name": "url",
                        "storageKey": null
                      }
                    ],
                    "type": "User",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": (v3/*: any*/),
                    "type": "Organization",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": (v3/*: any*/),
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
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "3ec2f9c59415b813191199a55a41018e",
    "id": null,
    "metadata": {},
    "name": "ListPageRefetchQuery",
    "operationKind": "query",
    "text": "query ListPageRefetchQuery(\n  $query: String = \"a\"\n) {\n  ...ListPageFragment_1Qr5xf\n}\n\nfragment ListFragment on User {\n  id\n  isSiteAdmin\n  avatarUrl\n  login\n  url\n}\n\nfragment ListPageFragment_1Qr5xf on Query {\n  search(query: $query, type: USER, first: 100) {\n    edges {\n      node {\n        __typename\n        ...ListFragment\n        ... on Organization {\n          id\n        }\n        ... on Repository {\n          id\n        }\n        ... on User {\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "bafd871be70f7ff262caea94e0aac38c";

export default node;
