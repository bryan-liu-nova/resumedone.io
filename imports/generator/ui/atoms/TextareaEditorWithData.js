import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { graphql, compose } from 'react-apollo';
import { TextareaEditorAutosave } from '/imports/core/ui/atoms';
import { GET_JOBS, GET_SUGGESTIONS } from '/imports/generator/api/apollo/client/queries';
import debounce from 'lodash/debounce';

class TextareaEditorWithDataState extends PureComponent {
  state = {
    search: '',
    area: this.props.lastJob || '',
    loading: true
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 0);
  }

  onChange = debounce(search => {
    this.setState({ search });
  }, 500);

  onSelect = area => {
    this.setState({ area });
  };

  render() {
    const { search, area, loading } = this.state;
    const { placeholder } = this.props;
    if (loading) return <Loading>{placeholder}</Loading>;
    return (
      <TextareaEditorWithData
        {...this.props}
        onDataChange={this.onChange}
        onDataSelect={this.onSelect}
        search={search}
        area={area}
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
class TextareaEditorWithData extends PureComponent {
  state = {
    jobChecked: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if(!this.state.jobChecked){
      if(prevProps.getSuggestions.loading !== this.props.getSuggestions.loading && !this.props.getSuggestions.loading) {
        const { getSuggestions } = this.props.getSuggestions;
        if(getSuggestions && getSuggestions.length === 0) {
          this.props.onDataSelect('');
        }
        this.setState({ jobChecked: true });
      }
    }
  }

  render() {
    const { getJobs: { getJobs, loading }, getSuggestions: { getSuggestions, loading: dataLoading} } = this.props;
    const areas = getJobs && getJobs.map(job => job.title) || [];
    const help = getSuggestions && getSuggestions.map(({ _id, text }) => ({ _id, text })) || [];
    return (
      <TextareaEditorAutosave
        areas={areas}
        areasLoading={loading}
        help={help}
        dataLoading={dataLoading}
        {...this.props}
      />
    );
  }
}

const Loading = styled.div`
  position: relative;
  height: 300px;
  background: ${p => p.theme.colors.gray.lighter};
  border: solid 1px #e1e5e8;
  padding: 15px 50% 15px 15px;
  line-height: 1.7;
  color: ${p => p.theme.colors.gray.regular};
  font-size: 12px;
  &:after {
    content: 'Loading...';
    font-size: 12px;
    padding: 15px;
    color: ${p => p.theme.colors.gray.regular};
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 245px;
    background: white;
  }
`;

export default TextareaEditorWithDataState;
