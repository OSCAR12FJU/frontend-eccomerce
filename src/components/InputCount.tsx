interface InputCountProps{
    inputIncr: string;
    inputDecr: string;
    inputCount: string;
    handleDecrement: (id:number) => void;
    handleIncrement: (id:number) => void;
    id: number;
    quantity: number;

}

const InputCount: React.FC<InputCountProps> = ({inputIncr, inputDecr, inputCount, handleDecrement,handleIncrement,id, quantity}) =>{
    return(
        <div className="relative flex items-center max-w-[8rem] ">
        <button 
        type="button" 
        className="rounded-s-md p-2 h-8 focus:outline-none border-b border-t border-l"
        onClick={() => handleDecrement(id)} >
        <svg className={`w-3 h-3 ${inputDecr}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
         </svg>
        </button>

        <input
        type="text" 
        value={quantity}
        className={`h-8 text-center text-md font-light block w-8 border-b border-t focus:outline-none ${inputCount}`} 
        style={{background:"transparent"}}
        required />

        <button 
        type="button" 
        className="rounded-e-lg p-2 h-8 focus:outline-none border-b border-t border-r"
        onClick={() =>handleIncrement(id)}>
        <svg 
        className={`w-3 h-3 ${inputIncr}`} 
        aria-hidden="true" 
        xmlns="http://www.w3.org/2000/svg"
         fill="none" viewBox="0 0 18 18">
        <path 
        stroke="currentColor" 
        strokeLinecap="round"
         strokeLinejoin="round" 
         strokeWidth="2" d="M9 1v16M1 9h16"/>
            </svg>
        </button>
    </div>
    )
}

export default InputCount;