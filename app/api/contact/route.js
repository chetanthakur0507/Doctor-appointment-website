import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { name, email, phone, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return Response.json(
        { success: false, message: 'Please fill all required fields' },
        { status: 400 }
      );
    }

    // Create transporter
    // NOTE: You need to add these environment variables to your .env file:
    // EMAIL_USER=your-email@gmail.com
    // EMAIL_PASS=your-app-password
    const transporter = nodemailer.createTransport({
      service: 'gmail', // You can use other services like 'outlook', 'yahoo', etc.
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your email password or app password
      },
    });

    // Email to admin/you
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Your email where you want to receive messages
      subject: `New Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(to right, #2563eb, #1d4ed8); padding: 20px; border-radius: 10px 10px 0 0;">
            <h2 style="color: white; margin: 0;">🔔 New Contact Form Submission</h2>
          </div>
          
          <div style="background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb;">
            <h3 style="color: #1f2937; margin-top: 0;">Contact Details:</h3>
            
            <div style="background: white; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #3b82f6;">
              <p style="margin: 5px 0;"><strong>👤 Name:</strong> ${name}</p>
              <p style="margin: 5px 0;"><strong>📧 Email:</strong> <a href="mailto:${email}" style="color: #2563eb;">${email}</a></p>
              <p style="margin: 5px 0;"><strong>📞 Phone:</strong> ${phone || 'Not provided'}</p>
              <p style="margin: 5px 0;"><strong>📋 Subject:</strong> ${subject}</p>
            </div>
            
            <div style="background: white; padding: 15px; margin: 10px 0; border-radius: 8px;">
              <h4 style="color: #1f2937; margin-top: 0;">💬 Message:</h4>
              <p style="color: #4b5563; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background: #dbeafe; border-radius: 8px;">
              <p style="margin: 0; color: #1e40af; font-size: 14px;">
                <strong>⏰ Received:</strong> ${new Date().toLocaleString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
          
          <div style="background: #1f2937; padding: 15px; border-radius: 0 0 10px 10px; text-align: center;">
            <p style="color: #9ca3af; margin: 0; font-size: 12px;">
              This email was sent from your Medi.care contact form
            </p>
          </div>
        </div>
      `,
    };

    // Confirmation email to user
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting Medi.care',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(to right, #2563eb, #1d4ed8); padding: 20px; border-radius: 10px 10px 0 0;">
            <h2 style="color: white; margin: 0;">✅ Message Received Successfully!</h2>
          </div>
          
          <div style="background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb;">
            <p style="color: #1f2937; font-size: 16px;">Dear ${name},</p>
            
            <p style="color: #4b5563; line-height: 1.6;">
              Thank you for contacting <strong>Medi.care</strong>. We have received your message and will get back to you as soon as possible.
            </p>
            
            <div style="background: white; padding: 15px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #10b981;">
              <h4 style="color: #1f2937; margin-top: 0;">📋 Your Message Summary:</h4>
              <p style="margin: 5px 0; color: #4b5563;"><strong>Subject:</strong> ${subject}</p>
              <p style="margin: 5px 0; color: #4b5563;"><strong>Date:</strong> ${new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric'
              })}</p>
            </div>
            
            <p style="color: #4b5563; line-height: 1.6;">
              Our support team typically responds within <strong>24 hours</strong>. For urgent medical matters, please call our emergency line at <strong>+1 (555) 999-9999</strong>.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}" 
                 style="background: linear-gradient(to right, #2563eb, #1d4ed8); color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
                Visit Our Website
              </a>
            </div>
            
            <div style="background: #dbeafe; padding: 15px; border-radius: 8px; margin-top: 20px;">
              <p style="color: #1e40af; margin: 0; font-size: 14px;">
                <strong>💡 Quick Tip:</strong> You can book appointments directly from our website or call us at +1 (555) 000-1234
              </p>
            </div>
          </div>
          
          <div style="background: #1f2937; padding: 15px; border-radius: 0 0 10px 10px; text-align: center;">
            <p style="color: #9ca3af; margin: 5px 0; font-size: 12px;">
              Best regards,<br/>
              <strong style="color: white;">Medi.care Team</strong>
            </p>
            <p style="color: #6b7280; margin: 5px 0; font-size: 11px;">
              123 Healthcare Way, Medical District | support@medicare.com | +1 (555) 000-1234
            </p>
          </div>
        </div>
      `,
    };

    // Send both emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    return Response.json(
      { success: true, message: 'Message sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return Response.json(
      { success: false, message: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
