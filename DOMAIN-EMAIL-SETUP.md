# Email Configuration for pintaro.ch Domain

## ✅ Your Email Settings

Based on your hosting provider's configuration, here are the correct settings for your contact form:

### SMTP Configuration (for sending emails):
- **Server:** pintaro.ch
- **Port:** 465 (SSL/TLS)
- **Security:** SSL/TLS (secure)
- **Username:** welcome@pintaro.ch
- **Password:** [Your email account password]

## 📝 Required Action:

### Update `.env.local` file:

Open `.env.local` and update the password field:

```env
# Email Configuration - Professional Domain (pintaro.ch)
SMTP_HOST=pintaro.ch
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=welcome@pintaro.ch
SMTP_PASS=your-actual-password-here    # ← ADD YOUR PASSWORD HERE

# Where to receive contact form submissions
EMAIL_FROM="Pintaro Website" <welcome@pintaro.ch>
EMAIL_TO=welcome@pintaro.ch

# Send confirmation to customers
SEND_CONFIRMATION=true
```

### ⚠️ IMPORTANT:
Replace `your-actual-password-here` with the actual password for welcome@pintaro.ch email account.

## 🚀 How to Test:

1. **Update the password** in `.env.local`
2. **Restart the development server:**
   ```bash
   # Stop the server (Ctrl+C) and start again
   npm run dev
   ```
3. **Test the form:**
   - Go to your website's contact form
   - Fill in test data
   - Submit the form
   - Check welcome@pintaro.ch inbox

## 🔧 Troubleshooting:

If emails aren't sending:

1. **Check password:** Make sure you're using the correct password for welcome@pintaro.ch
2. **Check console:** Look for error messages in the terminal where npm run dev is running
3. **Firewall/Security:** Some hosting providers require you to whitelist IP addresses or enable SMTP access
4. **SSL Certificate:** If you get SSL errors, you might need to add this to the transporter config:
   ```javascript
   tls: {
     rejectUnauthorized: false
   }
   ```

## 📧 Alternative Ports:

If port 465 doesn't work, you can try:
- Port 587 with SMTP_SECURE=false (STARTTLS)
- Port 25 with SMTP_SECURE=false (not recommended)

## 🔒 Security Notes:

- Never commit `.env.local` to Git (it's already in .gitignore)
- For production, set these environment variables in your hosting platform
- Consider using environment-specific email addresses (noreply@pintaro.ch for automated emails)

## ✅ Current Status:

- ✅ Email API endpoint configured
- ✅ Contact form connected to real endpoint
- ✅ Professional domain settings configured
- ⏳ **Waiting for:** Password to be added to `.env.local`

Once you add the password, the email system will be fully functional!