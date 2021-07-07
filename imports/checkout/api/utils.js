import { CURRENCY } from '/imports/checkout/api/constants';

// Formats a number as currency.
export const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: CURRENCY
});
