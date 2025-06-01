import nodemailer from 'nodemailer';

// Konfiguracja transportera email
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export interface ContactEmailData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  specialistName: string;
  specialistEmail: string;
}

export async function sendContactEmail(data: ContactEmailData) {
  try {
    // Email do specjalisty
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@psycholodzy-platform.pl',
      to: data.specialistEmail,
      subject: `Nowe zapytanie od ${data.name} - OpenMind`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e293b;">Nowe zapytanie z platformy OpenMind</h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #334155; margin-top: 0;">Dane kontaktowe:</h3>
            <p><strong>Imię i nazwisko:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            ${data.phone ? `<p><strong>Telefon:</strong> ${data.phone}</p>` : ''}
          </div>
          
          <div style="background: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h3 style="color: #334155; margin-top: 0;">Wiadomość:</h3>
            <p style="line-height: 1.6;">${data.message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 14px;">
            <p>Ta wiadomość została wysłana przez platformę OpenMind.</p>
            <p>Możesz odpowiedzieć bezpośrednio na ten email aby skontaktować się z pacjentem.</p>
          </div>
        </div>
      `,
    });

    // Email potwierdzający do pacjenta
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@psycholodzy-platform.pl',
      to: data.email,
      subject: `Potwierdzenie wysłania wiadomości - OpenMind`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e293b;">Dziękujemy za kontakt!</h2>
          
          <p>Cześć ${data.name},</p>
          
          <p>Twoja wiadomość została pomyślnie wysłana do <strong>${data.specialistName}</strong>.</p>
          
          <div style="background: #f0fdfa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0f766e;">
            <h3 style="color: #0f766e; margin-top: 0;">Co dalej?</h3>
            <ul style="color: #134e4a;">
              <li>Specjalista otrzymał Twoją wiadomość i skontaktuje się z Tobą w ciągu 24-48 godzin</li>
              <li>Odpowiedź otrzymasz bezpośrednio na podany adres email</li>
              <li>W razie pilnych spraw, skontaktuj się bezpośrednio telefonicznie</li>
            </ul>
          </div>
          
          <div style="background: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h3 style="color: #334155; margin-top: 0;">Twoja wiadomość:</h3>
            <p style="line-height: 1.6; color: #64748b;">${data.message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="margin-top: 30px; text-align: center;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}" 
               style="background: #0f766e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Wróć do OpenMind
            </a>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 14px; text-align: center;">
            <p>OpenMind - Platforma psychologów</p>
            <p>Znajdź swojego specjalistę</p>
          </div>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: (error as Error).message };
  }
} 