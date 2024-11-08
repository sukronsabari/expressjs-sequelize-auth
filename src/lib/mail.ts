import 'dotenv/config';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.APP_URL;

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/verify-email?token=${token}`;

  const { error } = await resend.emails.send({
    from: 'mail-dev@sukronsabari.cloud',
    to: email,
    subject: 'Confirm your email',
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });

  if (error) {
    console.error(error);
  }
};
