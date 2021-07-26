package jkf;

import java.io.IOException;
import java.io.FileNotFoundException;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.nio.file.Paths;
import java.io.BufferedWriter;
//
import java.io.FileReader;
import java.io.FileWriter;
import java.io.PrintWriter;
import java.io.BufferedReader;
//
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.util.Scanner;
import java.util.Locale;
import java.io.Console;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.util.Arrays;
import java.nio.charset.StandardCharsets;


import jkf.CloseSafe;

public class App {

    final static String NS = System.getProperty("line.separator");

    final CloseSafe closeSafe = new CloseSafe();

    void copyBytesBuffered(String iname, String oname) {

        BufferedInputStream in = null;
        BufferedOutputStream out = null;

        try {
            in = new BufferedInputStream(new FileInputStream(iname));
            out = new BufferedOutputStream(new FileOutputStream(oname));
            int c;
            for (;;) {
                c = in.read();
                System.out.println((char) c);
                if (c < 0)
                    break;
                out.write(c);
            }
            out.flush();
        } catch (IOException ioe) {
            System.out.println(String.format("%s", ioe.getMessage()));
        } finally {
            System.out.println(String.format("input file: %s", in.getClass().getName()));
            System.out.println(String.format("output file: %s", out.getClass().getName()));
            closeSafe.close(in);
            closeSafe.close(out);
        }
    }

    void copyBytes(String iname, String oname) {

        FileInputStream in = null;
        FileOutputStream out = null;

        try {
            in = new FileInputStream(iname);
            out = new FileOutputStream(oname);
            int c;
            for (;;) {
                c = in.read();
                System.out.println(c);
                if (c < 0)
                    break;
                out.write(c);
            }
        } catch (IOException ioe) {
            System.out.println(String.format("%s", ioe.getMessage()));
        } finally {
            System.out.println(String.format("input file: %s", in.getClass().getName()));
            System.out.println(String.format("output file: %s", out.getClass().getName()));
            closeSafe.close(in);
            closeSafe.close(out);
        }
    }

    void copyCharacters(String iname, String oname) {

        FileReader in = null;
        FileWriter out = null;

        try {
            in = new FileReader(iname);
            out = new FileWriter(oname);
            int c;
            for (;;) {
                c = in.read();
                System.out.println(c);
                if (c < 0)
                    break;
                out.write(c);
            }
        } catch (IOException ioe) {
            System.out.println(String.format("%s", ioe.getMessage()));
        } finally {
            System.out.println(String.format("input file: %s", in.getClass().getName()));
            System.out.println(String.format("output file: %s", out.getClass().getName()));
            closeSafe.close(in);
            closeSafe.close(out);
        }
    }

    public void copyLines(String iname, String oname) {

        BufferedReader in = null;
        PrintWriter out = null;

        try {
            in = new BufferedReader(new FileReader(iname));
            out = new PrintWriter(new FileWriter(oname));

            for (;;) {
                var l = in.readLine();
                if (l == null)
                    break;
                out.println(l);
            }
        } catch (FileNotFoundException fnfe) {

        } catch (IOException ioe) {

        } finally {
            System.out.println(String.format("input file: %s", in.getClass().getName()));
            System.out.println(String.format("output file: %s", out.getClass().getName()));
            closeSafe.close(in);
            closeSafe.close(out);
        }

    }

    public void scanXan(String iname) {

        Scanner s = null;

        try {
            s = new Scanner(new BufferedReader(new FileReader(iname)));
            while (s.hasNext()) {
                System.out.println(s.next());
            }

        } catch (FileNotFoundException fnfe) {
        } finally {
            if (s != null) {
                s.close();
            }
        }
    }

    public void scanSum(String iname) {
        Scanner s = null;
        double sum = 0;

        try {
            s = new Scanner(new BufferedReader(new FileReader(iname)));
            s.useLocale(Locale.US);

            while (s.hasNext()) {
                if (s.hasNextDouble()) {
                    sum += s.nextDouble();
                } else {
                    s.next();
                }
            }
        } catch (FileNotFoundException ffne) {
            System.out.format("%s%n", ffne);
        } finally {
            closeSafe.close(s);
        }
        System.out.println(sum);
    }

    // Console
    public void readConsole() {

        Console c = System.console();
        if (c == null) {
            System.err.println("No console/tty");
            return;
        }
        String login = c.readLine("Enter your login: ");
        char[] oldPassword = c.readPassword("Enter your old password: ");
        System.out.format("user: %s%n", login);
        System.out.format("pwd: %s%n", new String(oldPassword));
    }

    public void readWriteDataStream(String iname) {
        // some data
        int[] ints = { 1, 3, 34, 2342, 42435 };
        double[] doubles = { 30.23, 234.23, -890.01 };
        String text = "✋"; //"✋🌍";
        
        var cwd = System.getProperty("user.dir");
        var filePath = Paths.get(cwd, iname);        
        
        try (FileOutputStream fos = new FileOutputStream(filePath.toString()); DataOutputStream dos = new DataOutputStream(fos)) {
            for (int i : ints) {
                //dos.writeInt(i);
            }
            for (double d : doubles) {
                //dos.writeDouble(d);
            }
            dos.writeUTF(text);

        } catch (FileNotFoundException fnfe) {
            System.out.println("fnfe error happened");
            System.out.println(fnfe);
        } catch (IOException ioe) {
            System.out.println("ioe error happened");
            System.out.println(ioe);
        }

        try (FileInputStream fis = new FileInputStream(filePath.toString()); DataInputStream dis = new DataInputStream(fis)) {
            for (int i : ints) {
                //var result = dis.readInt();
                //System.out.println(result);
            }
            for (double d : doubles) {
                //var result = dis.readDouble();
                //System.out.println(result);
            }
            var string = dis.readUTF();
            System.out.format("%s%n", string);
        } catch (FileNotFoundException fnfe) {
            System.out.println("fnfe error happened");
            System.out.println(fnfe);
        } catch (IOException ioe) {
            System.out.println("ioe error happened");
            System.out.println(ioe);
        }


    }

    public App() {

    }

    public static void main(String... argv) {
        var app = new App();
        var src = "xanadu.txt";

        // app.copyBytes(src, "outgoing.txt");
        // app.copyCharacters(src, "outgoing_char.txt");
        // app.copyLines(src, "outgoingLines.txt");
        // app.copyBytesBuffered(src, "outgoingBuffered.txt");
        // app.scanXan(src);
        // app.scanSum("usnumbers.txt");
        // app.readConsole();
        app.readWriteDataStream("datastream.bin");
    }
}
