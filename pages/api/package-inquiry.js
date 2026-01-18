export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, eventDate, headcount, packageId, message } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  const inquiryData = {
    name,
    email,
    phone,
    eventDate,
    headcount,
    packageId,
    message,
    submittedAt: new Date().toISOString()
  };

  console.log('[Package Inquiry Received]', inquiryData);

  // TODO: Integrate email service (SendGrid, Nodemailer, etc.) to send to admin/order handler
  // Example (when ready):
  // try {
  //   await sendEmail({
  //     to: process.env.ADMIN_EMAIL,
  //     subject: `New Package Inquiry from ${name}`,
  //     html: generateEmailTemplate(inquiryData)
  //   });
  // } catch (emailError) {
  //   console.error('Email send failed:', emailError);
  //   return res.status(500).json({ error: 'Failed to send inquiry' });
  // }

  return res.status(200).json({ 
    ok: true, 
    message: `Quote request received! We will email you at ${email} within 24 hours.` 
  });
}
