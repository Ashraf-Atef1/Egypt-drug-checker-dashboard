const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
const fs = require("fs");

class EmailClient {
  constructor() {
    this.smtpConfig = {
      host: process.env.SMTP_SERVER,
      port: parseInt(process.env.SMTP_PORT, 10),
      secure: true,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    };
    this.emailFrom = process.env.EMAIL_FROM;
    this.templatesDir = path.resolve(
      process.cwd(),
      process.env.EMAIL_TEMPLATES_DIR
    );
  }

  async sendEmail(to, subject, html) {
    const transporter = nodemailer.createTransport(this.smtpConfig);
    await transporter.sendMail({ from: this.emailFrom, to, subject, html });
  }

  renderTemplate(templateName, context) {
    const templatePath = path.join(this.templatesDir, templateName);
    if (!fs.existsSync(templatePath)) {
      throw new Error(`Template not found: ${templatePath}`);
    }
    return ejs.render(fs.readFileSync(templatePath, "utf8"), context);
  }

  async sendResetPassword(toEmail, token) {
    const link = `${process.env.DOMAIN}/api/v1/users/reset-password/${token}`;
    const html = this.renderTemplate("reset_password.ejs", {
      reset_link: link,
    });
    await this.sendEmail(toEmail, "Password Reset Request", html);
  }

  async sendVerificationEmail(toEmail, token) {
    const link = `${process.env.DOMAIN}/api/v1/users/verify-email/${token}`;
    const html = this.renderTemplate("verify_email.ejs", {
      verification_link: link,
    });
    await this.sendEmail(toEmail, "Email Verification", html);
  }
}

const emailClient = new EmailClient();

module.exports = emailClient;
