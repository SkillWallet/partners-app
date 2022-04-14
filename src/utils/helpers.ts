import { addMinutes, format, isBefore, setHours, setMilliseconds, setMinutes, setSeconds } from 'date-fns';

export const generateTimeSlots = ({
  date = new Date(),
  start,
  end,
  interval,
}: {
  date?: Date;
  start: number;
  end: number;
  interval: number;
}): Date[] => {
  const setTime = (x: Date, h = 0, m = 0, s = 0, ms = 0): Date => setHours(setMinutes(setSeconds(setMilliseconds(x, ms), s), m), h);

  const from = setTime(date, start);
  const to = setTime(date, end);
  const step = (x: Date): Date => addMinutes(x, interval);

  const blocks: Date[] = [];

  let cursor = from;

  while (isBefore(cursor, to)) {
    blocks.push(cursor);
    cursor = step(cursor);
  }
  // return blocks.map((d) => format(d, 'hh:mm a'));
  return blocks;
};
