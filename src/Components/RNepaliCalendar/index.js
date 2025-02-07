import * as data from "./data";

//All input for months will be as 1 for January and 12 for December.
//All input/output fo days will be as 0 for sunday and 6 for saturday
//Access Variants as property in every returns {[variant-type]:data} example: returns {full:[],shorr:[],min:[]}
export default class RNepaliCalendar {
  constructor(lang = "np") {
    this.lang = lang;
    this.cache = {
      // stores the number of days to the end of corresponding year from the base date i.e. date.base_bs
      //TODO memoize
      getCumulativeTotal: () => {
        const years = Object.keys(data.calendar_data);
        const startingYear = +years[0];
        const totalYears = years.length;
        let obj = {};
        for (let i = 0; i < totalYears; i++) {
          obj[startingYear + i] =
            (i === 0 ? 0 : obj[startingYear + i - 1]) +
            data.calendar_data[startingYear + i].slice(-1)[0];
        }
        return obj;
      },
    };
  }

  checkError = (props) => {
    const { noOfMonths, dayOfWeek, lang, year, variant } = props;
    const supportedYears = Object.keys(data.calendar_data);
    const supportedVariant = data.variant;
    const supportedLanguage = data.lang;
    //Type Check
    // if (
    //   (noOfMonths && typeof noOfMonths !== "number") ||
    //   (dayOfWeek && typeof dayOfWeek !== "number")
    // ) {
    //   throw new TypeError("Expected type number as parameter");
    // }

    //Range Check
    if (noOfMonths && (noOfMonths > 12 || noOfMonths < 1)) {
      throw new RangeError(
        "Expected the number of months within the interval of 1-12"
      );
    }
    if ((dayOfWeek && dayOfWeek < 0) || dayOfWeek > 6) {
      throw new RangeError(
        "Expected the number of weeks within the interval of 0-6"
      );
    }

    //support check
    if (lang && !supportedLanguage.includes(lang)) {
      throw new Error(
        `Expected the language as one of the following: ${supportedLanguage.toString()}`
      );
    }

    if (year && !supportedYears.includes(year.toString())) {
      throw new Error(
        `Sorry the program supports the year range between ${
          supportedYears[0]
        } to ${supportedYears[supportedYears.length - 1]}`
      );
    }

    if (variant && !supportedVariant.includes(variant)) {
      throw new Error(
        `Expected one of the following variant: ${supportedVariant.toString()}`
      );
    }
    return false;
  };

  /**
   *Returns all the supported years
   * @param {Object} opts -  {lang="np"|"rm"|"en",variant="long"|"short"|"min"}
   */
  getAllYears = (opts = { lang: this.lang }) => {
    const { lang } = opts;
    this.checkError({ lang });

    const inEngNumeral = Object.keys(data.calendar_data);
    const inNepNumeral = inEngNumeral.map((years) =>
      this.toNepaliNumber(years)
    );

    if (lang === "np") {
      return inNepNumeral;
    } else return inEngNumeral;
  };
  /**
   * Return all the name of Months as per the supplied paramaters;
   * @param {object} opts - {lang="np"|"rm"|"en",variant="long"|"short"|"min"}
   */
  getAllMonthsName = (opts = { lang: this.lang }) => {
    const { variant, lang } = opts;
    this.checkError({ lang });

    const months = { full: [], short: [], min: [] };

    for (let i = 1; i <= 12; i++) {
      months.full.push(this.getMonthName(i, { lang }).full);
      months.short.push(this.getMonthName(i, { lang }).short);
      months.min.push(this.getMonthName(i, { lang }).min);
    }
    if (variant === undefined) {
      return months;
    } else return months[variant];
  };

  getAllDaysName = (opts = { lang: this.lang }) => {
    const { variant, lang } = opts;
    this.checkError({ lang, variant });
    const weeks = { full: [], short: [], min: [] };

    for (let i = 0; i < 7; i++) {
      weeks.full.push(this.getDayName(i, { lang }).full);
      weeks.short.push(this.getDayName(i, { lang }).short);
      weeks.min.push(this.getDayName(i, { lang }).min);
    }
    if (variant === undefined) {
      return weeks;
    } else return weeks[variant];
  };
  //Type coercion overrides
  toString = () => {
    return getCurrentBS();
  };

  /**
   *Returns the name of month
   * @param {number} month - index for the month 1=Baisakh
   * @param {object} opts  - {lang="np"|"rm"|"en",variant="long"|"short"|"min"}
   * @returns {object} -object {full:"MonthsName", short:"ShortMonthsName",min:"Min"} all based on paramaters
   */
  getMonthName = (month, opts = { lang: this.lang }) => {
    const { lang, variant } = opts;
    let noOfMonths = month ? month - 1 : null;

    this.checkError({ noOfMonths, lang });
    if (noOfMonths === null) {
      noOfMonths = this.getCurrentBS().month;
    }
    if (variant) {
      return data[lang].monthName[variant][noOfMonths];
    }
    return {
      full: data[lang].monthName.full[noOfMonths],
      short: data[lang].monthName.short[noOfMonths],
      min: data[lang].monthName.min[noOfMonths],
    };
  };

  /**
   * Returns the equivalent Nepali Numeral
   * eg: i/p=>123 o/p =>१२३
   * @param {number} num - English numeral 0,1,2,3...
   */
  toNepaliNumber = (num) => {
    var arrNumNe = num
      .toString()
      .split("")
      .map(function (ch) {
        if (ch === "." || ch === ",") {
          return ch;
        }
        return data.nums[Number(ch)];
      });
    return arrNumNe.join("");
  };

  /**
   *Returns the equivale English Numeral
   *eg: i/p =>१२३ o/p=>123
   * @param {string} strNum -Nepali numeral ०,१,२,३...
   */
  toEnglishNumber = (strNum) => {
    let _nums = Object.assign(
      {},
      ...Object.entries(data.nums).map(([a, b]) => ({ [b]: a }))
    );
    var arrNumNe = strNum
      .toString()
      .split("")
      .map(function (ch) {
        if (ch === "." || ch === ",") {
          return ch;
        }
        return _nums[ch];
      });
    return arrNumNe.join("");
  };

  /**
   * Returns the name of day corresponding to supplied index (0-6)
   * @param {num} dayOfWeek (optional) -Index to get corresponding name of the day
   * @param {object} opts  - opts={variant:"min/short/full",lang:"en"|"np"|"rm"}
   * @returns {object} {full:"DayName",short:"Day", min:"D"} unless variant is provided in opts
   */
  getDayName = (dayOfWeek, opts = { lang: this.lang }) => {
    if (Object.prototype.toString.call(dayOfWeek) === "[object Object]") {
      opts = dayOfWeek;
      dayOfWeek = undefined;
    }

    this.checkError({ dayOfWeek });
    if (dayOfWeek === undefined) {
      dayOfWeek = new Date().getDay();
    }
    const { lang, variant } = opts;

    if (!variant) {
      var nepday = {
        lang,
        full: data[lang].dayName.full[dayOfWeek],
        short: data[lang].dayName.short[dayOfWeek],
        min: data[lang].dayName.min[dayOfWeek],
      };
      return nepday;
    } else return data[lang][variant][dayOfWeek];
  };

  /**
   * Returns the Index of week  0 for sunday and so on..
   * @param {number} daysCount - No. of days from the base bs
   */
  getDayIndex = (daysCount) => ((daysCount % 7) + data.base_bs.dayOfWeek) % 7;

  //TODO AD
  /**
   * Returns the total number of days in supplied year
   * @param {number} year  - Year in BS
   */
  getDaysInYear = (year) => {
    if (typeof data.calendar_data[year] === "undefined") {
      return data.daysInYear;
    }
    //   error({year})
    return data.calendar_data[year][12];
  };

  getDaysInMonth = (year, month) => {
    this.checkError({ year, noOfMonths: month });
    if (typeof data.calendar_data[year] === "undefined") {
      const current = this.getCurrentBS();
      return data.calendar_data[current.year][current.month - 1];
    }
    return data.calendar_data[year][month - 1];
  };

  isLeapYear = (year) => data.daysInYear !== this.getDaysInYear(year);
  /**
   * To get the first day (sunday, monday...) of the month
   * @param {number} year  - Year in Bs format = YYYY/MM/DD
   * @param {number} month  - Month in format 1 for Baisakh
   * @returns {number} - Index of week, sunday =0
   */
  getInitialNepaliDay = (year, month) => {
    this.checkError({ noOfMonths: month, year });
    const cumulativeData = this.cache.getCumulativeTotal();
    const prevYearTotal = cumulativeData[year - 1] || 0;
    let days = 0;
    for (let i = 0; i < month - 1; i++) {
      days += data.calendar_data[year][i];
    }
    const daysCount = prevYearTotal + days;
    return this.getDayIndex(daysCount);
  };

  getCurrentBS = (format, opts = { lang: this.lang }) => {
    const now = new Date();
    return this.ad2bs(
      `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(
        2,
        0
      )}/${String(now.getDate()).padStart(2, 0)}`
    );
  };

  /**
   * Returns the AD  in English Language from supplied ad date
   * eg: i/p=>2054/01/25 o/p=> {year: 1997, month: 5, date: 7, day: 3}
   * @param {date} date - BS Date in format YYYY/MM/DD ; MM = 1 for Baisakh
   * @returns {Object} {year:YYYY,month:MM,date:DD,day:0} MM =1 for Baisakh, day=0 for sunday
   */
  bs2ad = (date, format) => {
    const { base_ad, calendar_data } = data;

    const splitted = date.split("/");

    const year = splitted[0];
    const month = splitted[1];
    const day = splitted[2];
    const cumulativeData = this.cache.getCumulativeTotal();

    let prevMonthCumulativeTotal = 0;
    const prevYearCumulativeTotal = cumulativeData[+year - 1];
    for (let i = 0; i < +month - 1; i++) {
      prevMonthCumulativeTotal += calendar_data[+year][i];
    }

    const countDays =
      prevYearCumulativeTotal + prevMonthCumulativeTotal + +day - 1;

    let date1 = new Date(base_ad.year, base_ad.month, base_ad.day);
    date1.setDate(date1.getDate() + countDays);

    const ad = {
      year: date1.getFullYear(),
      month: String(date1.getMonth() + 1).padStart(2, 0),
      date: String(date1.getDate()).padStart(2, 0),
      day: date1.getDay(),
    };
    return ad;
  };

  /**
   * Returns the number of days from the base_bs day
   * @param {Date} date - AD date in the format YYYY/MM//DD
   */
  countBSDays = (date) => {
    if (date === undefined) return;
    const { base_ad } = data;
    let dateArr = date.split("/").map(function (str) {
      return Number(str);
    });
    let dateObj = { year: dateArr[0], month: dateArr[1] - 1, day: dateArr[2] };

    let date1 = new Date(base_ad.year, base_ad.month, base_ad.day);
    let date2 = new Date(dateObj.year, dateObj.month, dateObj.day);

    let timeDiff = date2.getTime() - date1.getTime();

    let dayCount = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return dayCount;
  };

  //TODO format
  /**
   * Returns the bs  in English Language from supplied ad date
   * eg: i/p=>2020/7/15 o/p=> {year: 2077, month: 3, date: 31, day: 3}
   * @param {date} date - AD Date in format YYYY/MM/DD ; MM = 1 for Baisakh
   * @returns {Object} {year:YYYY,month:MM,date:DD,day:0} MM =1 for Baisakh, day=0 for sunday
   */
  ad2bs = (date, format) => {
    const { base_bs, calendar_data } = data;
    const dayCount = this.countBSDays(date);

    const cumulativeData = this.cache.getCumulativeTotal();

    const values = Object.values(cumulativeData);
    const yearIndex = values?.findIndex((value) => value >= dayCount);
    //
    //   "yer",
    //   values?.findIndex((value) => value >= 18628)
    // );
    let year = +base_bs.year + yearIndex;
    let offsetDays =
      yearIndex === 0 ? dayCount : dayCount - cumulativeData[year - 1];

    let month = 0;

    while (1) {
      if (calendar_data[year][month] <= offsetDays) {
        //check
        offsetDays -= calendar_data[year][month];
        month++;
      } else break;
    }
    if (+month === 12) {
      month = 0;
      year = year + 1;
    }

    return {
      year,
      month: String(month + 1).padStart(2, 0), //1 for Baisakh
      date: String(offsetDays + 1).padStart(2, 0),
      day: this.getDayIndex(dayCount),
    };
  };
}

export const {
  getMonthName,
  toNepaliNumber,
  getAllYears,
  getAllMonthsName,
  getAllDaysName,
  getDayName,
  getDayIndex,
  getDaysInYear,
  getDaysInMonth,
  isLeapYear,
  ad2bs,
  bs2ad,
  getCurrentBS,
  toEnglishNumber,
  getInitialNepaliDay,
} = new RNepaliCalendar();
