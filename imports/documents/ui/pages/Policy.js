import React, { PureComponent } from 'react';
import styled from 'styled-components';

import {
  Page,
  Container,
  Link
} from '/imports/core/ui/atoms';
import Top from '../components/Top';
import Document from '../components/Document';
import Footer from '/imports/landing/ui/components/Footer';

class Policy extends PureComponent {
  componentDidMount() {
  }

  render() {
    return (
      <PageExt>
        <Top activePage={'policy'} />
        <Document>
          <h3>Déclaration de confidentialité et d’utilisation des cookies - ResumeDone.io</h3>
          <p>L’utilisation du créateur de CV de ResumeDone.io implique le traitement de données confidentielles ou de données personnelles.
            ResumeDone.io accorde une importance primordiale au traitement confidentiel des données personnelles. Dès lors, toutes les données personnelles enregistrées
            sont traitées de manière minutieuse et sécurisée.</p><p>Le traitement des données personnelles par ResumeDone.io répond aux exigences européennes du Règlement
          Général sur la Protection des Données (RGPD) relatif à la protection de la vie privée, à l’égard des traitements de données à caractère personnel.
          ResumeDone.io est responsable du traitement des données à caractère personnel. Notre déclaration de confidentialité a pour but de vous préciser les données
          personnelles que nous rassemblons et que nous utilisons, ainsi que l’objet de leur utilisation. Nous vous conseillons vivement de lire notre déclaration de
          confidentialité très attentivement. La dernière mise à jour de cette déclaration de confidentialité date du 24-05-2018.</p>
          <h3>Utilisation des données personnelles</h3>
          <p>L’utilisation de notre créateur de CV implique la communication de certaines données personnelles par vos soins. Nous ne conservons et n’utilisons
            que les données personnelles que vous nous avez communiquées directement, dans le but d’utilisation du service que vous sollicitez, et celles qui s’avèrent
            clairement être communiquées dans le but d’un traitement par ResumeDone.io. Cette déclaration de confidentialité est principalement rédigée à l’attention des
            utilisateurs de notre site internet, en tant que particulier ou employé.</p>
          <p>L’utilisation de notre assistant aux fins de la création de votre CV implique la génération automatique d’un compte d’utilisateur. Nous confirmons l’utilisation des données personnelles mentionnées ci-dessous pour la gestion de ce compte et
            pour les chapitres énoncés dans la présente déclaration de confidentialité.</p>
          <ul>
            <li>Les coordonnées que vous communiquez à ResumeDone.io: Nom, Adresse, Lieu de résidence;</li>
            <li>La photo d’identité à insérer dans la rubrique profil, éventuellement transmise par vos soins;</li>
            <li>Date de naissance et lieu de naissance;</li><li>Numéro de téléphone;</li><li>Adresse e-mail;</li>
            <li>Adresse IP;</li><li>Données de paiement (cryptées);</li>
            <li>Cookies;</li>
            <li>Les informations éventuellement communiquées sur votre CV, à savoir les études accomplies, l’expérience professionnelle, les cours suivis, etc.</li>
          </ul>
          <p>Compte d’utilisateur
            <br />
            Vos données (personnelles) transmises sont conservées au sein du compte d’utilisateur/d’utilisatrice que vous avez généré. La confirmation par vos soins du choix
            « Etape suivante » entraîne l’enregistrement immédiat de ces données. La conservation de ces données a pour but de ne pas vous obliger à réintroduire les données de votre
            CV à chaque reprise, de vous permettre de consulter votre CV et/ou de le modifier à tout instant, de nous faciliter la prise de contact dans le cadre de l’exécution de
            notre accord, de la facturation ainsi qu’à nous permettre de vous communiquer un aperçu des produits et des services que vous sollicitez ou que vous avez sollicités
            sur ResumeDone.io. Le traitement de vos données personnelles par ResumeDone.io a pour but de préserver l’affiliation sollicitée et d’assurer l’enregistrement des données
            personnelles, en particulier les CV que vous avez rédigés, afin que celles-ci puissent être mises à votre disposition, à tout instant, lors d’un éventuel usage
            ultérieur de nos services. En outre, ResumeDone.io peut vous envoyer des e-mails pour vous inviter, par exemple, à finaliser votre CV.</p>
          <h3>Formulaire de contact</h3><p>L’utilisation de notre formulaire de contact implique la communication de votre nom, de votre adresse e-mail, de votre question
          ou de la description du problème auquel vous vous heurtez. Les données personnelles que vous introduisez, lors de l’utilisation du formulaire de contact de notre site
          internet, sont conservées par nos soins durant le délai nécessaire à l’accomplissement intégral du traitement de vos données et de l’apport d’une solution à vos demandes.</p>
          <h3>Cookies</h3>
          <p>Un cookie est l’équivalent d'un fichier texte de petite taille, généré par le site internet que vous consultez et stocké par le logiciel du navigateur sur
            le disque dur de l’internaute. La fonction principale des cookies consiste à différencier les utilisateurs les uns des autres. Lors d’une première consultation du site
            ResumeDone.io, un message pop-up s’affiche en vue d’inviter l’internaute à accepter l’utilisation des cookies. En cas de confirmation de votre accord à cet égard,
            vous autorisez ResumeDone.io à utiliser tous les cookies et tous les plugins, tels que décrits explicitement dans la présente déclaration de confidentialité et d’utilisation
            des cookies. Vous disposez toutefois de la possibilité de refuser l’utilisation des cookies ou de les effacer, à tout moment, par le biais de votre navigateur internet.
            Ce choix contribuerait néanmoins à réduire sensiblement le fonctionnement optimal du site internet.</p>
          <h3>Tawk et Olark</h3>
          <p>Notre site internet ResumeDone.io fait usage de logiciels de messagerie instantanée Tawk et Olark. Ces logiciels permettent aux clients de nous contacter en vue de
            nous poser rapidement des questions concises. L’utilisation de ces logiciels permettent également de cerner la page consultée par les utilisateurs du site internet.
            Veuillez cliquer sur les liens suivants :
            <a href="https://www.tawk.to/privacy-policy/" target="_blank" rel="noreferrer noopener">Tawk Privacy Policy</a> et
            <a href="https://www.olark.com/privacy-policy/" target="_blank" rel="noreferrer noopener">Olark Privacy Policy</a>
            pour tout complément d’information. Durée de rétention des données : 1 an.</p>
          <h3>Google Analytics et Tag Manager</h3>
          <p>L’intégration du logiciel Google Analytics sur notre site internet nous permet de mieux cerner la méthode d’utilisation de notre site internet par nos visiteurs.
            Google utilise des cookies. Un accord de traitement des données conclu avec Google dicte les règles à appliquer dans le cadre du traitement de ces données.
            Ainsi, les adresses IP sont sujettes à l’anonymat et nous nous sommes formellement opposés à l’utilisation des informations collectées par Google en faveur d’autres
            services proposés par Google. Veuillez consulter plus d’informations à propos du traitement des données par Google en cliquant sur le lien
            <a href="https://policies.google.com/privacy?hl=fr" target="_blank" rel="noreferrer noopener">Google Privacy Policy</a>.
            Durée de rétention des données : 2 ans.</p>
          <h3>Durée de rétention des données</h3>
          <p>Vos données personnelles sont répertoriées durant le délai nécessaire à l’accomplissement des objectifs décrits dans la présente déclaration.
            Cependant, certains facteurs technico-fiscaux nous obligent à conserver certaines données durant une période prolongée. Vous avez la possibilité d’opter pour
            la suppression immédiate de vos données personnelles, en nous le demandant ou en cliquant sur le lien « Effacer les données » figurant dans le texte des messages
            e-mails que nous vous envoyons. La suppression automatique de vos données personnelles s’effectuera au terme d’une période de 3 ans suivant la résiliation de votre compte.</p>
          <h3>Communication des données personnelles à des tiers</h3><p>Notre accord garantit explicitement la non-communication de vos données à des tiers, à l’exclusion des tiers
          impliqués lors de l’exécution de nos prestations de services, par exemple nos gestionnaires de paiement. Des boutons icônes de réseaux sociaux figurent sur notre site
          internet et permettent aux gestionnaires de ces services de rassembler vos données personnelles. Veuillez trouver ci-dessous plus de détails à propos de ces gestionnaires
          de services.</p><h2>Mollie – Gestionnaire de paiements</h2><p>Mollie exerce une fonction de traitement de données pour ResumeDone.io lors de la prestation de ses services.
          La qualité de gestionnaire de paiements de Mollie l’oblige toutefois à respecter certaines obligations personnelles relatives à la confidentialité de vos données personnelles.
          Dans ce contexte, Mollie peut être considérée comme gestionnaire de données dans le cadre du traitement de vos données personnelles. Toutes les opérations de traitement
          de données exécutées par Mollie, en qualité de gestionnaire de données, sont soumises aux articles de la
          <a href="https://www.mollie.com/fr/privacy" target="_blank" rel="noreferrer noopener">politique de confidentialité de Mollie</a>.</p>
          <h3>Stripe – Gestionnaire de paiements</h3>
          <p>Stripe exerce une fonction de traitement de données pour TicketSwap lors de la prestation de ses services. La qualité de gestionnaire de paiements de Stripe
            l’oblige toutefois à respecter certaines obligations personnelles relatives à la confidentialité de vos données personnelles. Dans ce contexte, Stripe peut être
            considérée comme gestionnaire de données dans le cadre du traitement de vos données personnelles. Toutes les opérations de traitement de données exécutées par
            Stripe, en qualité de gestionnaire de données, sont soumises aux articles de la
            <a href="https://stripe.com/fr/privacy" target="_blank" rel="noreferrer noopener">politique de confidentialité de Stripe</a>.
            <br /><br />
            Stripe utilise et effectue le traitement des informations de votre paiement, par exemple le numéro de la carte de crédit en concordance avec les articles de la
            politique de confidentialité de Stripe. Nous n’enregistrons ni les données des cartes ni d’autres détails relatifs à vos données de paiement.
            Ces données sont transmises à Stripe de manière cryptée, sans notre intervention.</p><h2>Site internet de tiers</h2><p>Cette déclaration de confidentialité ne
          s’applique pas aux sites internet de tiers qui seraient liés au site internet de ResumeDone.io par le biais de liens. Nous déclinons toute responsabilité dans
          le cadre de l’utilisation de vos données personnelles par ces tiers. C’est donc avec insistance que nous vous conseillons de lire la déclaration de confidentialité
          des sites internet concernés, de manière minutieuse, avant de procéder à leur utilisation.</p><h2>Sécurisation</h2><p>Nous prenons toutes les dispositions nécessaires
          et adéquates afin de minimiser les abus et les accès non autorisés à vos données personnelles.</p><h2>Mise à jour de la déclaration de confidentialité et d’utilisation
          des cookies</h2><p>Nous nous réservons le droit d’effectuer des mises à jour de la déclaration de confidentialité et d’utilisation des cookies, sans aucun apport
          justificatif. C’est dans cette optique que nous vous conseillons de consulter régulièrement la présente déclaration afin de pouvoir prendre connaissance d’éventuelles
          modifications de celle-ci.</p><h2>Droit de consultation, de modification et de suppression de vos données</h2><p>N’hésitez pas à nous joindre, par le biais de notre
          formulaire de contact, pour toute question relative à notre gestion de confidentialité et d’utilisation des cookies, ainsi que pour toutes vos questions posées dans
          le cadre du droit de consultation, de modification et/ou de suppression de vos données personnelles. N’hésitez pas à nous contacter, par le biais de notre formulaire
          de contact, pour toute question relative à notre politique de confidentialité et d’utilisation des cookies ou pour toute question concernant le droit de consultation,
          de modification et/ou de suppression de vos données. Communiquez-nous, à tout instant, vos questions à propos des droits mentionnés ci-dessous.</p>
          <ul>
            <li>Vous disposez du droit de prendre connaissance des données personnelles dont nous disposons à votre propos, ainsi  que de connaître l’objet de leur utilisation;</li>
            <li>Vous disposez du droit de consultation intégrale de vos données personnelles;</li>
            <li>Vous disposez du droit de faire supprimer certaines données (personnelles) (désuètes);</li>
            <li>Vous disposez du droit de contester l’utilisation de vos données (personnelles).</li>
          </ul>
          <h3>Plaintes</h3>
          <p>En cas d’intime conviction de la non-conformité de notre politique de confidentialité et d’utilisation des cookies, vous disposez du droit d’introduire une
            réclamation auprès de l’Autorité compétente de protection des données personnelles.</p>
        </Document>
        <Footer />
      </PageExt>
    );
  }
}

const PageExt = styled(Page)`
  background: #f7f7f7;
  min-height: 100vh;
  overflow: hidden;
`;

const ContainerComp = styled(Container)`
  max-width: 850px;
  padding: 0 10px;
  font-family: ${({ theme }) => theme.font.family.openSans};
  ${({ theme }) => theme.max('xs')`
    padding: 0;
  `}
`;

export default Policy;
