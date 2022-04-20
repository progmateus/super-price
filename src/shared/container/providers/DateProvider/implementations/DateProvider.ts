import dayjs from "dayjs"
import { IDateProvider } from "../IDateProvider";


class DateProvider implements IDateProvider {
    addDays(days: number): Date {
        return dayjs().add(days, "days").toDate();
    }
}
export { DateProvider };