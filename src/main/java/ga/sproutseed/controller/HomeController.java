package ga.sproutseed.controller;

import org.python.util.PythonInterpreter;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import java.io.StringWriter;
import java.util.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;


class PythonResult {
    private String result;

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }
}

class PythonInput {
    private String code;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}

@Controller
@RequestMapping("/")
@ServerEndpoint(value="/socket")
public class HomeController {
    private static final List<Session> sessionList = new ArrayList<>();

    private StringWriter sw;
    private PythonInterpreter interpreter;

    @PostConstruct
    public void init(){
        sw = new StringWriter();

        Properties props = System.getProperties();
        props.setProperty("python.home", "C:\\jython2.7.1");
        props.setProperty("python.path", "C:\\jython2.7.1\\Lib");
        props.setProperty("python.prefix", "C:\\jython2.7.1");
        props.setProperty("python.import.site", "false");

        PythonInterpreter.initialize(System.getProperties(), props, new String[]{""});
        interpreter = new PythonInterpreter();

        interpreter.setOut(sw);
    }

    @RequestMapping(value="", method = RequestMethod.GET)
    public String getHome(Model model){
        return "index";
    }

    @OnOpen
    public void onOpen(Session session){
        try {
            //
        }catch (Exception e){
            e.printStackTrace();
        }
        sessionList.add(session);
    }

    @OnMessage
    public void onMessage(String message, Session session){

    }

    @OnError
    public void onError(Throwable e, Session session){
        try{
            System.out.println(session.getId() + " - " + e.getMessage());
        }catch(Exception e2){
            e2.printStackTrace();
        }
    }

    @OnClose
    public void onClose(Session session){
        sessionList.remove(session);
    }


    @RequestMapping(value="console", method = RequestMethod.POST, consumes = "application/json")
    public @ResponseBody PythonResult getConsoleResult(HttpServletRequest req, @RequestBody PythonInput pythonInput){

        //설정
        PythonInterpreter pi = new PythonInterpreter();
        StringWriter _sw = new StringWriter();
        pi.setOut(_sw);

        String code = pythonInput.getCode();
        String em = "";


         //실행
        if(code != null){
            try{
                pi.exec(code);
            }catch(Exception e){
                em = e.getMessage();
                e.printStackTrace();
            }
        }




        //출력
        PythonResult p = new PythonResult();
        p.setResult(_sw != null && _sw.toString() != null && em != "" ? _sw.toString() : em);



        //종료
        pi.close();
        try{
            _sw.close();
        }catch(Exception e){
            e.printStackTrace();
        }

        return p;
    }
}
