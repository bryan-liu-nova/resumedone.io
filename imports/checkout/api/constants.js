export const CARD_LOGOS = {
  visa: '/img/visa.png',
  mastercard: '/img/mastercard.png'
};

export const CURRENCY = 'USD';
export const CHARGE_AMOUNT = 1950;

export const ONE_2WEEK = 'ONE_2WEEK';
export const ONE_MONTH = 'ONE_MONTH';
export const TWO_2WEEK = 'TWO_2WEEK';
export const TWO_MONTH = 'TWO_MONTH';
export const THREE_LIMIT = 'THREE_LIMIT';
export const THREE_FULL = 'THREE_FULL';
export const THREE_MONTH = 'THREE_MONTH';

export const PLAN_AMOUNT = {
  [ONE_2WEEK]: 190, // $1.90
  [ONE_MONTH]: 545, // $5.45
  [TWO_2WEEK]: 295, // $2.95
  [TWO_MONTH]: 595, // $5.95
  [THREE_LIMIT]: 145, // $1.45
  [THREE_FULL]: 195, // $1.95
  [THREE_MONTH]: 1045 // $10.45
};

// NOTE: this is terrible for i18n
// therefore it needs refactor when moving out meteor
export const PLAN_SUB_INFO = {
  [ONE_2WEEK]: {
    AMOUNT: 1799, // $17.99
    PERIOD: '4 weeks',
    TRIAL: 14 // days
  },
  [ONE_MONTH]: {
    AMOUNT: 6540, // $65.40
    PERIOD: 'month',
    TRIAL: 30 // days
  },
  [TWO_2WEEK]: {
    AMOUNT: 2999, // $29.99
    PERIOD: '4 weeks',
    TRIAL: 14 // days
  },
  [TWO_MONTH]: {
    AMOUNT: 7140, // 71.40
    PERIOD: 'month',
    TRIAL: 30 // days
  },
  [THREE_LIMIT]: {
    AMOUNT: 2999, // $29.99
    PERIOD: '4 weeks',
    TRIAL: 14 // days
  },
  [THREE_FULL]: {
    AMOUNT: 2999, // $29.99
    PERIOD: '4 weeks',
    TRIAL: 14 // days
  },
  [THREE_MONTH]: {
    AMOUNT: 12540, // 125.40
    PERIOD: 'month',
    TRIAL: 30 // days
  }
};

export const PLAN_NAME = {
  [ONE_2WEEK]: '14 DAYS FULL ACCESS',
  [ONE_MONTH]: 'MONTHLY ACCESS',
  [TWO_2WEEK]: '14-Day Full Access',
  [TWO_MONTH]: 'Monthly Access',
  [THREE_LIMIT]: '14-DAYS LIMITED ACCESS',
  [THREE_FULL]: '14-DAYS FULL ACCESS',
  [THREE_MONTH]: 'MONTHLY ACCESS'
};
