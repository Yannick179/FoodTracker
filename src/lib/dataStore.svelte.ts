import { writable } from 'svelte/store';

let _date = $state(new Date());

export const globalDate = {
    get val() {
        console.log("get: " + _date)
        return _date;
        },
    set val(n) {
        console.log("set: " + _date + " to: " + n);
        _date = n;
    }
};