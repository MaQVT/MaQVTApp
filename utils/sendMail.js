import sgMail from "@sendgrid/mail";

export async function sendEmail({ to, subject, text }) {
  try {
    // Set SendGrid API key
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    // Construct the email message
    const message = {
      to,
      from: process.env.EMAIL_FROM,
      subject,
      text,
    };

    // Send the email
    const info = await sgMail.send(message);

    console.log(`Email sent to ${to}: ${info[0].statusCode}`);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to send email");
  }
}
