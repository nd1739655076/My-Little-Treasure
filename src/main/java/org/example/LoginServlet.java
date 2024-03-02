package org.example;
import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;

public class LoginServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String username = request.getParameter("username");
        String password = request.getParameter("password");

        File file = new File(getServletContext().getRealPath("/") + "users.txt");
        try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
            String line;
            boolean found = false;
            while ((line = reader.readLine()) != null) {
                String[] credentials = line.split(" ");
                if (credentials[0].equals(username) && credentials[1].equals(password)) {
                    found = true;
                    break;
                }
            }
            if (found) {
                HttpSession session = request.getSession();
                session.setAttribute("user", username);
                response.sendRedirect("dashboard.html");
            } else {
                response.setContentType("text/html");
                PrintWriter out = response.getWriter();
                out.println("<script type='text/javascript'>");
                out.println("alert('Invalid username or password.');");
                out.println("location='index.html';");
                out.println("</script>");
            }
        }
    }
}