# Contact Form Email Setup Guide

## 📧 Email Configuration for Contact Form

The contact form now sends emails when users submit the form. Follow these steps to set it up:

### Step 1: Enable Gmail App Password

1. Go to your Google Account settings
2. Navigate to **Security** > **2-Step Verification** (enable if not already)
3. Scroll down to **App Passwords**
4. Generate a new app password for "Mail"
5. Copy the 16-character password

### Step 2: Update .env File

Create or update your `.env` file in the root directory:

```env
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-char-app-password
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Step 3: Test the Contact Form

1. Run your development server: `npm run dev`
2. Navigate to `/contact` page
3. Fill out and submit the form
4. Check your email inbox

### Features:

✅ **Admin Email**: You receive a formatted email with all contact form details
✅ **User Confirmation**: User gets a professional confirmation email
✅ **Beautiful HTML Templates**: Both emails have styled, professional layouts
✅ **Error Handling**: Proper error messages if email fails to send

### Email Details:

**Admin Email includes:**
- Name, Email, Phone, Subject
- Full message content
- Timestamp of submission
- Professional formatting with icons

**User Confirmation Email includes:**
- Thank you message
- Message summary
- Response time expectation
- Emergency contact info
- Link to website

### Alternative Email Services:

If not using Gmail, update the transporter in `/app/api/contact/route.js`:

**For Outlook:**
```javascript
service: 'outlook'
```

**For Yahoo:**
```javascript
service: 'yahoo'
```

**For Custom SMTP:**
```javascript
host: 'smtp.yourdomain.com',
port: 587,
secure: false,
auth: {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS,
}
```

### Troubleshooting:

**Error: "Invalid login"**
- Make sure you're using App Password, not regular Gmail password
- Check if 2-Step Verification is enabled

**Error: "Connection timeout"**
- Check your internet connection
- Verify SMTP settings

**Emails not arriving:**
- Check spam/junk folder
- Verify EMAIL_USER is correct in .env file
- Check Gmail sent folder to confirm emails are being sent

### Security Notes:

⚠️ Never commit your `.env` file to Git
⚠️ Keep your App Password secure
⚠️ Use environment variables for all sensitive data
