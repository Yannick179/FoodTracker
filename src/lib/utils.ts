import {goto} from "$app/navigation";

export function formatDateToUrl(date: Date | string): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export function parseDateFromUrl(param: string | null): string {
    if (!param || isNaN(new Date(param).getTime())) {
        //if time is missing, d
        // ate=today
        let today = new Date();
        changeDate(today);
        return formatDateToUrl(today); //today
    }
    return param;
}

export function changeDate(newDate: Date) {
    goto(`?date=${formatDateToUrl(newDate)}`);
}

