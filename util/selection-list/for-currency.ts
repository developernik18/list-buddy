const selectCurrencyOptions = [{
    value: 'INR',
    label: '₹'
  },{
    value: 'Pound',
    label: '£'
  },{
    value: 'Dollar',
    label: '$'
  }]

const currencyValueToLabel = (currecyValue: string) => {
  for(let i=0; i <= selectCurrencyOptions.length - 1 ; i++) {
    if(currecyValue === selectCurrencyOptions[i].value) {
      return selectCurrencyOptions[i].label;
    }
  }

  // If currecyValue does not match any currencyValue.
  return '₹';
}

export {selectCurrencyOptions, currencyValueToLabel}