# Email Setup Instructions for Pintaro Contact Form

## Steps to Configure Email:

### 1. Setup Gmail App Password
1. Go to your Google Account settings: https://myaccount.google.com/
2. Enable 2-Factor Authentication (if not already enabled)
3. Go to App passwords: https://myaccount.google.com/apppasswords
4. Generate a new app password for "Mail"
5. Copy the 16-character password (looks like: xxxx-xxxx-xxxx-xxxx)

### 2. Update Environment Variables
Edit the `.env.local` file with your actual credentials:

```env
# Email Configuration - GMAIL
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your.gmail@gmail.com        # Your Gmail address
SMTP_PASS=xxxx-xxxx-xxxx-xxxx         # App password from step 1

# Where to receive contact form submissions
EMAIL_FROM="Pintaro Website" <noreply@pintaro.ch>
EMAIL_TO=welcome@pintaro.ch           # Email where you want to receive messages

# Send confirmation to customers
SEND_CONFIRMATION=true                 # Set to true to send confirmation emails
```

### 3. Alternative Email Providers

If using a different email provider (not Gmail), update these settings:

- **Outlook/Hotmail:**
  - SMTP_HOST=smtp-mail.outlook.com
  - SMTP_PORT=587

- **Yahoo:**
  - SMTP_HOST=smtp.mail.yahoo.com
  - SMTP_PORT=587 or 465

- **Custom Domain Email:**
  - Contact your hosting provider for SMTP details

### 4. Test the Form
1. Restart the development server: `npm run dev`
2. Go to the contact form on your website
3. Fill in the form and submit
4. Check both:
   - The EMAIL_TO address for the admin notification
   - The customer's email for the confirmation (if enabled)

### 5. Troubleshooting

If emails aren't sending:

1. **Check credentials:** Make sure SMTP_USER and SMTP_PASS are correct
2. **Gmail specific:** 
   - Ensure "Less secure app access" is NOT the method (use App Password instead)
   - Check if Gmail blocked the sign-in attempt (you'll get an email)
3. **Check spam folder:** Emails might be going to spam
4. **Test mode:** The form was previously in test mode. Make sure it's now using `/api/contact` endpoint

### 6. Production Deployment

For production, make sure to:
1. Set environment variables on your hosting platform (Vercel, Netlify, etc.)
2. Never commit `.env.local` to git (it's already in .gitignore)
3. Consider using a professional email service like SendGrid or Mailgun for better deliverability

## Current Status
✅ Nodemailer installed
✅ Email API endpoint created (`/app/api/contact/route.ts`)
✅ Contact form connected to email endpoint
✅ Environment variables template created

⚠️ **ACTION REQUIRED:** Update `.env.local` with your actual email credentials!