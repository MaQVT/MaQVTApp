import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { from, subject, text } = req.body;

        try {
            const message = {
                to: process.env.EMAIL_FROM,
                from : process.env.EMAIL_FROM,
                subject,
                html: text,
            };

            await sgMail.send(message);

            res.status(200).json({ message: "Email sent successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to send email" });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
