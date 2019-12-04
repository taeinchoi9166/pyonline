import React, {useEffect, createRef, RefObject} from 'react';
import './ConsoleView.css';
import {PythonResult, PythonResultType} from "Pyonline";


interface ConsoleViewProps {
    result: string
}



function ConsoleView(props : ConsoleViewProps){
    const textRef : RefObject<HTMLDivElement> = createRef();

    useEffect(() => {
        console.log('after', props);
        if(textRef && textRef.current){
            textRef.current.innerText = props.result;
        }
    },[props.result]);

    return (
        <div className={'console-view-wrap'}>
            <div className="console-view-title">
                <h2>결과</h2>
            </div>
            <div className="console-view-text" ref={textRef}>
            </div>
        </div>
    )
}

export default ConsoleView;