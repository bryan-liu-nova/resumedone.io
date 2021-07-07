import React from 'react';
import styled from 'styled-components';
import capitalize from 'lodash/capitalize';

import { displayTemplateTitle } from '/imports/generator/api/helpers';
import PercentageDisplay from '/imports/pdf/berlin/ui/components/PercentageDisplay';
import SocialLinkDisplay from '/imports/pdf/berlin/ui/components/SocialLinkDisplay';
import RangeActivityDisplay from '/imports/pdf/berlin/ui/components/RangeActivityDisplay';
import ReferenceItem from '/imports/pdf/berlin/ui/components/ReferenceItem';
import { Text } from '/imports/pdf/berlin/ui/atoms';

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

const TextCont = styled(Text)`
  font-size: 10pt;
  margin-top: 2pt;
  margin-bottom: 7pt;
`;

export default {
  'CUSTOM': {
    renderItem(item) {
      if (!item.fields) return null;
      return (
        <RangeActivityDisplay
            title={item.fields.title}
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
    }
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
    }
  },
  'HOBBIES': {
    renderItem(item) {
      if (!item.fields) return null;
      return (
        <TextCont>{item.fields.description}</TextCont>
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
    renderItem(item, resume) {
      if (!item.fields) return null;
      return (
        <ReferenceItem
            title={item.fields.fullName}
            email={item.fields.email}
            phone={item.fields.phone}
            color={resume.settings.color}
            company={item.fields.company}
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
  },
  'EDUCATION': {
    getItemTitle(item) {
      const {
        school,
        degree
      } = item.fields || {};
      return displayTemplateTitle(school, degree, ', ');
    },
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
