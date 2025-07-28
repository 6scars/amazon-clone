import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
export default function isWeekend(){
    const date = dayjs();
    const deliveryTime = date.add(3,'day');


    if(['Saturaday', 'Sunday'].includes(deliveryTime.format('dddd'))){
        console.log(`its weekend: ${deliveryTime.format('dddd')}`)
    };
}