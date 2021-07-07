import { DateTime } from 'luxon';
import last from 'lodash/last';
import { isDescriptionEmpty } from '/imports/pdf/core/api/helpers';

export const displayDate = (date, format) => {
  if(date == null) return 'Unknown';
  return DateTime.fromISO(date).setLocale('en').toFormat(format || 'LLL yyyy');
};

export const displayTitle = (s1, s2, join) => {
  let res = '';
  if (!s1 && !s2) {
    res = '(Not specified)';
  } else if (s1 && !s2) {
    res = s1;
  } else if (!s1 && s2) {
    res = s2;
  } else {
    res = `${s1}${join}${s2}`;
  }
  return res;
};

export const displayTemplateTitle = (s1, s2, join) => {
  let res = '';
  if (!s1 && !s2) {
    res = '';
  } else if (s1 && !s2) {
    res = s1;
  } else if (!s1 && s2) {
    res = s2;
  } else {
    res = `${s1}${join}${s2}`;
  }
  return res;
};

export const displayDateRange = (startDate, endDate, current) => `${displayDate(startDate)} - ${current ? 'Present' : displayDate(endDate)}`;

/**
 * focus element by selector
 * @param selector String
 * @param cs [String] - contentSelector
 */
export const focusElement = (selector, cs) => {
  const element = (() => {
    if (cs) {
      // querySelector throws error when id starts with digit
      const block = cs.includes('#') ? document.getElementById(cs.slice(1)) : document.querySelector(cs);
      if (!block) {
        return;
      }
      return block.querySelector('input') || block.querySelector(`${selector} textarea`);
    }
    if (selector.match(/name/)) {
      return document.querySelector(selector);
    }
    const lastItem = last(document.querySelectorAll(`${selector} [data-item-cont]`));
    return (lastItem && lastItem.querySelector('input')) || document.querySelector(`${selector} textarea`);
  })();
  if (element) element.focus();
};

export const needPopup = (resume, { step, intro }) => {
  if(!['start', 'experience', 'education', 'skills', 'summary'].some(item => item === step) || intro) return false;
  if(step === 'summary') {
    const { professionalSummary } = resume.details;
    return !professionalSummary || isDescriptionEmpty(professionalSummary);
  }
  const { blocks } = resume;
  const type = (step === 'experience') ? 'EMPLOYMENT' : step.toUpperCase();
  const block = blocks.find(b => b.type === type);
  if(!block) return false;
  const min = step === 'experience' ? 1 : 0;
  return !(block.items && block.items.length > min);
};
