import dayjs from 'dayjs'

export function getNextDay(time: number) {
    const nextMap: { [key: number]: string } = {
        1: dayjs().add(1, 'day').format('YYYY-MM-DD'),
        2: dayjs().add(2, 'day').format('YYYY-MM-DD'),
        3: dayjs().add(3, 'day').format('YYYY-MM-DD'),
        4: dayjs().add(5, 'day').format('YYYY-MM-DD'),
        5: dayjs().add(7, 'day').format('YYYY-MM-DD'),
        6: dayjs().add(10, 'day').format('YYYY-MM-DD'),
        7: dayjs().add(15, 'day').format('YYYY-MM-DD'),
    }
    if (time > 8) {
        return dayjs().add(15, 'day').format('YYYY-MM-DD')
    }
    return nextMap[time]
}