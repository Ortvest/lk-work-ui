import React from "react";

import IconFilter from "@shared/assets/icons/IconFilter.svg"

import './style.css';
import classNames from "classnames";


export const FilterEmployeesButton = (): React.ReactNode => {
  return <button className={classNames("filter-employees-button")}>
    <span>Filter</span>
    <img src={IconFilter} alt="IconFilter" />
  </button>
}