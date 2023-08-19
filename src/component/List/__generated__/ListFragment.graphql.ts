/**
 * @generated SignedSource<<7cfbdcae03151a8b796aee07532fa4ed>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ListFragment$data = {
  readonly avatarUrl?: string | null;
  readonly id?: string;
  readonly isSiteAdmin?: boolean;
  readonly login?: string;
  readonly url?: string | null;
  readonly " $fragmentType": "ListFragment";
};
export type ListFragment$key = {
  readonly " $data"?: ListFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ListFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ListFragment",
  "selections": [
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
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
    }
  ],
  "type": "SearchResultItem",
  "abstractKey": "__isSearchResultItem"
};

(node as any).hash = "f5b8032d4dc0018cc68ca512625ff44b";

export default node;
