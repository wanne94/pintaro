import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Email configuration types
interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  locale?: string;
}

// Create reusable transporter
const createTransporter = () => {
  // For production, use actual SMTP credentials
  // For development/testing, use Ethereal Email or similar service
  
  // Example with Gmail (requires app-specific password)
  // return nodemailer.createTransporter({
  //   service: 'gmail',
  //   auth: {
  //     user: process.env.EMAIL_USER,
  //     pass: process.env.EMAIL_APP_PASSWORD
  //   }
  // });

  // Example with custom SMTP
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

export async function POST(request: Request) {
  try {
    const body: ContactFormData = await request.json();
    
    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = createTransporter();

    // Service names mapping
    const serviceNames: Record<string, Record<string, string>> = {
      polishing: {
        de: 'Polieren',
        en: 'Polishing',
        it: 'Lucidatura'
      },
      dent_removal: {
        de: 'Dellenentfernung',
        en: 'Dent Removal',
        it: 'Rimozione Ammaccature'
      },
      small_paint_jobs: {
        de: 'Kleine Lackierungen',
        en: 'Small Paint Jobs',
        it: 'Piccoli Lavori di Verniciatura'
      },
      complete_paint_jobs: {
        de: 'Komplette Lackierungen',
        en: 'Complete Paint Jobs',
        it: 'Verniciature Complete'
      },
      car_wrapping: {
        de: 'Autofolierung',
        en: 'Car Wrapping',
        it: 'Car Wrapping'
      },
      lettering: {
        de: 'Beschriftung',
        en: 'Lettering',
        it: 'Scritte'
      },
      other: {
        de: 'Andere',
        en: 'Other',
        it: 'Altro'
      }
    };

    const locale = body.locale || 'de';
    const serviceName = serviceNames[body.service]?.[locale] || body.service;

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_FROM || `"Pintaro Website" <${process.env.SMTP_USER}>`,
      to: process.env.EMAIL_TO || process.env.SMTP_USER, // Where to send contact form submissions
      replyTo: body.email,
      subject: `Neue Kontaktanfrage - ${serviceName} - ${body.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #ef4444; padding-bottom: 10px;">
            Neue Kontaktanfrage von der Website
          </h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${body.name}</p>
            <p style="margin: 10px 0;"><strong>E-Mail:</strong> <a href="mailto:${body.email}">${body.email}</a></p>
            <p style="margin: 10px 0;"><strong>Telefon:</strong> ${body.phone || 'Nicht angegeben'}</p>
            <p style="margin: 10px 0;"><strong>Service:</strong> ${serviceName}</p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h3 style="color: #333; margin-top: 0;">Nachricht:</h3>
            <p style="line-height: 1.6; white-space: pre-wrap;">${body.message}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #f0f0f0; border-radius: 8px;">
            <p style="margin: 5px 0; font-size: 12px; color: #666;">
              <strong>Gesendet am:</strong> ${new Date().toLocaleString('de-CH')}
            </p>
            <p style="margin: 5px 0; font-size: 12px; color: #666;">
              <strong>Sprache:</strong> ${locale.toUpperCase()}
            </p>
          </div>
        </div>
      `,
      text: `
        Neue Kontaktanfrage von der Website
        
        Name: ${body.name}
        E-Mail: ${body.email}
        Telefon: ${body.phone || 'Nicht angegeben'}
        Service: ${serviceName}
        
        Nachricht:
        ${body.message}
        
        Gesendet am: ${new Date().toLocaleString('de-CH')}
        Sprache: ${locale.toUpperCase()}
      `
    };

    // Send confirmation email to customer (optional)
    const customerMailOptions = {
      from: process.env.EMAIL_FROM || `"Pintaro" <${process.env.SMTP_USER}>`,
      to: body.email,
      subject: locale === 'de' ? 'Ihre Anfrage bei Pintaro' : 
               locale === 'it' ? 'La sua richiesta a Pintaro' : 
               'Your inquiry at Pintaro',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #ef4444; padding-bottom: 10px;">
            ${locale === 'de' ? 'Vielen Dank für Ihre Anfrage' : 
              locale === 'it' ? 'Grazie per la sua richiesta' : 
              'Thank you for your inquiry'}
          </h2>
          
          <p style="line-height: 1.6;">
            ${locale === 'de' ? 'Wir haben Ihre Anfrage erhalten und werden uns so schnell wie möglich bei Ihnen melden.' : 
              locale === 'it' ? 'Abbiamo ricevuto la sua richiesta e la contatteremo al più presto.' : 
              'We have received your inquiry and will contact you as soon as possible.'}
          </p>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>${locale === 'de' ? 'Ihre Anfrage:' : locale === 'it' ? 'La sua richiesta:' : 'Your inquiry:'}</h3>
            <p><strong>Service:</strong> ${serviceName}</p>
            <p style="white-space: pre-wrap;">${body.message}</p>
          </div>
          
          <p style="line-height: 1.6;">
            ${locale === 'de' ? 'Mit freundlichen Grüßen' : 
              locale === 'it' ? 'Cordiali saluti' : 
              'Best regards'}<br>
            <strong>Pintaro Team</strong>
          </p>
        </div>
      `
    };

    // Send emails
    await transporter.sendMail(mailOptions);
    
    // Send confirmation to customer (optional - can be disabled if not needed)
    if (process.env.SEND_CONFIRMATION === 'true') {
      await transporter.sendMail(customerMailOptions);
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Email sent successfully' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    
    // In development, return more detailed error
    if (process.env.NODE_ENV === 'development') {
      return NextResponse.json(
        { 
          error: 'Failed to send email', 
          details: error instanceof Error ? error.message : 'Unknown error'
        },
        { status: 500 }
      );
    }
    
    // In production, return generic error
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}