const dayjs = require('dayjs');

const deliveryOptions=[
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



function getDeliveryOptionOb(cartDeliveryOptionId){
    let matchingDeliveryOption;

        deliveryOptions.forEach((option)=>{
            if(option.id === cartDeliveryOptionId)
                matchingDeliveryOption = option;
            });

    return matchingDeliveryOption;

}

function calculateDeliveryDate(option){
    const today = dayjs();
    const deliveryDate = today.add(option.deliveryDays, 'days');
    const FSS = [7,6,5];
    const index = FSS.findIndex(el => el === deliveryDate.day());
    

    if(index !== -1){
        return deliveryDate.add(index+1, 'days')
    }


    return deliveryDate.toISOString();

}

module.exports = {calculateDeliveryDate, getDeliveryOptionOb};