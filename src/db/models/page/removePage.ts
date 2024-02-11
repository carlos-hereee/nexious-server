import { PageFilters } from "@app/page";
import Page from "@dbSchema/page";

export const removePage = async ({ pageId, appId }: PageFilters) => {
  return await Page.findOneAndDelete({ pageId, appId });
};
