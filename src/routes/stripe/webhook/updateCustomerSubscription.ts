import S from "stripe";

// define and call a method to handle the subscription created.
export const addCustomerSubscription = async (event: S.CustomerSubscriptionCreatedEvent) => {
  const subscription = event.data.object;
  const status = subscription.status;
  console.log("accountId :>> ", event.account ? event.account : "no-account");
  // console.log("subscription :>> ", subscription);
  console.log(`addCustomerSubscription status is ${status}.`);
  // handleSubscriptionCreated(subscription);
};
//  define and call a method to handle the subscription update.
export const removeCustomerSubscription = async (event: S.CustomerSubscriptionDeletedEvent) => {
  const subscription = event.data.object;
  const status = subscription.status;
  console.log(`removeCustomerSubscription  status is ${status}.`);
  // // handleSubscriptionUpdated(subscription);
  // console.log("event :>> ", event);
};
//  define and call a method to handle the subscription update.
export const customerSubscriptionWillEndSoon = async (event: S.CustomerSubscriptionTrialWillEndEvent) => {
  const subscription = event.data.object;
  const status = subscription.status;
  console.log(`customerSubscriptionWillEndSoon status is ${status}.`);
  // // handleSubscriptionUpdated(subscription);
  // console.log("event :>> ", event);
};
//  define and call a method to handle the subscription update.
export const updateCustomerSubscription = async (event: S.CustomerSubscriptionUpdatedEvent) => {
  const subscription = event.data.object;
  const status = subscription.status;
  console.log(`updateCustomerSubscription status is ${status}.`);
  // // handleSubscriptionUpdated(subscription);
  // console.log("subscription :>> ", subscription);
};
