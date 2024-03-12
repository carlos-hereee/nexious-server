// import { removePage } from "@db/models/page/removePage";
// import { useGenericErrors }  from "@utils/auth/useGenericErrors";
// import type { PageRequestware } from "@app/express";

// export const deletePage: PageRequestware = async (req, res, next) => {
//   try {
//     const { appId, pageId } = req.params;
//     // find page
//     const pageIdx = req.project.pages.findIndex((page) => page.pageId === pageId);
//     // remove page from app pages
//     req.project.pages = req.project.pages.filter((page) => page.pageId !== pageId);
//     // remove page from menu if found
//     const pageName = req.project.pages[pageIdx].name;
//     if (pageName) req.project.menu = req.project.menu.filter((m) => m.name !== pageName);

//     await req.project.save();
//     // finally remove page
//     await removePage({ appId, pageId });
//     next();
//   } catch (error) {
//     useGenericErrors(res, error, "unable to delete page");
//   }
// };
