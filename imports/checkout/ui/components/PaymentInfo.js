import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { Text } from '/imports/core/ui/atoms';

class PaymentInfo extends PureComponent {
  render() {
    return (
      <PaymentText>
        Après votre paiement vous pouvez immédiatement télécharger votre CV et
        vous renoncez au droit de rétractation. Pendant 7 jours vous bénéficiez
        d'un accès illimité pour modifier votre CV, créer vos lettres de
        motivation et utiliser toutes nos fonctionnalités. Après cette période
        d'essai, votre compte sera automatiquement renouvelé au tarif mensuel de
        14,95 et vous pourrez continuer d'utiliser tous nos services. Vous
        pouvez résilier votre compte à tout moment
      </PaymentText>
    );
  }
}

const PaymentText = styled(p => <Text {...p} />)`
  font-size: ${({ theme }) => theme.font.size.smaller};
  color: ${({ theme }) => theme.colors.gray.regular};
  line-height: ${({ theme }) => theme.font.lineHeight.increased};
  padding: 10px 10px 30px 10px;
  text-align: center;
`;

export default PaymentInfo;
