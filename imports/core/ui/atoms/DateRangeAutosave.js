import React, { PureComponent } from 'react';
import styled from 'styled-components';

import DatepickerAutosave from './DatepickerAutosave';
import { Checkbox, CheckboxAutosave } from '/imports/core/ui/atoms';

class DateRangeAutosave extends PureComponent {
  render() {
    const { showCheckbox } = this.props;
    const current = this.props.value[2];
    const startDateProps = {
      ...this.props,
      value: this.props.value[0],
      max: this.props.value[1] ? new Date(this.props.value[1]) : null,
      noFutureDates: true,
      variables: {
        ...this.props.variables,
        field: this.props.variables.field[0]
      }
    };
    const endDateProps = {
      ...this.props,
      value: this.props.value[1],
      current: this.props.value[2],
      min: new Date(this.props.value[0]),
      placeholderText: this.props.value[2] ? "Present" : null,
      variables: {
        ...this.props.variables,
        field: this.props.variables.field[1]
      },
      error: this.props.value[1] < this.props.value[0],
      right: true,
    };
    const currentProps = {
      ...this.props,
      value: this.props.value[2] || '',
      variables: {
        ...this.props.variables,
        field: this.props.variables.field[2]
      }
    };
    return (
      <>
      <DatepickerWrap>
        <div>
          <DatepickerAutosave {...startDateProps} showMonthYearPicker />
        </div>
        <div>
          <DatepickerAutosave {...endDateProps} showMonthYearPicker disabled={current} />
        </div>
      </DatepickerWrap>
      {showCheckbox &&
        <CheckboxWrap>
          <CheckboxAutosave
            {...currentProps}
            id="currentlyWorkHere"
            checked={current}
            width="16px"
            height="16px"
            borderRadius="3px"
            wizard
          />
          <label htmlFor="currentlyWorkHere">I currently work here</label>
        </CheckboxWrap>
      }
      </>
    )
  }
}

const DatepickerWrap = styled.div`
  position: relative;
  display: flex;
  z-index: 150;
  > div {
    width: 48.5%;
    &:first-of-type {
      margin-right: 3%;
    }
  }
`;

const CheckboxWrap = styled.div`
  padding-top: 20px;
  & label {
    letter-spacing: 0.1px;
    color: #7e8592;
    font-size: 14px;
    padding-left: 8px;
    cursor: pointer;
  }
`;

export default DateRangeAutosave;
