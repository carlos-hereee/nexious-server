import sendGrid, { ResponseError } from "@sendgrid/mail";
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
    const msg = { ...email, from: email.from || "carlos.h@nexious.tech", html: textToHTML(email.text) };
    await sendGrid.send(msg);
    return { status: true };
  } catch (error) {
    const err = error as ResponseError;
    console.log("error unable to send email  :>> ", err.response);
    console.log("sendGridError unable to send email  :>> ", err.response.body);
    return { status: false };
  }
};
