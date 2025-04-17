import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);

// resend.emails.send({
//   from: 'onboarding@resend.dev',
//   to: 'soler98@hotmail.es',
//   subject: 'Hello World, I´m Jesús',
//   html: '<h1>Hello world!</h1><p>Perfect, you just subscribed to the best IT newsletter in the world.\nStarting this week, you’ll receive the best articles from the tech world.</strong>!</p>'
// });

// from: 'onboarding@resend.dev',
