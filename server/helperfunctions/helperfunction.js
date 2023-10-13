
module.exports = function getTodayTimeUnix() {
  const now = new Date();
  const dayOfWeek = now.getDay(); // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const utcOffset = now.getTimezoneOffset(); // Get UTC offset in minutes
  const pdtOffset = 7 * 60; // PDT (Pacific Daylight Time) UTC offset is -7 hours
  const currentHour = now.getUTCHours(); // Get current hour in UTC time

  let startOfDayPDT, endOfDayPDT;

  // Check if it's before 6:30 AM PDT (1:30 PM UTC), if so, use the previous day's data
  if (
    (currentHour < 13 + pdtOffset / 60 ||
      (currentHour === 13 + pdtOffset / 60 &&
        now.getUTCMinutes() <= 30 + pdtOffset % 60))
  ) {
    now.setDate(now.getDate() - 1); // Use the previous day's data
  }

  // If it's a Saturday (dayOfWeek === 6) or Sunday (dayOfWeek === 0), use Friday's time frame
  if (dayOfWeek === 6 || dayOfWeek === 0) {
    startOfDayPDT = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - (dayOfWeek === 0 ? 2 : 1), // Go back to Friday for Sunday
      6 + pdtOffset / 60,
      30 + pdtOffset % 60,
      0
    );
    endOfDayPDT = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - (dayOfWeek === 0 ? 2 : 1), // Go back to Friday for Sunday
      13 + pdtOffset / 60,
      0 + pdtOffset % 60,
      0
    );
  } else {
    // It's not Saturday or Sunday, use the regular time frame
    startOfDayPDT = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      6 + pdtOffset / 60,
      30 + pdtOffset % 60,
      0
    );
    endOfDayPDT = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      13 + pdtOffset / 60,
      0 + pdtOffset % 60,
      0
    );
  }

  const startOfDayUTC = new Date(
    startOfDayPDT.getTime() - utcOffset * 60000
  ).getTime();
  const endOfDayUTC = new Date(
    endOfDayPDT.getTime() - utcOffset * 60000
  ).getTime();
  return { start: startOfDayUTC, end: endOfDayUTC };
};
