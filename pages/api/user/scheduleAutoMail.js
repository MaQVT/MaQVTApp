import sgMail from '@sendgrid/mail';
import cron from 'node-cron';

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Store the user schedules and cron jobs in separate objects
const userSchedules = {};
const cronJobs = {};

export default function handler(req, res) {
    if (req.method === 'GET') {
        res.status(200).json({ userSchedules });
    } else if (req.method === 'POST') {
        const { userId, scheduleName, to, subject, text } = req.body;

        let schedule;

        if (scheduleName === 'hebdomadaire') {
            schedule = '* * * * *'//'0 0 * * 0';
        } else if (scheduleName === 'mensuelle') {
            schedule = '*/2 * * * *'; //'0 0 1 * *' First day of every month at 12:00 AM
        } else if (scheduleName === 'trimestrielle') {
            schedule = '0 0 1 */3 *'; // First day of every 3rd month at 12:00 AM
        } else {
            schedule = '0 0 1 1 *'; // January 1st at 12:00 AM
        }

        // Define your email template
        const emailTemplate = {
            to,
            from: process.env.EMAIL_FROM,
            subject,
            html: text,
        };

        // Update the schedule for the specified user
        userSchedules[userId] = schedule;

        // Cancel the existing cron job for the user, if any
        if (cronJobs[userId]) {
            cronJobs[userId].stop();
        }

        // Schedule the email sending for the user
        cronJobs[userId] = cron.schedule(schedule, async () => {
            // Send the email
            try {
                await sgMail.send(emailTemplate);
                console.log(`Email sent successfully to ${to}`);
            } catch (error) {
                console.error(`Error sending email to ${to}:`, error);
            }
        });

        res.status(200).json({ message: 'Schedule updated' });
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
