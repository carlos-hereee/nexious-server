import sendGrid from "@sendgrid/mail";
import { sendgridKey } from "./config";
import { EmailParams } from "@app/app";

// configure apikey
sendGrid.setApiKey(sendgridKey);

// transform text data to html
const textToHTML = (text: string) => {
  return text
    .split(".")
    .map((t) => `<p>${t}.</p><br/><br/>`)
    .join(" ");
};
export const sendEmail = async (email: EmailParams) => {
  try {
    // format data to send
    const msg = {
      to: email.to,
      from: email.from || "carlos.h@nexious.tech",
      subject: email.subject,
      text: email.text,
      html: textToHTML(email.text),
    };
    await sendGrid.send(msg);
    return { status: true };
  } catch (error) {
    console.log("error unable to send email  :>> ", error);
    return { status: false };
  }
};
