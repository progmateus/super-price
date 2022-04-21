import dayjs from "dayjs"
import { IDateProvider } from "../IDateProvider";


class DateProvider implements IDateProvider {

    addDays(days: number): Date {
        return dayjs().add(days, "days").toDate();
    }

    addHours(hours: number): Date {
        return dayjs().add(hours, "hour").toDate();
    }

    compareIfBefore(start_date: Date, end_date: Date): boolean {
        return dayjs(start_date).isBefore(end_date);
    }

    dateNow(): Date {
        return dayjs().toDate();
    }
}
export { DateProvider };