export default function getDates(
  startDate: Date,
  lesson: number,
  desiredDaysOfWeek: string[],
): Date[] {
  const daysOfWeek: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dates: Date[] = [];
  const start: Date = new Date(startDate);
  let count = 1;
  while (true) {
    if (count > lesson) {
      break;
    }
    const currentDayOfWeek: string = daysOfWeek[start.getDay()];
    if (desiredDaysOfWeek.includes(currentDayOfWeek)) {
      dates.push(new Date(start));
      count++;
    }
    start.setDate(start.getDate() + 1);
  }

  return dates;
}
