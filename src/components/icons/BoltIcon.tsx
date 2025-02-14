import React from "react";
import Icons from "./InterfaceIcons";

const BoltIcon: React.FC<Icons> = ({className}) =>(
  <svg
  xmlns="http://www.w3.org/2000/svg"
  className={className}
  viewBox="0 0 24 24"
  fill="#FCDA06"
  stroke="currentColor"
  stroke-width="1.5"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11" />
</svg>
)

export default BoltIcon;