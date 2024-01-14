// import { removePage } from "@dbModels/page/removePage";
// import { useGenericErrors } from "@authUtils/useGenericErrors";
// import type { PageRequestware } from "@app/express";

// export const deletePage: PageRequestware = async (req, res, next) => {
//   try {
//     const { appId, pageId } = req.params;
//     // find page
//     const pageIdx = req.myApp.pages.findIndex((page) => page.pageId === pageId);
//     // remove page from app pages
//     req.myApp.pages = req.myApp.pages.filter((page) => page.pageId !== pageId);
//     // remove page from menu if found
//     const pageName = req.myApp.pages[pageIdx].name;
//     if (pageName) req.myApp.menu = req.myApp.menu.filter((m) => m.name !== pageName);

//     await req.myApp.save();
//     // finally remove page
//     await removePage({ appId, pageId });
//     next();
//   } catch (error) {
//     useGenericErrors(res, error, "unable to delete page");
//   }
// };
