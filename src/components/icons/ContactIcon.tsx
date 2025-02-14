import React from "react";
import Icons from "./InterfaceIcons";

const ContactIcon: React.FC<Icons> = ({className, text}) =>{
  const message = `Hola, Equipo de NeverStop!`;                    
  const whatsappURL = `https://api.whatsapp.com/send?phone=541165123948&text=${message.replace(/\n/g, "%0A")}`;
  return(
  <div className="hidden md:hidden lg:flex flex-col gap-y-1 justify-center items-center cursor-pointer" onClick={() => window.open(whatsappURL, "_blank")}
>
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
  <path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10" />
  <path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2" />
</svg>
<span className="font-sm text-sm">{text}</span>
  </div>

)
}
export default ContactIcon;