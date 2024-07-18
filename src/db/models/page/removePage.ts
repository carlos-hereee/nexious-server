import { PageFilters } from "@app/page";
import Page from "@db/schema/page";

export const removePage = async ({ pageId, appId }: PageFilters) => {
  return await Page.findOneAndDelete({ pageId, appId });
};
