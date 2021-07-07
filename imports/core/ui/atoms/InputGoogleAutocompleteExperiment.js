import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import AutocompleteAtom from 'react-google-autocomplete';
import { withRouter } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';

import { inputStyle } from '/imports/core/ui/mixins';
import { UPDATE_AUTOSUGGEST, UPDATE_AUTOSUGGEST_SCHOOL } from '/imports/generator/api/apollo/client/mutations';
import Icon from '/imports/core/ui/atoms/ValidatedInputIcon';
import '../../../../public/css/all.min.css';
import '../../../../public/css/experiment.css';

const setExplicitValue = (targetElement, selector, value) => {
  const cont = Array(3).fill().reduce(res => res.parentNode, targetElement);
  const target = cont.querySelector(selector);
  target.value = value;
};

@withRouter
@compose(
  graphql(UPDATE_AUTOSUGGEST, { name: 'updateAutosuggest' }),
  graphql(UPDATE_AUTOSUGGEST_SCHOOL, { name: 'updateAutosuggestSchool' })
)
class InputGoogleAutosuggest extends Component {
  state = {
    hideIcon: false,
    value: this.props.value || this.props.defaultValue
  };

  onChange = e => {
    console.log(this.input.refs.input);
    const { onChange } = this.props;
    this.setState({ value: e.target.value });
    if (onChange) onChange(e);
  };

  handleFocus = () => {
    this.setState({ hideIcon: true });
  };

  handleBlur = () => {
    this.setState({ hideIcon: false });
    if (this.props.onBlur) {
      this.props.onBlur();
    }
  };

  onPlaceSelected = place => {
    const { match: { params: { resumeId } }, isSchool, variables } = this.props;
    const zip = (place.address_components.find(c => c.types.includes('postal_code')) || {}).long_name;
    const city = (place.address_components.find(c => c.types.includes('locality') || c.types.includes('postal_town')) || {}).long_name;
    const country = (place.address_components.find(c => c.types.includes('country')) || {}).long_name;
    if (isSchool) {
      this.setState({ value: place.name });
      const location = city && country ? `${city}, ${country}` : (city || country);
      setExplicitValue(this.input.refs.input, '[name="city"]', location);
      this.props.updateAutosuggestSchool({ variables: { resumeId, itemId: variables.itemId, location, school: place.name } });
    } else {
      this.setState({ value: place.name });
      setExplicitValue(this.input.refs.input, '[name="postalCode"]', zip);
      setExplicitValue(this.input.refs.input, '[name="city"]', city);
      this.props.updateAutosuggest({ variables: { resumeId, zip, country, city, address: place.name } });
    }
  };

  render() {
    const {
      error,
      defaultValue,
      value,
      types,
      onBlur,
      onChange,
      updateAutosuggestSchool,
      updateAutosuggest,
      label,
      experiment,
      ...rest 
    } = this.props;
    return (
      <WrapExp>
        <LabelExp><span className="-ol-label-text">{label}</span></LabelExp>
        <AutocompleteExp
          ref={r => this.input = r}
          value={this.state.value}
          types={types || ['address']}
          onPlaceSelected={this.onPlaceSelected}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          onChange={this.onChange}
          fields={['vicinity', 'address_components', 'formatted_address', 'name']}
          {...rest}
        />
        <Icon error={error} empty={!this.state.inputValid} hide={this.state.hideIcon} experiment />
      </WrapExp>
    )
  }
}

const WrapExp = styled.div.attrs({
  className: '-ol-input-wrap'
})`
`;

const LabelExp = styled.label.attrs({
  className: '-ol-label'
})`
`;

const AutocompleteExp = styled(AutocompleteAtom).attrs({
  className: '-ol-input'
})`
  border-top: 0;
  border-right: 0;
  border-left: 0;
  
  &:focus {
    & ~ div {
      visibility: visible;
      transform: rotateY(0);
    }
  }
 && {
    ${({error, theme}) =>
  error &&
  css`
        border-color: ${theme.colors.red};
    `};
  }
`;

const Wrap = styled.div`
  position: relative;
  border-radius: ${p => p.theme.general.borderRadius};
  overflow: hidden;
`;

const Autocomplete = styled(AutocompleteAtom)`
  ${inputStyle}
  &:focus {
    & ~ div {
      visibility: visible;
      transform: rotateY(0);
    }
  }
 && {
    ${({error, theme}) =>
  error &&
  css`
        border-color: ${theme.colors.red};
    `};
  }
}
`;

export default InputGoogleAutosuggest;
