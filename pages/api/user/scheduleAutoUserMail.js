import cron from 'node-cron';
import { getAllClients, getAllConsultants, getAllManagers, getAllUsersByRole } from '../../../db/handlers/users_handlers';
import { getCron2MonthsAgoSchedule } from '../../../utils/otherFunctions';
import { getMailAdminTemplate } from '../../../utils/getMailTemplate';

// Initialize SendGrid
// import sgMail from '@sendgrid/mail';
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

import mailchimp from '@mailchimp/mailchimp_transactional';

// Store the user schedules and cron jobs in separate objects
const userSchedules = {};
const cronJobs = {};

export default async function handler(req, res) {
    if (req.method === 'GET') {
        res.status(200).json({ userSchedules });
    } else if (req.method === 'POST') {
        const { userId, role, newExpirationDate, email, username } = req.body;
        if (role != "Admin") {
            let schedule = getCron2MonthsAgoSchedule(newExpirationDate) //'0 0 * * 0';

            // Define your email template
            // const emailTemplate = {
            //     to: process.env.EMAIL_FROM,
            //     from: process.env.EMAIL_FROM,
            //     subject: "MA QVT : Rappel expiration d'un utilisateur",
            //     html: getMailAdminTemplate(`${username} : ${email}`, `La date d'expiration de l'utilisateur est à 2 mois de l'expiration`, "", ""),
            // };

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
                    // await sgMail.send(emailTemplate);
                    const mandrillSendOption = {
                        message: {
                            from_email: process.env.EMAIL_FROM,
                            subject: "MA QVT : Rappel expiration d'un utilisateur",
                            html: getMailAdminTemplate(`${username} : ${email}`, `La date d'expiration de l'utilisateur est à 2 mois de l'expiration`, "", ""),
                            to: [{ email: process.env.EMAIL_FROM, type: 'to' }],
                        },
                    };
                    const client = mailchimp(process.env.MAILCHIMP_API_KEY);
                    const response = await client.messages.send(mandrillSendOption);
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
                // const emailTemplate = {
                //     to: process.env.EMAIL_FROM,
                //     from: process.env.EMAIL_FROM,
                //     subject: "MA QVT : Rappel expiration d'un utilisateur",
                //     html: getMailAdminTemplate(`${value.username} : ${value.email}`, `La date d'expiration de l'utilisateur est à 2 mois de l'expiration`, "", ""),
                // };

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
                        // await sgMail.send(emailTemplate);
                        const mandrillSendOption = {
                            message: {
                                from_email: process.env.EMAIL_FROM,
                                subject: "MA QVT : Rappel expiration d'un utilisateur",
                                html: getMailAdminTemplate(`${value.username} : ${value.email}`, `La date d'expiration de l'utilisateur est à 2 mois de l'expiration`, "", ""),
                                to: [{ email: process.env.EMAIL_FROM, type: 'to' }],
                            },
                        };
                        const client = mailchimp(process.env.MAILCHIMP_API_KEY);
                        const response = await client.messages.send(mandrillSendOption);
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
