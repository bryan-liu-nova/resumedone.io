import React from 'react';
import capitalize from 'lodash/capitalize';

import { displayTemplateTitle } from '/imports/generator/api/helpers';
import PercentageDisplay from '/imports/pdf/singapore/ui/components/PercentageDisplay';
import SocialLinkDisplay from '/imports/pdf/singapore/ui/components/SocialLinkDisplay';
import RangeActivityDisplay from '/imports/pdf/singapore/ui/components/RangeActivityDisplay';
import ReferenceItem from '/imports/pdf/singapore/ui/components/ReferenceItem';
import { Text } from '/imports/pdf/singapore/ui/atoms';

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

export default {
  'CUSTOM': {
    renderItem(item) {
      if (!item.fields) return null;
      return (
        <RangeActivityDisplay
            key={item._id}
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
      return displayTemplateTitle(course, institution, ' at ');
    },
    icon: 'e922',
    renderItem(item, resume) {
      if (!item.fields) return null;
      return (
        <RangeActivityDisplay
            key={item._id}
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
      return displayTemplateTitle(title, employer, ' in ');
    },
    renderItem(item, resume) {
      if (!item.fields) return null;
      return (
        <RangeActivityDisplay
            key={item._id}
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
      return displayTemplateTitle(title, employer, ' at ');
    },
    renderItem(item, resume) {
      if (!item.fields) return null;
      return (
        <RangeActivityDisplay
            key={item._id}
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
        <Text>{item.fields.description}</Text>
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
    icon: 'e973',
    canDisplay(languages) {
      return languages.items.some(item => item.fields && item.fields.language);
    },
    renderItem(item, resume, isPlaceholder) {
      if (!item.fields || !item.fields.language) return null;
      return (
        <PercentageDisplay
            key={item._id}
            title={this.getItemTitle(item)}
            percentage={LANGUAGE_PERCENTAGE_MAP[item.fields.languageLevel]}
            isPlaceholder={isPlaceholder}
        />
      )
    },
  },
  'REFERENCES': {
    icon: 'e97f',
    renderItem(item, resume) {
      if (!item.fields) return null;
      return (
        <ReferenceItem
            key={item._id}
            title={item.fields.fullName}
            email={item.fields.email}
            phone={item.fields.phone}
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
      return displayTemplateTitle(title, employer, ' at ');
    },
    icon: 'e972',
    renderItem(item, resume, isPlaceholder) {
      if (!item.fields) return null;
      return (
        <RangeActivityDisplay
            key={item._id}
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
            key={item._id}
            title={this.getItemTitle(item)}
            percentage={SKILL_PERCENTAGE_MAP[item.fields.skillLevel]}
            hideStripe={this.getHide(resume)}
            isPlaceholder={isPlaceholder}
        />
      )
    },
    icon: 'e95c',
  },
  'EDUCATION': {
    icon: 'e922',
    canDisplay(education) {
      return education.items.some(item => item.fields && item.fields.school && item.fields.degree);
    },
    renderItem(item, resume, isPlaceholder) {
      if (!item.fields || !item.fields.school || !item.fields.degree) return null;
      return (
        <RangeActivityDisplay
            key={item._id}
            title={item.fields.school}
            city={item.fields.city}
            degree={item.fields.degree}
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
              key={item._id}
              title={this.getItemTitle(item)}
              src={item.fields.url}
          />
      )
    },
  }
};
