import moment from 'moment-timezone'
import 'moment/locale/id'

export const defaultLocale = 'id'
export const defaultTimezone = 'Asia/Bangkok'
export const defaultDateFormat = 'YYYY-MM-DD HH:mm:ss'
export const readableDateFormat = 'DD MMMM YYYY HH:mm:ss'
export const regexDateFormat = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/

export const getUserTimezone = (): string => {
  return moment.tz.guess()
}

export const formatDateWithTimezone = (
  date: Date, formatResult: string = defaultDateFormat, timezone: string = defaultTimezone,
): string => {
  return moment(date).tz(timezone).locale(defaultLocale).format(formatResult)
}

export const convertDateStringToUTC = (
  dateString: string, originalFormat: string = defaultDateFormat, timezone: string = defaultTimezone,
): string => {
  const localDate = moment.tz(dateString, originalFormat, timezone)
  return localDate.utc().toISOString()
}
