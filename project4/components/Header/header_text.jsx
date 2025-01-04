import React, { useEffect } from "react";
import "./styles.css";

export default function Headertext({textContent}) {
    const adjustText = (ratioTC) => {
        const text = document.getElementById("text");
        const container = document.getElementById("container");
        const newWidth = ratioTC * container.offsetWidth;
        text.style.width = newWidth + "px";
    };

    useEffect(() => {
        const text = document.getElementById("text");
        const container = document.getElementById("container");
        const ratioTC = text.offsetWidth / container.offsetWidth;
        window.addEventListener("resize", () => {adjustText(ratioTC);});
        return window.removeEventListener("resize", () => {adjustText(ratioTC);});
    },[]);

    return (
        <div id = "text">
            {textContent}
        </div>
    );

}