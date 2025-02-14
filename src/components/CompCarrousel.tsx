import Image from "next/image"

const CompCarrousel = ({className, imageUrl} : {className: string , imageUrl : string},) =>{
    return(
        <div className={`${className} `}>
            <div className="w-24 h-24">
            <Image
            src={imageUrl} 
            width={300} 
            height={300} 
            className="w-full object-cover"
            alt="Product Image" />
            </div>
        </div>
        
    )
}
export default CompCarrousel;