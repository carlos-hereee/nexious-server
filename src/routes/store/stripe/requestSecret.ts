// import { useGenericErrors }  from "@utils/auth/useGenericErrors";
// // import { paymentInitent }  from "@routes/webhook/payments/paymentInitent";

// export const requestSecret = async (req, res) => {
//   try {
//     const { cart } = req.body;
//     // TODO: readd format total
//     // const total = formatTotal(cart);
//     // const intent = await paymentInitent({ amount: total });

//     // console.log("intent :>> ", intent);
//     // res.status(200).json(intent.client_secret).end();
//     // console.log("user :>> ", user);
//     // // console.log("payment :>> ", payment);
//     // console.log("cart :>> ", cart);
//   } catch (error) {
//     useGenericErrors(res, error, "unable to complete checkout");
//   }
// };
