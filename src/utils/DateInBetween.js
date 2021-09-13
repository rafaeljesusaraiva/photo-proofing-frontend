import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

export const DateInBetween = (oldDate, currentDate, futureDate) => {
    const dateFormat = "DD/MM/YYYY";
    const t_oldDate = dayjs(oldDate, dateFormat);
    const t_futureDate = dayjs(futureDate, dateFormat);
    return dayjs(currentDate, dateFormat).isBetween(t_oldDate, t_futureDate, null, []);
}