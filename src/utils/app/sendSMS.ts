import client from "twilio";
import { twilioAccountSid, twilioToken, twilioNumber } from "./config";

interface Param {
  phone: string;
  textData: string;
}
export const sendSMS = async ({ phone, textData }: Param) => {
  try {
    await client(twilioAccountSid, twilioToken).messages.create({ body: textData, from: twilioNumber, to: phone });
  } catch (error) {
    console.log("error :>> ", error);
  }
};
