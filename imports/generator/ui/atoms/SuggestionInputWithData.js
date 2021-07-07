import React, { PureComponent } from 'react';
import { graphql, compose } from 'react-apollo';
import { SuggestionInputAutosave } from '/imports/core/ui/atoms';
import { GET_JOBS, GET_SUGGESTIONS } from '/imports/generator/api/apollo/client/queries';
import { inputStyle } from '/imports/core/ui/mixins';
import debounce from 'lodash/debounce';
import styled from 'styled-components';

class InputWithDataState extends PureComponent {
  state = {
    search: '',
    area: this.props.lastJob || '',
    loading: true
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 100);
  }

  onChange = debounce(search => {
    this.setState({ search });
  }, 500);

  onSelect = area => {
    this.setState({ area });
  };

  render() {
    const { search, area, loading } = this.state;
    const { searchType, value } = this.props;
    if (loading) return <Loading>{value || '  '}</Loading>;
    return (
      <InputWithData
        {...this.props}
        onDataChange={this.onChange}
        onDataSelect={this.onSelect}
        search={search}
        area={area}
        searchType={searchType}
      />
    );
  }
}


@compose(
  graphql(GET_JOBS, {
    name: 'getJobs',
    options: ({ search }) => ({
      variables: {
        search
      }
    })
  }),
  graphql(GET_SUGGESTIONS, {
    name: 'getSuggestions',
    options: ({ area, searchType }) => ({
      variables: {
        job: area,
        type: searchType
      }
    })
  }),
)
class InputWithData extends PureComponent {
  state = {
    jobChecked: false,
  };

  componentDidMount(prevProps, prevState) {
    if(!this.state.jobChecked){
      if(!this.props.getSuggestions.loading) {
        const { getSuggestions } = this.props.getSuggestions;
        if(getSuggestions && getSuggestions.length === 0) {
          this.props.onDataSelect('');
        }
        this.setState({ jobChecked: true });
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(!this.state.jobChecked){
      if(!this.props.getSuggestions.loading) {
        const { getSuggestions } = this.props.getSuggestions;
        if(getSuggestions && getSuggestions.length === 0) {
          this.props.onDataSelect('');
        }
        this.setState({ jobChecked: true });
      }
    }
  }

  render() {
    const { getJobs: { getJobs }, getSuggestions: { getSuggestions} } = this.props;
    const areas = getJobs && getJobs.map(job => job.title) || [];
    const options = getSuggestions && getSuggestions.map(suggestion => suggestion.text) || [];
    return (
      <SuggestionInputAutosave
        {...this.props}
        areas={areas}
        options={options}
      />
    );
  }
}

const Loading = styled.div`
  ${inputStyle};
  min-height: 46px;
`;

export default InputWithDataState;
