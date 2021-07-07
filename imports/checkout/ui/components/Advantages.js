import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { List, ListItem, Box } from '/imports/core/ui/atoms';
import {
  ContentSection,
  PaymentSidebar,
  PaymentHeading,
  PaymentIcon
} from '/imports/checkout/ui/atoms';
import PDFViewer from '/imports/pdf/core/ui/components/PDFViewer';
import { A4_RATIO } from '/imports/generator/api/constants';

const advantages = [
  `Création d'un compte personnel`,
  `CV modifiable à tout moment`,
  `Créer un nombre <b>illimité</b> de CV`,
  `Accès à <b>361.817 offres d'emplois</b>`,
  `Modèles de <b>CV professionnels</b>`,
  `<b>Tracez</b> vos candidatures`,
  `Créer des <b>lettres de motivation</b>`,
  `Conseils de nos professionnels`
];

class Advantages extends PureComponent {
  render() {
    const { resume, loading } = this.props;
    return (
      <ContentSection>
        <PaymentSidebar>
          <PaymentHeading>Avantages</PaymentHeading>
          <ListExt>
            {advantages.map((advantage, index) => (
              <ListItemExt key={index}>
                <PaymentIcon />
                <span dangerouslySetInnerHTML={{ __html: advantage }} />
              </ListItemExt>
            ))}
          </ListExt>
        </PaymentSidebar>
        <ResumeExample hiddenSM>
          {loading ? (
            <Loading>Loading...</Loading>
          ) : (
            <ResumeExampleWrap>
              <PDFViewer resume={resume} />
            </ResumeExampleWrap>
          )}
        </ResumeExample>
      </ContentSection>
    );
  }
}

const ListExt = styled(List)`
  clear: both;
  padding-inline-start: 31px;
  & li:last-child {
    padding-bottom: 0;
  }
  ${({ theme }) => theme.max('sm')`
    & li:last-child {
      padding-bottom: 15px;
    }
  `}
`;

const ListItemExt = styled(ListItem)`
  color: ${({ theme }) => theme.colors.gray.dark};
  font-size: 15px;
  padding: 0 0 31px;
  position: relative;
`;

const ResumeExample = styled(p => <Box {...p} />)`
  position: absolute;
  top: 0;
  right: 0;
  width: calc(100% - 320px);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ResumeExampleWrap = styled.div`
  width: 289px;
  height: calc(289px * ${A4_RATIO});
  box-shadow: 0 0 17px 1px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
`;

const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Advantages;
