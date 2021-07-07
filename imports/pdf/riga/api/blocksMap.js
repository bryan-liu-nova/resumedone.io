import React from 'react';
import styled from 'styled-components';
import capitalize from 'lodash/capitalize';

import { displayTemplateTitle } from '/imports/generator/api/helpers';
import PercentageDisplay from '/imports/pdf/riga/ui/components/PercentageDisplay';
import SocialLinkDisplay from '/imports/pdf/riga/ui/components/SocialLinkDisplay';
import RangeActivityDisplay from '/imports/pdf/riga/ui/components/RangeActivityDisplay';
import ReferenceItem from '/imports/pdf/riga/ui/components/ReferenceItem';
import EducationItem from '/imports/pdf/riga/ui/components/EducationItem';
import { Text } from '/imports/pdf/riga/ui/atoms';

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
  font-size: 14px;
`;

export default {
  'CUSTOM': {
    renderItem(item, resume) {
      if (!item.fields) return null;
      return (
        <RangeActivityDisplay
          key={item._id}
          title={item.fields.title}
          description={item.fields.description}
          startDate={item.fields.startDate}
          endDate={item.fields.endDate}
          color={resume.settings.color}
        />
      )
    },
  },
  'COURSES': {
    getItemTitle(item) {
      const {
        course,
        institution
      } = item.fields || {};
      return displayTemplateTitle(course, institution, ', ');
    },
    renderItem(item, resume) {
      if (!item.fields) return null;
      return (
        <RangeActivityDisplay
          key={item._id}
          title={item.fields.course}
          employer={item.fields.institution}
          description={item.fields.description}
          startDate={item.fields.startDate}
          endDate={item.fields.endDate}
          current={item.fields.current}
          color={resume.settings.color}
          blockType="COURSES"
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
    renderItem(item, resume) {
      if (!item.fields) return null;
      return (
        <RangeActivityDisplay
          key={item._id}
          title={item.fields.title}
          employer={item.fields.employer}
          description={item.fields.description}
          startDate={item.fields.startDate}
          endDate={item.fields.endDate}
          color={resume.settings.color}
        />
      )
    },
  },
  'INTERNSHIPS': {
    getItemTitle(item) {
      const {
        title,
        employer
      } = item.fields || {};
      return displayTemplateTitle(title, employer, ', ');
    },
    renderItem(item, resume) {
      if (!item.fields) return null;
      return (
        <RangeActivityDisplay
          key={item._id}
          title={item.fields.title}
          employer={item.fields.employer}
          description={item.fields.description}
          startDate={item.fields.startDate}
          endDate={item.fields.endDate}
          current={item.fields.current}
          color={resume.settings.color}
        />
      )
    },
  },
  'HOBBIES': {
    icon: 'e925',
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
          key={item._id}
          title={this.getItemTitle(item)}
          percentage={LANGUAGE_PERCENTAGE_MAP[item.fields.languageLevel]}
          color={resume.settings.color}
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
      return displayTemplateTitle(fullName, company, ' from ');
    },
    renderItem(item, resume) {
      if (!item.fields) return null;
      return (
        <ReferenceItem
          key={item._id}
          title={item.fields.fullName}
          company={item.fields.company}
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
    renderItem(item, resume, isPlaceholder) {
      if (!item.fields) return null;
      return (
        <RangeActivityDisplay
          key={item._id}
          title={item.fields.title}
          employer={item.fields.employer}
          description={item.fields.description}
          startDate={item.fields.startDate}
          endDate={item.fields.endDate}
          current={item.fields.current}
          color={resume.settings.color}
        />
      )
    }
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
          color={resume.settings.color}
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
      return displayTemplateTitle(degree, school, ', ');
    },
    canDisplay(education) {
      return education.items.some(item => item.fields && item.fields.school && item.fields.degree);
    },
    renderItem(item, resume, isPlaceholder) {
      if (!item.fields || !item.fields.school || !item.fields.degree) return null;
      return (
        <EducationItem
          key={item._id}
          degree={item.fields.degree}
          school={item.fields.school}
          endDate={item.fields.endDate}
          showOnlyYear
          color={resume.settings.color}
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
          color={resume.settings.color}
          src={item.fields.url}
        />
      )
    }
  }
};
