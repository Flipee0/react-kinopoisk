const getFormattedDuration = (duration: number): string => {
    if (duration >= 60) {
        return `${Math.trunc(duration / 60)} часов ${duration % 60} мин`
    }
    return `${duration % 60} мин`
}

export default getFormattedDuration
