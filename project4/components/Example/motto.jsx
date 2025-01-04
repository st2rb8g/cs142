import React, { useState } from "react";

export default function Motto() {
    const [inputValue, setInputValue] = useState("");
    const [displayText, setDisplayText] = useState("jeff");

    const handleInputChange = (e) => {
        setInputValue(e.target.value);

    };

    const handleButtonClick = () =>{
        if(inputValue.trim()) {
            setDisplayText(inputValue);
        }
        
    };

    return (
        <>
            <p id="motto">{displayText}</p>
            <input type="text" value = {inputValue} onChange = {handleInputChange} placeholder = "enter" />
            <button onClick={handleButtonClick}>change</button>
        </>
    );

}