import sgMail from '@sendgrid/mail';
import cron from 'node-cron';
import { getAllClients, getAllConsultants, getAllManagers, getAllUsersByRole } from '../../../db/handlers/users_handlers';
import { getCron2MonthsAgoSchedule } from '../../../utils/otherFunctions';

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Store the user schedules and cron jobs in separate objects
const userSchedules = {};
const cronJobs = {};

export default async function handler(req, res) {
    if (req.method === 'GET') {
        res.status(200).json({ userSchedules });
    } else if (req.method === 'POST') {
        const { userId, role, newExpirationDate } = req.body;
        if (role != "Admin") {
            let schedule = getCron2MonthsAgoSchedule(newExpirationDate) //'0 0 * * 0';

            // Define your email template
            const emailTemplate = {
                to: process.env.EMAIL_FROM,
                from: process.env.EMAIL_FROM,
                subject: "MA QVT : Rappel expiration d'un utilisateur",
                html: "Le délai d'expiration de ce compte est dans 2 mois",
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
                    console.log(`Email sent successfully to ${process.env.EMAIL_FROM}`);
                } catch (error) {
                    console.error(`Error sending email to ${process.env.EMAIL_FROM}:`, error);
                }
            });
        } else {
            const client = await getAllClients()
            const managers = await getAllManagers()
            const users = await getAllUsersByRole("User")
            const allUsers = [...client, ...managers, ...users]

            allUsers.forEach((value, index) => {
                let schedule = getCron2MonthsAgoSchedule(value.date) //'0 0 * * 0';
                
                // Define your email template
                const emailTemplate = {
                    to: process.env.EMAIL_FROM,
                    from: process.env.EMAIL_FROM,
                    subject: "MA QVT : Rappel expiration d'un utilisateur",
                    html: "Le délai d'expiration de ce compte est dans 2 mois",
                };
                // Update the schedule for the specified user
                userSchedules[value._id] = schedule;
                // Cancel the existing cron job for the user, if any
                if (cronJobs[value._id]) {
                    cronJobs[value._id].stop();
                }
                // Schedule the email sending for the user
                cronJobs[value._id] = cron.schedule(schedule, async () => {
                    // Send the email
                    try {
                        await sgMail.send(emailTemplate);
                        console.log(`Email sent successfully to ${process.env.EMAIL_FROM}`);
                    } catch (error) {
                        console.error(`Error sending email to ${process.env.EMAIL_FROM}:`, error);
                    }
                });
            })
        }



        res.status(200).json({ message: 'Schedule updated' });
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
