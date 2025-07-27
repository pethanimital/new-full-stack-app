// Slack notification utility
export async function notifySlack(message: string) {
  const webhook = process.env.SLACK_WEBHOOK_URL;
  if (!webhook) {
    console.log("Slack webhook not configured, skipping notification");
    return;
  }

  try {
    await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: message }),
    });
    console.log("Slack notification sent:", message);
  } catch (error) {
    console.error("Failed to send Slack notification:", error);
  }
}

// Email notification utility (simplified version)
export async function sendSecurityEmail(subject: string, message: string) {
  const adminEmail = process.env.ADMIN_ALERT_EMAIL;
  if (!adminEmail) {
    console.log("Admin email not configured, skipping notification");
    return;
  }

  // In a real application, you would use a service like SendGrid, Mailgun, or AWS SES
  // For now, we'll just log the email
  console.log("SECURITY EMAIL ALERT:");
  console.log("To:", adminEmail);
  console.log("Subject:", subject);
  console.log("Message:", message);
  console.log("---");
}

// Combined notification function for admin actions
export async function notifyAdminAction(action: string, details: Record<string, any>) {
  const timestamp = new Date().toISOString();
  const message = `🚨 ADMIN ACTION: ${action} at ${timestamp}\nDetails: ${JSON.stringify(details, null, 2)}`;
  
  // Send to Slack
  await notifySlack(message);
  
  // Send email
  await sendSecurityEmail(
    `Admin Action Alert: ${action}`,
    `An administrative action was performed:\n\n${message}`
  );
}