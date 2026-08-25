// const nodemailer = require("nodemailer");

// const sendEmail = async (options) => {
//   const transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: Number(process.env.EMAIL_PORT),
//     secure: process.env.EMAIL_PORT === "465",

//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//   });

//   const mailOptions = {
//     from: `"Employee Skill Discovery Platform" <${process.env.EMAIL_USER}>`,
//     to: options.email,
//     subject: options.subject,
//     html: options.html,
//   };

//   await transporter.sendMail(mailOptions);
// };

// module.exports = sendEmail;

// const { Resend } = require("resend");
// const resend = new Resend(process.env.RESEND_API_KEY);

// const sendEmail = async (options) => {
//   const { error } = await resend.emails.send({
//     from: "Employee Skill Discovery Platform <onboarding@resend.dev>",
//     to: options.email,
//     subject: options.subject,
//     html: options.html,
//   });

//   if (error) {
//     throw new Error(error.message || "Failed to send email");
//   }
// };

// module.exports = sendEmail;

const { Resend } = require("resend");

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const sendEmail = async ({ to, subject, html }) => {
  if (!resend) {
    console.log(
      "⚠️ RESEND_API_KEY not configured locally. Email skipped."
    );

    return {
      success: false,
      skipped: true,
    };
  }

  return await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;