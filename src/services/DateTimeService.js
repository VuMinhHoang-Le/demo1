
export function getCurrentDateTime(){
    const date =  new Date();
    const month = date.getMonth();
    const day = date.getDay();
    const hour = date.getHours();
    const minute = date.getMinutes();

    return {month, day, hour, minute};
}