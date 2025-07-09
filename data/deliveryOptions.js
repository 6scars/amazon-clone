import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import isWeekend from '../scripts/utils/dates.js';

export const deliveryOptions=[
    {
        id:'1',
        deliveryDays:7,
        priceCents: 0
    },{
        id:'2',
        deliveryDays:3,
        priceCents: 499
    },{
        id:'3',
        deliveryDays:1,
        priceCents: 999
    },
]
export function getDeliveryOptionOb(cartDeliveryOptionId){
    let matchingDeliveryOption;

        deliveryOptions.forEach((option)=>{
            if(option.id === cartDeliveryOptionId)
                matchingDeliveryOption = option;
            });

    return matchingDeliveryOption;

}

export function calculateDeliveryDate(option) {
  const today = dayjs();
  let deliveryDate = today.add(option.deliveryDays, 'days');

  // Jeśli dostawa wypada w piątek (5), sobotę (6) lub niedzielę (0)
  if ([5, 6, 0].includes(deliveryDate.day())) {
    // Oblicz, ile dni do poniedziałku (1)
    const daysToMonday = (8 - deliveryDate.day()) % 7;
    deliveryDate = deliveryDate.add(daysToMonday, 'days');
  }

  return deliveryDate;
}



