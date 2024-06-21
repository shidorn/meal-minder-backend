import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT'),
      secure: false,
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        // pass: this.configService.get<string>('EMAIL_PASSWORD'),
      },
    });
  }

  async sendPasswordResetEmail(email: string, token: number): Promise<void> {
    const mailOptions = {
      from: '"Mail Minder" <donotreply@mlhuillier.com>',
      to: email,
      subject: 'Password Reset',
      text: `Use this code to reset your password: ${token}`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
