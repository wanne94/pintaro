# Email Setup Guide for Contact Form

## Quick Setup

1. **Copy the example environment file:**
   ```bash
   cp .env.example .env.local
   ```

2. **Configure your email settings in `.env.local`:**

### Option 1: Gmail (Recommended for simplicity)

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password  # NOT your regular password!

EMAIL_FROM="Pintaro Website" <noreply@pintaro.ch>
EMAIL_TO=info@pintaro.ch
SEND_CONFIRMATION=true
```

**Important for Gmail:**
1. Enable 2-factor authentication on your Google account
2. Generate an app-specific password:
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and generate a password
   - Use this generated password as SMTP_PASS

### Option 2: Professional Email Provider (Recommended for production)

```env
# Example with Hostpoint/Infomaniak/other Swiss providers
SMTP_HOST=mail.your-provider.ch
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=noreply@pintaro.ch
SMTP_PASS=your-email-password

EMAIL_FROM="Pintaro" <noreply@pintaro.ch>
EMAIL_TO=info@pintaro.ch
SEND_CONFIRMATION=true
```

### Option 3: SendGrid/Mailgun/etc. (Best for high volume)

```env
# SendGrid example
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key

EMAIL_FROM="Pintaro" <noreply@pintaro.ch>
EMAIL_TO=info@pintaro.ch
SEND_CONFIRMATION=true
```

## Testing

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Test the contact form:**
   - Go to http://localhost:3000/#kontakt
   - Fill in the form and submit
   - Check your email inbox

## Production Deployment

1. **Add environment variables to your hosting provider:**
   - Vercel: Project Settings → Environment Variables
   - Netlify: Site Settings → Environment Variables
   - Traditional hosting: Add to server environment or `.env` file

2. **Security notes:**
   - Never commit `.env.local` to git
   - Use strong passwords for email accounts
   - Consider using dedicated transactional email services for production
   - Monitor for spam/abuse

## Troubleshooting

### "Failed to send email" error
- Check SMTP credentials are correct
- Verify SMTP host and port
- For Gmail: Make sure you're using app password, not regular password
- Check firewall/hosting provider allows outbound SMTP

### Emails going to spam
- Set up SPF/DKIM records for your domain
- Use a proper "from" address with your domain
- Avoid spam trigger words in content

### No email received
- Check EMAIL_TO address is correct
- Look in spam/junk folder
- Verify SMTP server is not blocking the connection
- Check development console for error details

## Email Features

The contact form backend includes:
- ✅ Multi-language support (DE/EN/IT)
- ✅ Service selection tracking
- ✅ HTML formatted emails
- ✅ Optional customer confirmation emails
- ✅ Spam protection (basic validation)
- ✅ Error handling and user feedback

## Support

For issues or questions about email configuration, please check:
- Your email provider's SMTP documentation
- The error logs in development console
- The API response at `/api/contact` endpoint