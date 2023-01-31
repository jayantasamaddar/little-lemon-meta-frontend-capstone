/**
 * Compares Two Dates against each other with any offset and
 * returns whether the first date is still lesser than the second with offset factored in.
 * @param {Date} startDate
 * @param {Date} endDate
 * @param {Number} offsetDays
 * @returns `boolean`
 *
 * Examples:
 * ---------
 * `compareDates('2023/01/30', '2023/01/31', 1);` ==> `false`
 * `compareDates('2023/01/28', '2023/01/31', 2);` ==> `true`
 * `console.log(compareDates(Date.now(), '2023/02/12', 1));` ==> true
 */
export const compareDates = (startDate, endDate, offsetDays = 0) => {
  const d1 = new Date(startDate);
  const d2 = new Date(endDate);

  if (!parseInt(offsetDays)) return d1 < d2;
  else {
    d1.setDate(d1.getDate() + Math.round(Math.max(offsetDays, 0)));
    return d1 < d2;
  }
};

/**
 * Gets the current date and time formatted for the HTML Input date and time fields.
 * Takes in an offsetDays to return a date in the future or past.
 * @param {number} offset
 * @returns
 */
export const currentDateTime = (offsetDays = 0) => {
  const dateTime = new Date();
  dateTime.setDate(dateTime.getDate() + Math.round(offsetDays));
  const date = dateTime.toLocaleDateString();
  const time = dateTime.toLocaleTimeString();

  return {
    date: date.split('/').reverse().join('-'),
    time: time.slice(0, time.lastIndexOf(':')),
  };
};

/**
 * Given time in the format: `21:00` or `12:58:37`, convert the time to milliseconds.
 * @param {string} time
 * @returns
 */
export const convertToMilliseconds = time => {
  const tArr = time.split(':');
  return tArr.reduce((acc, num, index) => {
    if (index > 1) return acc + num;
    return acc + num * Math.pow(60, tArr.length - index);
  }, 0);
};

/**
 * Takes a `startTime` and an `endTime` and compares them against a time to check if it
 * is a valid time of if doesn't fall within the time period.
 * @param {string} startTime
 * @param {string} endTime
 * @param {string} value
 * @returns `boolean`
 */
export const withinReservationHours = (startTime, endTime, value) => {
  const t1 = convertToMilliseconds(startTime);
  const t2 = convertToMilliseconds(endTime);
  const v = convertToMilliseconds(value);

  return v >= t1 && v <= t2;
};

// console.log(withinReservationHours('11:00', '21:00', '11:00')); // true
// console.log(withinReservationHours('11:00', '21:00', '21:00')); // true
// console.log(withinReservationHours('11:00', '21:00', '20:59')); // true
// console.log(withinReservationHours('11:00', '21:00', '21:01')); // false
// console.log(withinReservationHours('11:00', '21:00', '10:59')); // false

/**
 * Takes in the minutes in `hh:mm` format and returns the rounded time
 * @param {string} minutes
 * @param {number} factor
 * @returns `string`
 *
 * Example: with `factor: 15`
 * ---------------------------
 * Input: `23:37` => Output: `23:30`
 * Input: `23:38` => Output: `23:45`
 * Input: `23:52` => Output: `23:45`
 * Input: `23:53` => Output: `24:00`
 */
export const roundTime = (minutes, factor) => {
  const slots = 60 / factor;
  const [hh, mm] = minutes.split(':');

  const MM = (Math.round(mm / factor) * factor) % 60;
  if (MM > 0 || mm < 60 / slots / 2) return `${hh}:${(MM + '0').slice(0, 2)}`;
  else {
    return `${Math.min(Number(hh) + 1, 24)}:${MM}0`;
  }
};

// console.log(roundTime('12:04', 15)); // 12:00
// console.log(roundTime('23:37', 15)); // 23:30
// console.log(roundTime('23:38', 15)); // 23:45
// console.log(roundTime('23:52', 15)); // 23:45
// console.log(roundTime('23:53', 15)); // 24:00

export const normalizeAvailability = availableTimes =>
  availableTimes?.map((t, i) => ({
    id: i + 1,
    label: t,
    value: t,
  }));
