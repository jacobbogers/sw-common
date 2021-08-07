package jkf;

import java.net.MalformedURLException;
import java.net.URL;

import java.net.*;
import java.io.*;

public class App {

    final static String NS = System.getProperty("line.separator");
    final static String CWD = System.getProperty("user.dir");

    static void println(String fmt, Object... args) {
        System.out.format(fmt + "%n", args);
    }

    public void testURLs() {
        try {
            var urlStr = "https://www.example.com/";
            var myURL = new URL(urlStr);
            var page1URL = new URL(myURL, "/page1.html");
            var page2URL = new URL(myURL, "/page2.html");
            var page3URL = new URL(myURL, "/page2.html#BOTTOM");
            App.println("page1: %s", page1URL);
            App.println("page2: %s", page2URL);
            App.println("page3: %s", page3URL);
            // port
            var gamelan = new URL("http", "www.example.com", 80, "/pages/page1.html");
            var authURL = new URL("http://username:password@www.example.com:80/page1.html?a=1&b=2#MARK");
            // all went well
            App.println("gamelan: %s", gamelan);
            App.println("authL: %s", authURL.getAuthority());
            App.println("query: %s", authURL.getQuery());
            App.println("ref: %s", authURL.getRef());
            App.println("file: %s", authURL.getFile());
            App.println("path: %s", authURL.getPath());
            App.println("port: %s", authURL.getPort());
            App.println("host: %s", authURL.getHost());
        } catch (MalformedURLException mue) {
            App.println("url is malformed:%s", mue);
        }
    }

    public void readingFromUrl() {
        URL oracle;
        try {
            oracle = new URL("https://www.oracle.com/");
        }
        catch(MalformedURLException mfe){
            App.println("ERR:%s", mfe);
            return;
        }
        try (
                var isr = new InputStreamReader(oracle.openStream());
                var in = new BufferedReader(isr)
        ){
            for (int i = 1;; i++){
                String inputLine = in.readLine();
                if (inputLine == null){
                    break;
                }
                App.println("%-4d: %s", i, inputLine);
            }
        }
        catch(IOException ioe){
            App.println("ERR:%s", ioe);
        }
    }

    public void connectingToUrl(){
        try {
            var url = new URL("https://file-metadata-micro-service.herokuapp.com");
            var connection = url.openConnection();      
            connection.setDoOutput(true);      
            connection.connect();
            App.println("connected");
            var os = connection.getOutputStream();
            var osw = new OutputStreamWriter(os);
            // write post request stuff
            osw.close();

            var is = connection.getInputStream();
            var reader = new InputStreamReader(is);
            var br = new BufferedReader(reader);

            String inputLine;
            while ((inputLine = br.readLine()) != null) {
                System.out.println(inputLine);
            }
            br.close();
        }
        catch(IOException e){
            App.println("%s", e);
        }   
    }

    public App() {

    }

    public static void main(String... argv) {
        var app = new App();
        //app.testURLs();
        //app.readingFromUrl();
        app.connectingToUrl();
    }
}
