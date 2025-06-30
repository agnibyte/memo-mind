// import { postSiteApiData } from "@/utilities/services/apiService";
import { Twilio } from "twilio";

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;

const client = new Twilio(accountSid, authToken);

export default async function sendMessage(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { message, contacts } = req.body;

  if (
    !message ||
    !contacts ||
    !Array.isArray(contacts) ||
    contacts.length === 0
  ) {
    return res
      .status(400)
      .json({ error: "Message and at least one contact are required." });
  }

  try {
    for (const contact of contacts) {
      await client.messages.create({
        body: message,
        from: process.env.TWILIO_SENDER_PHONE_NO,
        to: contact.trim(),
      });
    }

    return res
      .status(200)
      .json({ success: true, message: "Messages sent successfully" });
  } catch (error) {
    console.error("Error sending message:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to send message",
      details: error.message,
    });
  }
}

// postSiteApiData("SEND_SMS", request)
//   .then((result) => {
//     if (result.status) {
//       response.status = true;
//       response.message = "Message sent successfully";
//     } else {
//       response.message = result.message || "Failed to send message.";
//     }
//     resolve(response);
//   })
//   .catch((error) => {
//     response.message =
//       error.message || "An error occurred while sending the message.";
//     reject(response);
//   });
