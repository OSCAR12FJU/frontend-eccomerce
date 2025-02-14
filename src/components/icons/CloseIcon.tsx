import React from "react";
import Icons from "./InterfaceIcons";

const CloseIcon: React.FC<Icons> = ({className}) =>(
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
  <path d="M18 6l-12 12" />
  <path d="M6 6l12 12" />
</svg>

)

export default CloseIcon;