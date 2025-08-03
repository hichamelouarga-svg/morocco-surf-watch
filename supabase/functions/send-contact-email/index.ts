import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

console.log("🚀 Function starting up...");

let resend: any = null;
try {
  const { Resend } = await import("npm:resend@2.0.0");
  const apiKey = Deno.env.get("RESEND_API_KEY");
  console.log(`🔑 RESEND_API_KEY exists: ${!!apiKey}`);
  if (apiKey) {
    resend = new Resend(apiKey);
    console.log("✅ Resend initialized successfully");
  } else {
    console.error("❌ RESEND_API_KEY not found");
  }
} catch (error) {
  console.error("❌ Failed to import or initialize Resend:", error);
}

interface ContactEmailRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
  inquiryType: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log(`📧 Function called with method: ${req.method}`);
  console.log(`🔑 RESEND_API_KEY exists: ${!!Deno.env.get("RESEND_API_KEY")}`);
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    console.log("✅ Handling OPTIONS request");
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!resend) {
      console.error("❌ Resend not initialized");
      throw new Error("Email service not available");
    }

    const { name, email, subject, message, inquiryType }: ContactEmailRequest = await req.json();

    console.log("📤 Sending contact email:", { name, email, subject, inquiryType });

    const emailResponse = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: ["hicham.elouarga@gmail.com"], // Changed to verified email
      subject: `[Surf au Maroc] ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Inquiry Type:</strong> ${inquiryType}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>This email was sent from the Surf au Maroc contact form.</em></p>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);