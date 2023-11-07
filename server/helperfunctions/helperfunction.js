function convertGMTtoPDT(gmtTimestamp) {
  // Convert the GMT timestamp to PDT by adding 7 hours (7 * 60 * 60 seconds)
  const pdtTimestamp = gmtTimestamp + 7 * 60 * 60;
  return pdtTimestamp;
}
module.exports = function getTodayTimeUnix() {
  const now = new Date();
  const dayOfWeek = now.getDay(); // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const pdtOffset = -7 * 60; // PDT (Pacific Daylight Time) UTC offset is -7 hours
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  let startOfDayPDT, endOfDayPDT;

  // Check if it's before 6:30 AM PDT (1:30 PM UTC), if so, use the previous day's data
  if (
    currentHour < 13 + pdtOffset / 60 ||
    (currentHour === 13 + pdtOffset / 60 &&
      currentMinute < 30 + (pdtOffset % 60))
  ) {
    now.setDate(now.getDate() - 1); // Use the previous day's data
  }

  // If it's a Saturday (dayOfWeek === 6) or Sunday (dayOfWeek === 0), use Friday's time frame
  if (dayOfWeek === 6 || dayOfWeek === 0) {
    now.setDate(now.getDate() - (dayOfWeek === 0 ? 2 : 1)); // Go back to Friday for Sunday
  }

  // Set the time to 6:30 AM PDT
  now.setHours(13 + pdtOffset / 60);
  now.setMinutes(30 + (pdtOffset % 60));
  now.setSeconds(0);
  now.setMilliseconds(0);

  startOfDayPDT = Math.floor(now / 1000); // Convert to Unix timestamp in seconds

  // Add 6 hours and 30 minutes to get 1:00 PM PDT
  endOfDayPDT = startOfDayPDT + 6 * 60 * 60 + 30 * 60;
  startOfDayPDT = convertGMTtoPDT(startOfDayPDT);
  endOfDayPDT = convertGMTtoPDT(endOfDayPDT);
  return { start: startOfDayPDT, end: endOfDayPDT };
};
