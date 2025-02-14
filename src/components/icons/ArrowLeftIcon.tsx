import React from "react";
import Icons from "./InterfaceIcons";

const ArrowLeftIcon: React.FC<Icons> = ({className}) =>(
  <svg
  xmlns="http://www.w3.org/2000/svg"
  className={className}
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="1"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M15 6l-6 6l6 6" />
</svg>
)

export default ArrowLeftIcon;