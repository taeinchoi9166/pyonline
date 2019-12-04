import React, {useEffect, createRef, RefObject, FormEvent, Ref} from 'react';
// @ts-ignore
import ace from 'ace';

import FormPanel from "../FormPanel/FormPanel";

// type changeEventType = function(e: FormEvent<HTMLDivElement>) : void;
interface CodeFormPropType {
    executeScript: any
}

export default function CodeForm(props: CodeFormPropType) {
    const editorRef : RefObject<HTMLDivElement> = createRef();

    useEffect(() => {
        console.log(ace);
        ace.edit(document.body.querySelector('#code-editor'), {
            mode: "ace/mode/python",
            selectionStyle: "text"
        });
        if(editorRef.current) editorRef.current.style.height = '90%';
    },[]);

    return (
        <div className={"code-form"}>
            <FormPanel />
            <div id={'code-editor'} ref={editorRef} >

            </div>
        </div>

    );
}