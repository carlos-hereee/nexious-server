import type { IPage, PageDataProps, RefsProps } from "@app/page";

export const formatFormData = (data: IPage) => {
  const canSkip = ["hero", "sectionHero"];
  let pageData: PageDataProps = {
    title: "",
    body: "",
    hasCta: false,
    hasSections: false,
    subtitle: "",
    hasMedias: false,
    hero: "",
    cta: [],
    sections: [],
  };
  let refs: RefsProps = {};
  Object.keys(data).forEach((key) => {
    if (!canSkip.includes(key)) {
      // key variables
      const current = key.split("-");
      const name = current[0];
      const group = current[1] || "";
      const uid = current[2] || "";
      const value = data[key];
      if (name) {
        if (uid) {
          // check if data is part of sub doc
          if (refs[group]?.length > 0) {
            // check existing grouping
            const sharedKeyIdx = refs[group]?.findIndex((p) => p.uid === uid);
            if (sharedKeyIdx >= 0) {
              // add to grouping
              refs[group][sharedKeyIdx] = { ...refs[group][sharedKeyIdx], [name]: value };
            } else refs[group].push({ [name]: value, uid });
            // create grouping
          } else refs[group] = [{ [name]: value, uid }];
          // add data
        } else pageData[name] = value === "true" ? true : value === "false" ? false : value;
      }
    }
  });
  return { pageData, refs };
};
