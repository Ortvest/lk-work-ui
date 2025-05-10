import React from "react";

import './style.css'
import classNames from "classnames";
export const AddEmployeeButton = (): React.ReactNode => {
  return (
    <button className={classNames("add-employee-button")}>Add and Send Invite</button>
  )
}