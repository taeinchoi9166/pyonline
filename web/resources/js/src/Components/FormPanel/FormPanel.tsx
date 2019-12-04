import React, {useContext} from 'react';
import './FormPanel.css';
import {AppContext} from "../../App";

export default function FormPanel(){
    const FormPanelContext = useContext(AppContext);
  return (
    <div className={'form-panel'}>
        <button className="code-run-btn" onClick={FormPanelContext.onExecuteScript}>▶ 실행</button>
    </div>
  );
};