import type { MiddlewareProps } from "@app/express";
import { useGenericErrors } from "@authUtils/useGenericErrors";
import { listCustomers } from "@stripe/customers/listCustomers";

export const getCustomers: MiddlewareProps = async (req, res, next) => {
  try {
    const customers = await listCustomers("");
    console.log("customers :>> ", customers);
  } catch (error) {
    useGenericErrors(res, error, "unable to list customers");
  }
};
