import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";

// Email configuration
const toEmail = Deno.env.get("SMTP_TO_EMAIL") || "recipient@example.com"; // The recipient email
const smtpConfig = {
  hostname: "smtp.gmail.com",
  port: 587,
  username: Deno.env.get("SMTP_USERNAME") || "your-email@gmail.com",
  password: Deno.env.get("SMTP_PASSWORD") || "your-app-specific-password", // App password for Gmail
};

console.log("SMTP Config:", {
  hostname: smtpConfig.hostname,
  port: smtpConfig.port,
  username: smtpConfig.username,
  passwordLength: smtpConfig.password?.length || 0,
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  console.log("Received request:", req.method);

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse the request body
    const body = await req.json();
    const { name, email, message } = body;

    console.log(`Attempting to send email from ${name} (${email})`);

    if (!name || !email || !message) {
      throw new Error("Missing required fields: name, email, or message");
    }

    // Create SMTP client
    const client = new SmtpClient();
    console.log("SMTP client created");

    try {
      // Connect to SMTP server with TLS
      console.log("Connecting to SMTP server...");
      await client.connectTLS(smtpConfig);
      console.log("Connected to SMTP server successfully");

      // Send email
      console.log("Preparing to send email...");
      const emailSent = await client.send({
        from: smtpConfig.username,
        to: toEmail,
        subject: `New contact form submission from ${name}`,
        content: `
          Name : ${name}
          Email : ${email}
          Message : ${message}
        `,
        html: `
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong> ${message.replace(/\n/g, "<br>")}</p>
        `,
      });

      console.log("Email sent successfully:", emailSent);

      // Close connection
      await client.close();
      console.log("SMTP connection closed");

      return new Response(
        JSON.stringify({ success: true, message: "Email sent successfully" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    } catch (smtpError) {
      console.error("SMTP Error:", smtpError);
      throw new Error(`Failed to send email: ${smtpError.message}`);
    }
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
