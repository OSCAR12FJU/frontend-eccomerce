import Image from "next/image"
import NeverStop from "../../public/images/never-stop.png"
import Link from "next/link";

const Footer = () =>{
    return(
        <footer className="mr-4 ml-4 mb-2 mt-8">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8 border-t-[0.1rem]  border-t-[1px] border-gray/20">
            <div className="flex flex-col md:flex-row justify-center md:justify-between items-center">
                <Link  
                href={"/"}
                className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                    <Image 
                    width="32"
                    height="32"
                    src={NeverStop} 
                    className ="" 
                    alt="NeverStop" />
                    <span className="self-center text-2xl font-bold">Never Stop</span>
                </Link>
    
                <div className="flex items-center justify-center gap-4">
                <a href="https://www.instagram.com/neverstop.arg/" className="cursor-pointer" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="24" height="24" strokeWidth="1.5">
                <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z"></path>
                <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                 <path d="M16.5 7.5l0 .01"></path>
                </svg>
                </a>
                <a href="https://www.facebook.com/neverstopabasto" className="cursor-pointer" target="_blank">
                
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="24" height="24" strokeWidth="1.5">
                <path d="M12 10.174c1.766 -2.784 3.315 -4.174 4.648 -4.174c2 0 3.263 2.213 4 5.217c.704 2.869 .5 6.783 -2 6.783c-1.114 0 -2.648 -1.565 -4.148 -3.652a27.627 27.627 0 0 1 -2.5 -4.174z"></path>
                <path d="M12 10.174c-1.766 -2.784 -3.315 -4.174 -4.648 -4.174c-2 0 -3.263 2.213 -4 5.217c-.704 2.869 -.5 6.783 2 6.783c1.114 0 2.648 -1.565 4.148 -3.652c1 -1.391 1.833 -2.783 2.5 -4.174z"></path>
                </svg>
                </a>
    
                </div>
    
            
            </div>
        </div>
    </footer>
    
    )
}
export default Footer;