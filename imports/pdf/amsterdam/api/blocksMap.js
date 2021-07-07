import React from 'react';
import styled from 'styled-components';
import capitalize from 'lodash/capitalize';

import { displayTemplateTitle } from '/imports/generator/api/helpers';
import PercentageDisplay from '/imports/pdf/amsterdam/ui/components/PercentageDisplay';
import SocialLinkDisplay from '/imports/pdf/amsterdam/ui/components/SocialLinkDisplay';
import RangeActivityDisplay from '/imports/pdf/amsterdam/ui/components/RangeActivityDisplay';
import ReferenceItem from '/imports/pdf/amsterdam/ui/components/ReferenceItem';
import { Text } from '/imports/pdf/amsterdam/ui/atoms';
import { View } from '/imports/pdf/core/ui/atoms';

const SKILL_PERCENTAGE_MAP = {
  NOVICE: 20,
  BEGINNER: 40,
  SKILLFUL: 60,
  EXPERIENCED: 80,
  EXPERT: 100
};

const LANGUAGE_PERCENTAGE_MAP = {
  NATIVE: 100,
  PROFICIENT: 80,
  VERY_GOOD: 60,
  GOOD: 40,
  WORKING: 20,
  C2: 100,
  C1: 100,
  B2: 80,
  B1: 60,
  A2: 40,
  A1: 20
};

const TextCond = styled(Text)`
  font-family: 'Montserrat SemiBold';
  font-size: 9pt;
  color: #373737;
`;

const ViewCond = styled(View)`
  margin-bottom: 6pt;
`;

export default {
  'CUSTOM': {
    getItemTitle(item) {
      const {
        title,
        city
      } = item.fields || {};
      return displayTemplateTitle(title, city, ', ');
    },
    renderItem(item) {
      if (!item.fields) return null;
      return (
        <RangeActivityDisplay
            title={this.getItemTitle(item)}
            city={item.fields.city}
            description={item.fields.description}
            startDate={item.fields.startDate}
            endDate={item.fields.endDate}
        />
      )
    },
    icon: 'e969',
  },
  'COURSES': {
    getItemTitle(item) {
      const {
        course,
        institution
      } = item.fields || {};
      return displayTemplateTitle(course, institution, ', ');
    },
    icon: 'e922',
    renderItem(item) {
      if (!item.fields) return null;
      return (
        <RangeActivityDisplay
            title={this.getItemTitle(item)}
            description={item.fields.description}
            startDate={item.fields.startDate}
            endDate={item.fields.endDate}
            current={item.fields.current}
        />
      )
    },
  },
  'EXTRA_CURRICULAR': {
    getItemTitle(item) {
      const {
        title,
        employer
      } = item.fields || {};
      return displayTemplateTitle(title, employer, ', ');
    },
    renderItem(item) {
      if (!item.fields) return null;
      return (
        <RangeActivityDisplay
            title={this.getItemTitle(item)}
            city={item.fields.city}
            description={item.fields.description}
            startDate={item.fields.startDate}
            endDate={item.fields.endDate}
        />
      )
    },
    icon: 'e900',
  },
  'INTERNSHIPS': {
    getItemTitle(item) {
      const {
        title,
        employer
      } = item.fields || {};
      return displayTemplateTitle(title, employer, ', ');
    },
    renderItem(item) {
      if (!item.fields) return null;
      return (
        <RangeActivityDisplay
            title={this.getItemTitle(item)}
            city={item.fields.city}
            description={item.fields.description}
            startDate={item.fields.startDate}
            endDate={item.fields.endDate}
            current={item.fields.current}
        />
      )
    },
    icon: 'e972',
  },
  'HOBBIES': {
    icon: 'e925',
    renderItem(item) {
      if (!item.fields) return null;
      return (
        <ViewCond>
          <TextCond>{item.fields.description}</TextCond>
        </ViewCond>
      )
    },
  },
  'LANGUAGES': {
    getItemTitle(item) {
      const {
        language = ''
      } = item.fields || {};
      return `${language}`;
    },
    canDisplay(languages) {
      return languages.items.some(item => item.fields && item.fields.language);
    },
    icon: 'e973',
    renderItem(item, resume, isPlaceholder) {
      if (!item.fields || !item.fields.language) return null;
      return (
        <PercentageDisplay
            title={this.getItemTitle(item)}
            percentage={LANGUAGE_PERCENTAGE_MAP[item.fields.languageLevel]}
            color={resume.settings.color}
            isPlaceholder={isPlaceholder}
        />
      )
    },
  },
  'REFERENCES': {
    getItemTitle(item) {
      const {
        fullName,
        company
      } = item.fields || {};
      return displayTemplateTitle(fullName, company, ', ');
    },
    icon: 'e97f',
    renderItem(item, resume) {
      if (!item.fields) return null;
      return (
        <ReferenceItem
            title={this.getItemTitle(item)}
            email={item.fields.email}
            phone={item.fields.phone}
            color={resume.settings.color}
        />
      )
    }
  },
  'EMPLOYMENT': {
    getItemTitle(item) {
      const {
        title,
        employer
      } = item.fields || {};
      return displayTemplateTitle(title, employer, ', ');
    },
    icon: 'e972',
    renderItem(item, resume, isPlaceholder) {
      if (!item.fields) return null;
      return (
        <RangeActivityDisplay
            title={this.getItemTitle(item)}
            city={item.fields.city}
            description={item.fields.description}
            startDate={item.fields.startDate}
            endDate={item.fields.endDate}
            current={item.fields.current}
            isPlaceholder={isPlaceholder}
        />
      )
    },
  },
  'SKILLS': {
    getItemTitle(item) {
      const {
        skill,
        skillLevel
      } = item.fields || {};
      let res = capitalize(skillLevel);
      if (skill) return skill;
      return res;
    },
    getHide(resume) {
      const { blocks } = resume;
      const skills = blocks.find(block => block.type === 'SKILLS');
      const { hideLevel } = skills;
      return hideLevel;
    },
    canDisplay(skills) {
      return skills.items.some(item => item.fields && item.fields.skill);
    },
    renderItem(item, resume, isPlaceholder) {
      if (!item.fields || !item.fields.skill) return null;
      return (
        <PercentageDisplay
            title={this.getItemTitle(item)}
            percentage={SKILL_PERCENTAGE_MAP[item.fields.skillLevel]}
            color={resume.settings.color}
            hideStripe={this.getHide(resume)}
            isPlaceholder={isPlaceholder}
        />
      )
    },
    icon: 'e95c',
  },
  'EDUCATION': {
    getItemTitle(item) {
      const {
        school,
        degree
      } = item.fields || {};
      return displayTemplateTitle(school, degree, ', ');
    },
    icon: 'e922',
    canDisplay(education) {
      return education.items.some(item => item.fields && item.fields.school && item.fields.degree);
    },
    renderItem(item, resume, isPlaceholder) {
      if (!item.fields || !item.fields.school || !item.fields.degree) return null;
      return (
        <RangeActivityDisplay
            title={this.getItemTitle(item)}
            city={item.fields.city}
            description={item.fields.description}
            endDate={item.fields.endDate}
            isPlaceholder={isPlaceholder}
            showOnlyYear
        />
      )
    },
  },
  'SOCIAL_LINKS': {
    getItemTitle(item) {
      const fields = item.fields || {};
      return fields.label || '(Not specified)';
    },
    renderItem(item, resume) {
      if (!item.fields || !item.fields.label) return null;
      return (
        <SocialLinkDisplay
            title={this.getItemTitle(item)}
            color={resume.settings.color}
            src={item.fields.url}
        />
      )
    },
  }
};
