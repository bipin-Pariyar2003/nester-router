import { ad2bs, bs2ad } from "../Components/RNepaliCalendar";

const ad2bsHandler = (adDate) => {
  const { year, month, date } = ad2bs(adDate);

  return `${String(year).padStart(4, 0)}/${String(month).padStart(
    2,
    0
  )}/${String(date).padStart(2, 0)}`;
};

const bs2adHandler = (bsDate) => {
  console.log(bsDate);
  const { year, month, date } = bs2ad(bsDate);
  console.log(bs2ad(bsDate));

  return `${year}/${String(month).padStart(2, 0)}/${String(date).padStart(
    2,
    0
  )}`;
};

export { ad2bsHandler, bs2adHandler };
