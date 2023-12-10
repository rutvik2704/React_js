import React, { useState } from 'react'

function TextFrom(props) {
    const [text, setText] = useState('');
    const handleUpClick = () => {
        // console.log("Uppercase was clicked");
        let newText = text.toUpperCase();
        setText(newText)
    }
    const handleLoClick= ()=>{
        let newText = text.toLowerCase();
        setText(newText)
    }
    const handleClClick = () =>{
        let newText = ''
        setText(newText)
    }
    const handleOnChange=(event)=>{
        // console.log("On change");
        setText(event.target.value)
    }

    const handleCopy = () => {
        var text = document.getElementById("mybox");
        text.select();
        navigator.clipboard.writeText(text.value);
    }
    
    const handleExtraSpaces = () => {
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "))
    }
    return (
        <>
        <div className="container" style={{color: props.mode==='dark'?'white':'black'}}>
        
        <h1>{props.heading}</h1>
            <div className="mb-3">
                <textarea className="form-control" value={text} onChange={handleOnChange} style={{ backgroundColor: props.mode==='dark'?'grey':'white',color:props.mode==='dark'?'white':'black'}} id="mybox" rows="10"></textarea>
            </div>
            <button className="btn btn-primary mx-2" onClick={() => {
                handleUpClick()
            }}>Convert to Uppercase</button>
            <button className="btn btn-primary mx-2" onClick={() => {
                handleLoClick()
            }}>Convert to Lowercase</button>
            <button className="btn btn-primary mx-2" onClick={() => {
                handleClClick()
            }}>Clear text</button>
            <button className="btn btn-primary mx-1" onClick={()=>{
                handleCopy()
            }}>Copy Text</button>
            <button className="btn btn-primary mx-1" onClick={()=>{
                handleExtraSpaces()
            }}>Remove extra spaces</button>
            </div>
            <div className="container my-3" style={{color: props.mode==='dark'?'white':'black'}}>
            <h1>yoru text summary</h1>
            <p>{text.split(" ").length} Words and {text.length} charactees</p>
            <p>{0.008 * text.split(" ").length}Minutes read</p>
            <h2>Perview</h2>
            <p>{text.length>0?text:"Enter something in the above textbox to preview it here"}</p>
            </div>
        </>
    )
}

export default TextFrom
