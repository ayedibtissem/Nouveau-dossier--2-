import React from "react";
import ts from "../home.png"
function Photo(props){
    return(
        <div>
            <img src={ts}alt="imag"width="100%" height={"100%"}/>
            {props.children}
        </div>
    );

}
export default Photo;