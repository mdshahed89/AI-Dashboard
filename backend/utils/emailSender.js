import nodemailer from "nodemailer"


const emailSender = async (mailOptions) => {
  try {
    
    const transporter = nodemailer.createTransport({
      // service: "gmail",
    host: "smtp.domeneshop.no", // Change this to your actual SMTP host
    port: 587, // Try 465 if this doesn’t work
    secure: false, // Set to true if using port 465
      auth: {
        user: process.env.EMAIL, 
        pass: process.env.EMAIL_PASSWORD, 
      },
    });

    
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent: " + info.response);
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Failed to send email", error };
  }
};

export default emailSender