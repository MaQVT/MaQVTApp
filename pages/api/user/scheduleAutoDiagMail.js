import cron from 'node-cron';
import { getAllClients, getAllConsultants, getAllManagers, getAllUsersByRole } from '../../../db/handlers/users_handlers';
import { getMailTemplate } from '../../../utils/getMailTemplate';

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
        const { userId, role, email, scheduleName } = req.body;
        const text = getMailTemplate(
            "Notification pour passer le questionnaire",
            `Bonjour, <br /><br />Vous êtes invité.e à effectuer un nouveau Diagnostic de QVT Personnelle sur l’Application “Ma QVT”. <br /><br />(N’hésitez pas personnaliser la fréquence de vos notifications dans votre espace personnel) <br /><br />Veuillez cliquer sur le lien ci-dessous :`,
            process.env.NEXT_PUBLIC_APP_URL,
            "Réaliser un nouvel auto-diagnostic de QVT personnelle",
            ""
        );
        if (role != "Admin") {
            let schedule;
            if (scheduleName === 'semestrielle') {
                schedule = '0 0 1 1,7 *'; // 12:00 AM on the first day of January and July
            } else if (scheduleName === 'mensuelle') {
                schedule = '0 0 1 * *'; // 12:00 AM on the first day of every month
            } else if (scheduleName === 'trimestrielle') {
                schedule = '0 0 1 */3 *'; // 12:00 AM on the first day of every 3rd month
            } else if (scheduleName === 'annuelle') {
                schedule = '0 0 1 1 *'; // 12:00 AM on the first day of every year
            } else {
                schedule = '0 0 1 1 *'; // January 1st at 12:00 AM
            }

            // Define your email template

            // const emailTemplate = {
            //     to: email,
            //     from: process.env.EMAIL_FROM,
            //     subject: "MA QVT : Notification pour passer le questionnaire",
            //     html: text,
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
                            subject: "MA QVT : Notification pour passer le questionnaire",
                            html: text,
                            to: [{ email: email, type: 'to' }],
                        },
                    };
                    const client = mailchimp(process.env.MAILCHIMP_API_KEY);
                    const response = await client.messages.send(mandrillSendOption);
                    console.log(`Email sent successfully to ${email}`);
                } catch (error) {
                    console.error(`Error sending email to ${email}:`, error);
                }
            });
            // console.log("userSchedules")
            // console.log(userSchedules)
            // console.log("cronJobs")
            // console.log(cronJobs)
        } else {
            const managers = await getAllManagers()
            const users = await getAllUsersByRole("User")
            const allUsers = [...managers, ...users]
            allUsers.forEach((value, index) => {
                let schedule;
                if (value.delay_mail === 'semestrielle') { 
                    schedule = '0 0 1 1,7 *'; // 12:00 AM on the first day of January and July
                } else if (value.delay_mail === 'mensuelle') {
                    schedule = '*/2 * * * *'; //'0 0 1 * *' First day of every month at 12:00 AM
                } else if (value.delay_mail === 'trimestrielle') {
                    schedule = '0 0 1 */3 *'; // First day of every 3rd month at 12:00 AM
                } else if (value.delay_mail === 'annuelle') {
                    schedule = '0 0 1 1 *'; // First day of the first month at 12:00 AM
                } else {
                    schedule = '0 0 1 1 *'; // January 1st at 12:00 AM
                }

                // Define your email template
                // const emailTemplate = {
                //     to: value.email,
                //     from: process.env.EMAIL_FROM,
                //     subject: "MA QVT : Notification pour passer le questionnaire",
                //     html: text,
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
                                subject: "MA QVT : Notification pour passer le questionnaire",
                                html: text,
                                to: [{ email: value.email, type: 'to' }],
                            },
                        };
                        const client = mailchimp(process.env.MAILCHIMP_API_KEY);
                        const response = await client.messages.send(mandrillSendOption);
                        console.log(`Email sent successfully to ${value.email}`);
                    } catch (error) {
                        console.error(`Error sending email to ${value.email}:`, error);
                    }
                });
            })
        }
        res.status(200).json({ message: 'Schedule updated' });
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
