import React, { PureComponent } from 'react';
import { graphql, compose, Query } from 'react-apollo';
import { AutocompleteInputAutosave } from '/imports/core/ui/atoms';
import { GET_SCHOOLS, GET_JOBS } from '/imports/generator/api/apollo/client/queries';
import { UPDATE_BLOCK_ITEM_FIELD } from '/imports/generator/api/apollo/client/mutations';
import debounce from 'lodash/debounce';

class AutocompleteInputWithData extends PureComponent {
  state = {
    search: this.props.value || ''
  };

  onChange = debounce(search => {
    this.setState({ search });
  }, 500);

  render() {
    const { search } = this.state;
    const { type } = this.props;
    if (type === 'schools') {
      return (
        <Query query={GET_SCHOOLS} variables={{ search }}>
          {({ data, loading, error }) => {
            const { getSchools } = data;
            const options = getSchools && getSchools.map(o => o.name) || [];
            return (
              <AutocompleteInputSideEffects
                {...this.props}
                options={options}
                getSchools={getSchools}
                dark={true}
                onDataChange={this.onChange}
              />)}}
        </Query>
      );
    } else if(type === 'jobs') {
      return (
        <Query query={GET_JOBS} variables={{ search }}>
          {({ data, loading, error }) => {
            const { getJobs } = data;
            const options = getJobs && getJobs.map(o => o.title) || [];
            return (
              <AutocompleteInputSideEffects
                {...this.props}
                options={options}
                dark={true}
                onDataChange={this.onChange}
              />)}}
        </Query>
      );
    }
    return null;
  }
}

@compose(
  graphql(UPDATE_BLOCK_ITEM_FIELD, {
    name: 'updateBlockItemField'
  }),
)
class AutocompleteInputSideEffects extends PureComponent {
  updateCity = school => {
    const { getSchools, updateBlockItemField, variables } = this.props;
    if(getSchools && getSchools.length > 0) {
      const schoolItem = getSchools.find(s => s.name === school);
      const city = schoolItem && schoolItem.city;
      if(updateBlockItemField && city) {
        updateBlockItemField({
          variables: {
            ...variables,
            field: 'city',
            value: city
          }
        })
      }
    }
  };

  updateSuggestionSearch = job => {
    let ref = this.props.getChild();
    if(ref) ref.onSelect(job);
  };

  render() {
    const { type, getSchools, ...rest } = this.props;
    let sideEffect;
    switch(type) {
      case 'schools' : sideEffect = this.updateCity; break;
      case 'jobs' : sideEffect = this.updateSuggestionSearch; break;
      default: sideEffect = () => {};
    }
    return (
      <AutocompleteInputAutosave
        {...rest}
        sideEffect={sideEffect}
      />)
  }
}

export default AutocompleteInputWithData;
