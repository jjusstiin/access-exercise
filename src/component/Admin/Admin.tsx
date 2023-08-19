import * as React from "react";
import clsx from "clsx";
import "./Admin.scss";

type Props = {
  admin?: boolean;
};
export default function Admin({ admin }: Props): React.ReactElement {
  return (
    <span
      className={clsx("admin", {
        staff: admin,
        member: !admin,
      })}
    >
      {admin ? "STAFF" : "MEMBER"}
    </span>
  );
}
