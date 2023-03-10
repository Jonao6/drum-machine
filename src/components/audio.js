import React from "react";
const Audio = props => {
    return (
        <>
        <audio
        className="clip"
        data-key={props.keyCode}
         src={props.src}
         volume={props.volume}
         id={props.keyCode}
         >   
        </audio>
        </>
    )
}
export default Audio