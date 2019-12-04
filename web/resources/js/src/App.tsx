import React, {Component, createRef, EventHandler, RefObject, useContext, createContext} from 'react';

import './App.css';
import Header from './Components/Header/Header';
import ConsoleView from './Components/ConsoleView/ConsoleView';
import CodeForm from './Components/CodeForm/CodeForm';


interface StateType {
    code_input: string,
    td: TextDecoder,
    code_result: string
}


const _AppContext = createContext({onExecuteScript: () => {}});

class App extends Component{

    state : StateType = {
        code_input: '',
        td: new TextDecoder(),
        code_result: ''
    }

    componentDidMount(): void {

    }

    shouldComponentUpdate(nextProps: Readonly<Object>, nextState: Readonly<StateType>, nextContext: any): boolean {
        if(nextState.code_result !== this.state.code_result) return true;
        else return false;
    }

    onChangeCode = (e : {
        target: HTMLElement
    }) => {
        this.setState({
            ...this.state,
            code_input: e.target && e.target.innerText ? e.target.innerText : ''
        });
    }

    onExecuteScript = () : void => {
        const _editor = document.body.querySelector<HTMLDivElement>('.ace_content');
        if(_editor && _editor.innerText){
            fetch('/console', {
                method: 'POST',
                body: JSON.stringify({'code':_editor.innerText}),
                headers: {
                    "Content-Type":'application/json',
                },
                credentials: 'same-origin'
            })
                .then((rs : any) => rs.body.getReader())
                .then((reader : ReadableStreamDefaultReader) => reader.read())
                .then((data : ReadableStreamReadResult<any>) => {
                    if(data && data.value){
                        const decodedResult : string = this.state.td.decode(data.value);
                        const json = JSON.parse(decodedResult);

                        this.setState({
                            ...this.state,
                            code_result: json['result']
                        });
                    }
                }).catch((err) => {
                    console.error(err);
                });
        }


    }

    render(){
        return (
            <_AppContext.Provider value={{onExecuteScript: this.onExecuteScript}}>
                <div className={'container'}>
                    <Header/>
                    <div className="content-wrap">
                        <CodeForm executeScript={this.onExecuteScript}/>
                        <ConsoleView result={this.state.code_result}/>
                    </div>
                    {/*<textarea id="code_input" style={{width:130, height:200}} ref={this.inputRef}></textarea>*/}
                    {/*<button type={'button'} onClick={this.onExecuteScript}>실행</button>*/}

                </div>
            </_AppContext.Provider>
        );
    }

}

export default App;

export const AppContext = _AppContext;