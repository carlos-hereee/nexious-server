module.exports = (formData, desiredData) => {
  const pageData = {};
  // keep track of hero data
  const refs = [];
  // DRY make formdata into array
  const form = Object.keys(formData);
  // filter with desiredData
  if (!desiredData) {
    desiredData = [
      { filter: "hasCta", ifTrue: "cta" },
      { filter: "hasSections", ifTrue: "sections" },
    ];
  }
  for (let i = 0; i < form.length; i++) {
    const key = form[i];
    // check if key it contains desired data
    const desiredIdx = desiredData.findIndex((data) => data.filter === key);
    if (desiredIdx >= 0) {
      refs.push(formData[desiredData[desiredIdx].ifTrue]);
      pageData[key] = formData[key];
    } else {
      // check if key is refs
      if (!refs.some((ref) => ref.groupName === key)) pageData[key] = formData[key];
    }
  }
  return { pageData, refs };
};
