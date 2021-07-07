import React, { PureComponent } from 'react';
import { Meteor } from 'meteor/meteor';
import DatePickerAtom from 'react-datepicker';
import styled, { css } from 'styled-components';
import { createGlobalStyle } from 'styled-components';

import Icon from '/imports/core/ui/atoms/ValidatedInputIcon';
import { inputStyle } from '/imports/core/ui/mixins';
import ErrorMessage from './InputErrorMessage';
import 'react-datepicker/dist/react-datepicker.css';

const isDateValid = (date1, date2) => {
  if(!date1 || !date2) return true;
  if(date1.getFullYear() === date2.getFullYear()) {
    return date1.getMonth() >= date2.getMonth();
  }
  return (date1.getFullYear() >= date2.getFullYear());
};

class DatePicker extends PureComponent {
  state = {
    date: this.props.value || null,
    focus: false,
    offset: 0,
    error: this.props.error || false
  };

  componentDidUpdate(prevProps, prevState) {
    const { disabled } = this.props;
    const date = new Date();
    const prevDate = new Date(prevState.date);
    if(prevProps.disabled !== disabled && disabled) {
      if(date.getMonth() !== prevDate.getMonth() || date.getYear() !== prevDate.getYear()) {
        this.setState({ date }, () => {
          this.handleChange(this.state.date);
        })
      }
    }
    if(prevProps.current !== this.props.current) {
      this.setState({ error: false });
    }
  }

  handleChange = date => {
    this.setState({ date });
    // A little trick to make that work right
    if(this.props.min && !isDateValid(date, this.props.min)) {
      return false;
    }
    this.props.onChange({ target: { value: date } });
  };

  onBlur = () => this.setState({ focus: false });

  onFocus = () => {
    const width = this._wrap.offsetWidth;
    let offset = width - 256;
    offset = offset < 0 ? offset : 0;
    this.setState({ focus: true, offset });
  };

  filterDate = (date) => {
    const { min, max, noFutureDates, right } = this.props;
    if(min) {
      if(right) {
        if(isDateValid(date, min)) {
          this.setState({ error: false });
          return true;
        } else
        {
          this.setState({ error: true });
          return true;
        }
      }
      return isDateValid(date, min);
    } else if(max) {
      return date <= max && date <= new Date();
    } else {
      return noFutureDates ? date <= new Date() : true;
    }
  };

  getWrap = (node) => {
    this._wrap = node;
  };

  render() {
    const { date, focus, offset } = this.state;
    const { disabled, current, placeholderText, error: err, right, ...rest } = this.props;
    const error = err || this.state.error;
    const selectedDate = date ? new Date(date) : null;
    return (
      <Wrap ref={this.getWrap}>
        <DatePickerComponent
          className={this.props.className}
          selected={current? null : selectedDate}
          // highlightDates={[selectedDate]}
          // minDate={new Date()}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          onChange={this.handleChange}
          dateFormat="MMM yyyy"
          showMonthYearPicker
          disabled={disabled}
          placeholderText={placeholderText || 'Select Date'}
          filterDate={this.filterDate}
        />
        <StripeWrap>
          <Stripe error={error} focus={focus} />
        </StripeWrap>
        <Icon error={error} empty={!selectedDate} hide={focus} />
        <DatePickerStyle right={right} offset={offset} />
        {error && <ErrorMessage>{'End Date is less than start date'}</ErrorMessage>}
      </Wrap>
    );
  }
}

const Wrap = styled.div`
  position: relative;
  border-radius: ${p => p.theme.general.borderRadius};
  z-index: 110;
`;

const StripeWrap = styled.div`
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: ${p => p.theme.general.borderRadius};
  background: ${p => p.theme.colors.gray.lighter};
`;

const Stripe = styled.div`
  position: absolute;
  height: 2px;
  bottom: 0;
  background-color: ${p => p.theme.colors.primary};
  left: 0;
  width: 100%;
  // transition: all .3s ease;
  will-change: transform;
  visibility: hidden;
  transform: rotateY(90deg);
  z-index: 999;
  ${p => p.focus && css`
    visibility: visible;
    transform: rotateY(0);
  `}
  ${p => p.error && css`
    background-color: ${p => p.theme.colors.danger};
    visibility: visible;
    transform: rotateY(0);
  `}
`;

const DatePickerComponent = styled(DatePickerAtom)`
  position: relative;
  z-index: 10;
  ${p => p.disabled && css`
    font-weight: normal;
  `}
  .react-datepicker__input-container input {
     ${inputStyle}
  }
`;

const DatePickerStyle = createGlobalStyle`
  .react-datepicker-wrapper {
    display: block !important;
    .react-datepicker__input-container {
      position: static;
      display: block !important;
      input {
        width: 100%;
        background-color: transparent;
        ${inputStyle}
        &::-webkit-input-placeholder {
        color: ${({ theme }) => theme.colors.gray.light};
      }
      }
    }
  }
  .react-datepicker-popper {
    left: ${p => p.right && p.offset || 0}px !important; 
    .react-datepicker {
      .react-datepicker__triangle {
        display: none;
      }
      .react-datepicker__navigation--previous {
        position: absolute;
        top: 4px;
        left: 15px;
        z-index: 4;
        background: url(${Meteor.absoluteUrl()}img/ui/arrow_left.svg) no-repeat !important;
        width: 24px;
        height: 24px;
        border: none;
        transform: rotate(180deg);
        opacity: .8;
      }
      .react-datepicker__navigation--previous:hover {
        opacity: 1;
      }
      .react-datepicker__navigation--next {
        z-index: 4;
        position: absolute;
        top: 4px;
        left: 215px;
        background: url(${Meteor.absoluteUrl()}img/ui/arrow_right.svg) no-repeat !important;
        width: 24px;
        height: 24px;
        border: none;
        opacity: .8;
      }
      .react-datepicker__navigation--next:hover {
        opacity: 1;
      }
      .react-datepicker__month-container {
        box-shadow: rgba(207, 214, 230, 0.7) 0px 14px 16px -10px, rgba(207, 214, 230, 0.12) 0px 20px 40px -8px;
        position: absolute;
        top: -17px;
        right: 0px;
        background-color: rgb(242, 245, 250);
        z-index: 2;
        transform-origin: 50% 0px;
        width: 256px;
        left: 0px;
        border-radius: 3px;
        // transition: transform 0.14s ease 0s;
        padding-bottom: 4px;
        .react-datepicker__header {
          border-bottom: none;
          background: transparent;
          font-size: 16px;
          padding: 20px 24px 12px;
        }
        .react-datepicker__month-wrapper {
          display: flex;
          align-items: center;
          justify-content: space-evenly;
          .react-datepicker__month-text {
                position: relative;
                user-select: none;
                cursor: pointer;
                font-size: 16px;
                color: rgb(38, 43, 51);
                width: 58px;
                height: 38px;
                display: flex;
                align-items: center;
                justify-content: center;
          }
          .react-datepicker__month-text:hover {
              color: ${p => p.theme.colors.primary};
              background: transparent;
          }
          .react-datepicker__month-text:hover::before {
              content: "";
              width: 58px;
              height: 38px;
              background-color: rgb(222, 238, 252);
              display: block;
              position: absolute;
              left: 0px;
              top: 0px;
              z-index: -1;
              border-radius: 19px;
          }
        }
      }
    }
  }
`;

export default DatePicker;
