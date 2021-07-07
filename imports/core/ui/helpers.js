import { createElement as h } from 'react';
import { css } from 'styled-components';
import { theme as designTheme } from '/imports/core/ui/theme';

export const BREAKPOINTS = {
  xs: 449,
  sm: 767,
  md: 980,
  lg: 1200
};

export const getStripeInputStyleProps = () => ({
  style: {
    base: {
      fontSize: '16px',
      color: designTheme.colors.black,
      fontWeight: 200,
      lineHeight: 1.7,
      fontFamily: designTheme.font.family.text,
      '::placeholder': {
        color: designTheme.colors.gray.regular,
        fontWeight: 200
      },
    },
    invalid: {
      color: designTheme.colors.black
    }
  },
});

export const theme = (path, displayError) => props =>
  path.split('.').reduce((res, segment) => {
    if (!res[segment])
      return displayError ? console.error(`No prop ${segment} on current theme`) : null;
    return res[segment];
  }, props.theme);

const getColorRule = color => `color: ${color};`;

export const getCurrentBreakpoint = () => {
  const { innerWidth } = window;
  if (innerWidth <= BREAKPOINTS['sm']) {
    return 'xs';
  } else if (innerWidth >= BREAKPOINTS['sm'] && innerWidth < BREAKPOINTS['md']) {
    return 'sm';
  } else if (innerWidth >= BREAKPOINTS['md'] && innerWidth < BREAKPOINTS['lg']) {
    return 'md';
  } else if (innerWidth >= BREAKPOINTS['lg']) {
    return 'lg';
  }
};

export const colorMixin = props => {
  if (!props.color) return '';
  const themeColor = theme(`colors.${props.color}`, false)({ theme: designTheme });
  if (themeColor) return getColorRule(themeColor);
  return getColorRule(props.color);
};

export const flexChildMixin = props => {
  let rules = '';
  if (props.order) rules += `order: ${props.order};`;
  if (props.grow) rules += `flex-grow: ${props.grow};`;
  if (props.shrink) rules += `flex-shrink: ${props.shrink};`;
  return rules;
};

export const hiddenMixin = props => {
  let res = '';
  if (props.hiddenXS) {
    res += `
      @media (max-width: ${getSizeFromBreakpoint('xs')}) {
        display: none !important;
      }
    `;
  }
  if (props.hiddenSM) {
    res += `
      @media (max-width: ${getSizeFromBreakpoint('sm')}) {
        display: none !important;
      }
    `;
  }
  if (props.hiddenMD) {
    res += `
      @media (min-width: ${getSizeFromBreakpoint('md')}) {
        display: none !important;
      }
    `;
  }
  if (props.hiddenLG) {
    res += `
      @media (min-width: ${getSizeFromBreakpoint('lg')}) {
        display: none !important;
      }
    `;
  }
  return res;
};

const getGridRelatedValue = value => {
  if (value && typeof value === 'number') {
    return `${(value / designTheme.general.gridSize) * 100}%`;
  }
  return value;
};

export const buildResponsiveWidthMixin = props => {
  let res = '';
  if (
    props.md != null ||
    props.lg != null ||
    props.sm != null ||
    props.xs != null
  ) {
    if (props.lg != null) {
      res += `
        @media (max-width: ${getSizeFromBreakpoint('lg')}) {
          width: ${getGridRelatedValue(props.lg)};
        }
      `;
    }
    if (props.md != null) {
      res += `
        @media (min-width: ${getSizeFromBreakpoint('md')}) {
          width: ${getGridRelatedValue(props.md)};
        }
      `;
      res += `
        @media (max-width: ${getSizeFromBreakpoint('md')}) {
          width: 100%;
        }
      `;
    }
    if (props.sm != null) {
      res += `
        @media (max-width: ${getSizeFromBreakpoint('md')}) {
          width: ${getGridRelatedValue(props.sm)};
        }
      `;
    }
    if (props.xs != null) {
      res += `
        @media (max-width: ${getSizeFromBreakpoint('xs')}) {
          width: ${getGridRelatedValue(props.xs)};
        }
      `;
    }
  }
  if (
    props.mdPush != null ||
    props.lgPush != null ||
    props.smPush != null ||
    props.xsPush != null
  ) {
    if (props.lgPush != null) {
      res += `
        @media (max-width: ${getSizeFromBreakpoint('lg')}) {
          margin-left: ${getGridRelatedValue(props.lgPush)};
        }
      `;
    }
    if (props.mdPush != null) {
      res += `
        @media (min-width: ${getSizeFromBreakpoint('md')}) {
          margin-left: ${getGridRelatedValue(props.mdPush)};
        }
      `;
    }
    if (props.smPush != null) {
      res += `
        @media (max-width: ${getSizeFromBreakpoint('md')}) {
          margin-left: ${getGridRelatedValue(props.smPush)};
        }
      `;
    }
    if (props.xsPush != null) {
      res += `
        @media (max-width: ${getSizeFromBreakpoint('xs')}) {
          margin-left: ${getGridRelatedValue(props.xsPush)};
        }
      `;
    }
  }
  return res;
};

export const withDynamicHeading = Component => {
  const bucket = Object.create(null);

  const DynamicTag = props => {
    const tag = `h${props.level || 4}`;
    // if (!props.level || !styled.hasOwnProperty(tag)) {
    //   return h(Component, props);
    // }

    if (bucket[tag] === undefined) {
      bucket[tag] = Component.withComponent(tag);
    }

    return h(bucket[tag], props);
  };

  const name = Component.displayName || Component.constructor.name;

  if (name) {
    DynamicTag.displayName = `DynamicTag(${name})`;
  }

  return DynamicTag;
};

export const responsiveRule = (ruleName, propPath) => {
  const values = theme(propPath)({ theme: designTheme });
  let res = '';
  if (!values) return res;
  if (values.lg) {
    res += `
      @media (min-width: ${getSizeFromBreakpoint('lg')}) {
        ${ruleName}: ${values.lg};
      }
    `;
  }
  if (values.md) {
    res += `
      @media (max-width: ${getSizeFromBreakpoint('lg')}) {
        ${ruleName}: ${values.md};
      }
    `;
  }
  if (values.sm) {
    res += `
      @media (max-width: ${getSizeFromBreakpoint('md')}) {
        ${ruleName}: ${values.sm};
      }
    `;
  }
  if (values.xs) {
    res += `
      @media (max-width: ${getSizeFromBreakpoint('sm')}) {
        ${ruleName}: ${values.xs};
      }
    `;
  }
  return res;
};


const emSize = pixelValue => `${pixelValue / 16}em`;

export const getSizeFromBreakpoint = breakpointValue => {
  if (BREAKPOINTS[breakpointValue]) {
    return emSize(BREAKPOINTS[breakpointValue]);
  } else if (parseInt(breakpointValue, 10)) {
    return emSize(BREAKPOINTS[breakpointValue]);
  }
  console.error('styled-media-query: No valid breakpoint or size specified for media.');
  return '0';
};

export const min = breakpoint => (...args) => css`
  @media (min-width: ${getSizeFromBreakpoint(breakpoint, BREAKPOINTS)}) {
    ${css(...args)};
  }
`;

export const max = breakpoint => (...args) => css`
  @media (max-width: ${getSizeFromBreakpoint(breakpoint, BREAKPOINTS)}) {
    ${css(...args)};
  }
`;

export const between = (firstBreakpoint, secondBreakpoint) => (...args) => css`
  @media (min-width: ${getSizeFromBreakpoint(
      firstBreakpoint,
      BREAKPOINTS
    )}) and (max-width: ${getSizeFromBreakpoint(secondBreakpoint, BREAKPOINTS)}) {
    ${css(...args)};
  }
`;

export const media = { min, max, between };

export const generateDebounceKey = variables => {
  const { path, field } = variables;
  if(!path && !field) return 'autosave';
  if(field) return `autosave-${field}`;
  if(path.includes('.')) {
    return `autosave-${path.substring(path.lastIndexOf('.') + 1)}`;
  } else {
    return `autosave-${path}`;
  }
};