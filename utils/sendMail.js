// import sgMail from "@sendgrid/mail";

// export async function sendEmail({ to, subject, text }) {
//   try {
//     // Set SendGrid API key
//     sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//     // Construct the email message
//     const message = {
//       to,
//       from: process.env.EMAIL_FROM,
//       subject,
//       html: text,
//     };

//     // Send the email
//     const info = await sgMail.send(message);

//     console.log(`Email sent to ${to}: ${info[0].statusCode}`);
//   } catch (error) {
//     console.error(error);
//     throw new Error("Failed to send email");
//   }
// }

import mailchimp from '@mailchimp/mailchimp_transactional';

export async function sendEmail({ to, subject, text }) {
  try {
    const mandrillSendOption = {
      message: {
        from_email: process.env.EMAIL_FROM,
        subject: subject,
        html: text,
        to: [{ email: to, type: 'to' }],
      },
    };
    const client = mailchimp(process.env.MAILCHIMP_API_KEY);

    const response = await client.messages.send(mandrillSendOption);

    // console.log(mandrillSendOption.message)
    console.log(response)

    console.log(`Email sent to ${to}: ${response[0].status}`);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to send email");
  }
}
