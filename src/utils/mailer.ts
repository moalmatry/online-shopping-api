import config from 'config';
import nodemailer, { Transporter } from 'nodemailer';
import pug from 'pug';
import log from './logger';

const smtp = config.get<{
  user: string;
  pass: string;
  host: string;
  port: number;
  secure: boolean;
}>('smtp');

class Email {
  private to: string;
  private firstName: string;
  private verificationCode?: string;
  constructor(to: string, firstName: string, verificationCode?: string) {
    this.to = to;
    this.firstName = firstName;
    this.verificationCode = verificationCode;
  }

  /**@description create nodemailer transport */
  private newTransporter(): Transporter {
    const transporter = nodemailer.createTransport({
      ...smtp,
      auth: { user: smtp.user, pass: smtp.pass },
    });
    return transporter;
  }

  /**@description send custom email */
  public async send(template: string, subject: string, text: string) {
    const html = pug.renderFile(`${__dirname}/../template/email/${template}.pug`, {
      firstName: this.firstName,
      subject,
      verificationCode: this.verificationCode,
    });
    await this.newTransporter().sendMail(
      {
        from: process.env.EMAIL_FROM,
        to: this.to,
        subject: subject,
        text: text,
        html,
      },
      (error, info) => {
        if (error) {
          return log.error(error, 'Error sending email');
        }

        log.info(`Email sent: ${nodemailer.getTestMessageUrl(info)}`);
      },
    );
  }

  /** @description send welcome message and send verification code */
  public async sendWelcome() {
    return await this.send('welcome', 'Welcome', 'Welcome to our community');
  }

  public async sendPasswordReset() {
    console.log('done');
    return await this.send('passwordReset', 'Reset Password', 'your password reset token (valid for only 10 minutes)');
  }
}

export default Email;
