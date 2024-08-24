// Function to convert single digit input to two digits
const toTheTenth = (num: number) => (num > 9 ? num : `0${num}`);
// Function to convert  24 Hour to 12 Hour clock
const formatHour = (num: number) => (num > 12 ? num - 12 : num);
// Data about date
const time = {
  day: toTheTenth(new Date().getDate()),
  month: toTheTenth(new Date().getMonth() + 1),
  yyyy: new Date().getFullYear(),
  hour24: toTheTenth(new Date().getHours()),
  hour12: toTheTenth(formatHour(new Date().getHours())),
  minutes: toTheTenth(new Date().getMinutes()),
  seconds: toTheTenth(new Date().getSeconds()),
};

export const today24hr = () => {
  return `${time.month}/${time.day}/${time.yyyy} ${time.hour24}:${time.minutes}:${time.seconds}`;
};

export const today12hr = () => {
  return `${time.month}/${time.day}/${time.yyyy} ${time.hour12}:${time.minutes}:${time.seconds}`;
};
