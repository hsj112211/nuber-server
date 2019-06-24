import Mailgun from "mailgun-js";

const mailGunClient = new Mailgun({
  apiKey: process.env.MAILGUN_API_KEY || "",
  domain: "sandbox62d22b0de81b45d0873cbbc4b1b96bbb.mailgun.org"
});

const sendEmail = (subject: string, html: string) => {
  const emailData = {
    from: "hsj8888888@gmail.com",
    to: "hsj8888888@gmail.com",
    subject,
    html
  };
  return mailGunClient.messages().send(emailData);
};

export const sendVerificationEmail = (fullName: string, key: string) => {
  const emailSubject = `Hello ${fullName}, please verify your email`;
  const emailBody = `Verify your email by clicking <a href="http://nuber.com/verification/${key}/">here</a>`;
  return sendEmail(emailSubject, emailBody);
};
