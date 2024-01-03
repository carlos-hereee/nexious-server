import { useGenericErrors } from "../../utils/auth/useGenericErrors";

export const editStore = (req, res, next) => {
  try {
    const { name, title, body } = req.body;
    const hero = req.asset || "";

    req.store.name = name;
    req.store.title = title;
    req.store.body = body;
    req.store.hero = hero;

    await req.store.save();

    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to edit store");
  }
};
