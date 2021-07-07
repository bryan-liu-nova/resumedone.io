import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import animateScrollTo from 'animated-scroll-to';
import { graphql } from 'react-apollo';

import { List, ListItem } from '/imports/core/ui/atoms';
import { TEMPLATES } from '/imports/generator/api/constants';
import { UPDATE_RESUME_DETAIL } from '/imports/generator/api/apollo/client/mutations';

@graphql(UPDATE_RESUME_DETAIL)
class TemplatePicker extends PureComponent {
  select = value => {
    const { resume, mutate } = this.props;
    mutate({
      variables: {
        docId: resume._id,
        path: 'settings.template',
        value
      },
    })
  };

  componentDidMount() {
    this.scrollTo();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.resume.settings.template !==
      prevProps.resume.settings.template
    ) {
      this.scrollTo();
    }
  }

  scrollTo = () => {
    animateScrollTo(this.selected, {
      offset: -50,
      horizontal: true,
      element: this.cont
    });
  };

  render() {
    const { resume } = this.props;
    return (
      <PickerCont ref={r => this.cont = r} horizontal unstyled>
        {TEMPLATES.map(t => {
          const selected = t.id === resume.settings.template;
          return (
            <TemplateItem
                key={t.id}
                onClick={() => this.select(t.id)}
                selected={selected}
                ref={r => {
                  if (selected) {
                    this.selected = r;
                  }
                }}
            >
              {t.name}
            </TemplateItem>
          )
        })}
      </PickerCont>
    );
  }
}

const PickerCont = styled(List)`
  width: 100%;
  overflow-y: scroll;
  flex-wrap: nowrap;
  justify-content: center;
  &::-webkit-scrollbar { 
    display: none; 
  }
`;

const TemplateItem = styled(ListItem)`
  color: ${p => p.theme.colors.gray.regular};
  font-size: 16px;
  margin-right: 10px;
  padding: 10px;
  white-space: nowrap;
  ${p => p.selected && css`
    color: white;
  `}
`;

export default TemplatePicker;
