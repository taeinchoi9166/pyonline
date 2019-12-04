declare module 'Pyonline'{
    namespace PythonConsole{
        interface PythonResultType {
            resultText: string
        }

        export class PythonResult implements PythonResultType{
            resultText: string;
        }

        interface PythonInputType {
            code: String
        }

        let _input : PythonInputType;
    }

    export = PythonConsole;
}
