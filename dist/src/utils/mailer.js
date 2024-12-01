"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("config"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const pug_1 = __importDefault(require("pug"));
const logger_1 = __importDefault(require("./logger"));
const smtp = config_1.default.get('smtp');
class Email {
    constructor(to, firstName, verificationCode) {
        this.to = to;
        this.firstName = firstName;
        this.verificationCode = verificationCode;
    }
    /**@description create nodemailer transport */
    newTransporter() {
        const transporter = nodemailer_1.default.createTransport(Object.assign(Object.assign({}, smtp), { auth: { user: smtp.user, pass: smtp.pass } }));
        return transporter;
    }
    /**@description send custom email */
    send(template, subject, text) {
        return __awaiter(this, void 0, void 0, function* () {
            const html = pug_1.default.renderFile(`${__dirname}/../template/email/${template}.pug`, {
                firstName: this.firstName,
                subject,
                verificationCode: this.verificationCode,
            });
            yield this.newTransporter().sendMail({
                from: process.env.EMAIL_FROM,
                to: this.to,
                subject: subject,
                text: text,
                html,
            }, (error, info) => {
                if (error) {
                    return logger_1.default.error(error, 'Error sending email');
                }
                logger_1.default.info(`Email sent: ${nodemailer_1.default.getTestMessageUrl(info)}`);
            });
        });
    }
    /** @description send welcome message and send verification code */
    sendWelcome() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.send('welcome', 'Welcome', 'Welcome to our community');
        });
    }
    sendPasswordReset() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('done');
            return yield this.send('passwordReset', 'Reset Password', 'your password reset token (valid for only 10 minutes)');
        });
    }
}
exports.default = Email;
//# sourceMappingURL=mailer.js.map