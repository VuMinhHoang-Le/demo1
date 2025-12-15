
export function getCurrentDateTime(){
    const date =  new Date();
    const hour = date.getHours();

    return hour;
}