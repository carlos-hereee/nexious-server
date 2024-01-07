import stripe from "../connection";

export const udpateCustomer = async ({ email, name, id, invoiceSettings }) => {
  // preferred_locale: ["en", "es"]
  if (email && name) return await stripe.customers.update(id, { email, name });
  else if (email) return await stripe.customers.update(id, { email });
  else if (name) return await stripe.customers.update(id, { name });
  else if (invoiceSettings) {
    return await stripe.customers.update(id, { invoice_settings: invoiceSettings });
  }
  // return await stripe.customers.create();
  // const customers = await stripe.customers.create()
  // console.log('customers :>> ', customers);
};
