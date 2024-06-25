import type { ICta, IPage, ISection, RefsProps } from "types/page";

export const formatFormData = (data: IPage) => {
  const canSkip = ["hero", "sectionHero"];

  const refs: RefsProps = { hasSections: [], hasCta: [], hasMedias: [] };
  Object.keys(data).forEach((key) => {
    if (!canSkip.includes(key)) {
      // key variables
      const current = key.split("-");
      const name = current[0] || "";
      const group = current[1] || "";
      const uid = current[2] || "";
      if (name && uid && group) {
        // check if data is part of sub doc
        if (group === "hasCta") {
          // check existing grouping
          const sharedKeyIdx = refs[group].findIndex((p) => p.uid === uid);
          const valueKey = name as keyof ICta;
          const value = data[key] as unknown as string;
          // add data to grouping
          if (sharedKeyIdx >= 0) {
            refs[group][sharedKeyIdx as unknown as keyof ICta] = { ...refs[group][sharedKeyIdx], [valueKey]: value };
          }
          // otherwise create grouping
          else refs[group].push({ label: "", link: "", icon: "", uid, [valueKey]: value });
        }
        if (group === "hasSections") {
          // check existing grouping
          const sharedKeyIdx = refs[group].findIndex((p) => p.uid === uid);
          const valueKey = name as keyof ISection;
          const value = data[key] as unknown as string;
          // add data to grouping
          if (sharedKeyIdx >= 0) {
            const idx = sharedKeyIdx as unknown as keyof ISection;
            refs[group][idx] = { ...refs[group][sharedKeyIdx], [valueKey]: value };
          }
          // otherwise create grouping
          else refs[group].push({ uid, title: "", body: "", sectionHero: "", [valueKey]: value });
        }
      }
    }
  });
  return refs;
};
