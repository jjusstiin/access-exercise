/**
 * @generated SignedSource<<7d7ececf39c5e3581551fd332779d11c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ListFragment$data = {
  readonly avatarUrl: string | null;
  readonly id: string;
  readonly isSiteAdmin: boolean;
  readonly login: string;
  readonly url: string | null;
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
};

(node as any).hash = "5e775ce39f7464b1c5108d4ddea6b513";

export default node;
