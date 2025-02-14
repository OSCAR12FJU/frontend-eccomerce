import React from "react";
import Icons from "./InterfaceIcons";

const HamburIcon: React.FC<Icons> = ({className}) =>(
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
  <path d="M4 6l16 0" />
  <path d="M4 12l16 0" />
  <path d="M4 18l16 0" />
</svg>
)

export default HamburIcon;