import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import { graphql, compose } from 'react-apollo';
import { DateTime } from 'luxon';

import {
  Flex,
  Box,
  Button as ButtonAtom,
  Text,
  Icon,
  EditableTitle as EditableTitleAtom,
  Confirm
} from '/imports/core/ui/atoms';
import DownloadButtonAtom from '/imports/pdf/core/ui/components/DownloadButton'
import { DUPLICATE_RESUME, REMOVE_RESUME } from '/imports/dashboard/api/apollo/client/mutations';
import { UPDATE_RESUME_DETAIL } from '/imports/generator/api/apollo/client/mutations';
import { GET_RESUME } from '/imports/generator/api/apollo/client/queries';
import { LIST_RESUMES } from '/imports/dashboard/api/apollo/client/queries';
import { withConfirm } from '/imports/core/api/confirm';
import history from '/imports/core/api/history';
import { client } from '/imports/core/api/apollo/client/init';

@withConfirm
@compose(
  graphql(DUPLICATE_RESUME, { name: 'duplicate' }),
  graphql(REMOVE_RESUME, { name: 'remove' }),
  graphql(UPDATE_RESUME_DETAIL, { name: 'updateResumeDetail' })
)
class ResumeItem extends PureComponent {
  state = {
    confirm: null
  };

  preload = () => client.query({ query: GET_RESUME, variables: { resumeId: this.props.resume._id } });

  goTo = () => {
    const step = this.props.resume.currentStep || 'start';
    history.push(`/resume/${this.props.resume._id}/${step}`);
  };

  updateTitle = value => {
    const { resume: { _id: docId }, updateResumeDetail } = this.props;
    updateResumeDetail({
      variables: {
        docId,
        path: 'name',
        value
      },
    });
  };

  remove = () => {
    const { remove, resume: { _id: resumeId }, confirm } = this.props;
    confirm({
      title: 'Delete resume',
      text: 'Are you sure you want to delete this resume? Once deleted this resume cannot be restored.',
      confirmText: 'Delete',
      onConfirm() {
        remove({
          variables: {
            resumeId
          },
          refetchQueries: [{ query: LIST_RESUMES }]
        })
      }
    });
  };

  duplicate = () => {
    const { duplicate, resume: { _id: resumeId } } = this.props;
    duplicate({
      variables: {
        resumeId
      },
      refetchQueries: [{ query: LIST_RESUMES }]
    })
  };

  render() {
    const {
      resume: {
        name,
        updatedAt,
        settings: {
          template
        }
      }
    } = this.props;
    return (
      <ItemCont onMouseOver={this.preload}>
        <Flex>
          <Box exact>
            <TemplateCont onClick={this.goTo} template={template}>
              <EditCircle>
                <Icon icon="edit" />
              </EditCircle>
            </TemplateCont>
          </Box>
          <Box>
            <Controls>
              <EditableTitle
                  onSave={this.updateTitle}
                  onClick={this.goTo}
                  defaultValue={name}
              />
              <DateText>
                Updated {DateTime.fromISO(updatedAt).setLocale('en').toFormat('dd LLLL, HH:mm')}
              </DateText>
              <DownloadButton resume={this.props.resume}><Icon icon="download" /> Download</DownloadButton>
              <Button onClick={this.duplicate}><Icon icon="copy" /> Duplicate</Button>
              <Button onClick={this.remove}><Icon icon="trash-2" /> Delete</Button>
              {/*<Button saveTxt><Icon icon="file-text" /> Export to TXT</Button>*/}
            </Controls>
          </Box>
        </Flex>
        {this.state.confirm && <Confirm {...this.state.confirm} />}
      </ItemCont>
    );
  }
}

const ItemCont = styled.div`
  position: relative;
  > div {
    align-items: center;
    ${({ theme }) => theme.max('sm')`
      align-items: flex-start;
    `}
  }
  ${({ theme }) => theme.max('md')`
    margin-bottom: ${theme.general.mobilePadding};
  `}
`;

const DateText = styled(p => <Text {...p} />)`
  margin-top: 0;
  margin-bottom: 15px;
  font-size: .8125rem;
  color: ${({ theme }) => theme.colors.gray.regular};
  font-weight: 400;
  font-family: ${({ theme }) => theme.font.family.text};
`;

const EditableTitle = styled(EditableTitleAtom)`
  position: relative;
  margin-top: 0;
  margin-bottom: 3px;
  font-family: ${({ theme }) => theme.font.family.text};
  font-weight: 400;
  font-size: 1.1875rem;
`;

const EditCircle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${p => p.theme.colors.gray.regular};
  text-align: center;
  line-height: 37px;
  color: white;
  ${p => p.theme.min('md')`
    display: none;
  `}
`;

const TemplateCont = styled.div`
  position: relative;
  background: white;
  // transition: ${({ theme }) => theme.transitions.medium};
  border-radius: ${({ theme }) => theme.general.borderRadius};
  cursor: pointer;
  background-image: url(/img/templates/${p => p.template}.jpg);
  background-size: contain;
  width: 278px;
  height: 390px;
  ${({ theme }) => theme.max('sm')`
    width: 108px;
    height: 151px;
  `}
  &:hover {
    box-shadow: rgba(186, 200, 227, 0.48) 0px 16px 36px -8px, rgba(186, 200, 227, 0.2) 0px 24px 60px -8px;
  }
`;

const buttonStyle = css`
  display: block;
  margin-bottom: 10px;
  font-family: ${({ theme }) => theme.font.family.text};
  font-weight: 400;
  ${({ theme }) => theme.max('md')`
    margin-bottom: 15px;
  `}
  i {
    font-size: 20px;
    margin-right: 5px;
    color: ${({ theme }) => theme.colors.primary};
  }
  ${p => p.saveTxt && css`
    font-size: ${({ theme }) => theme.font.size.small};
    color: ${({ theme }) => theme.colors.gray.regular};
    i {
      color: ${({ theme }) => theme.colors.gray.regular};
    }
  `}
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background: transparent;
    i {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const Button = styled(p => <ButtonAtom unstyled {...p} />)`
  ${buttonStyle}
`;

const DownloadButton = styled(p => <DownloadButtonAtom {...p} />)`
  background: transparent;
  border: 0;
  margin: 0;
  color: #282b32;
  border-radius: 0;
  padding: 0;
  text-transform: capitalize;
  ${buttonStyle};
`;

const Controls = styled.div`
  padding-left: 30px;
  ${({ theme }) => theme.max('md')`
    padding-left: ${theme.general.mobilePadding};
    position: relative;
    top: -1.2vw;
  `}
`;

export default ResumeItem;
