let date = $state(new Date());

export function createDate() {
    return {
        get date() { return date },
        update: (newDate: Date) => date = newDate,
    };
}