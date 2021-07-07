import { min, max, between, getCurrentBreakpoint } from '/imports/core/ui/helpers';
import { BREAKPOINTS } from '/imports/core/ui/helpers';

const SHADOW_COLOR = 'rgba(30, 30, 30, 0.07)';
const BASE_FONT_SIZE = '16px';

export const theme = {
  breakpoints: BREAKPOINTS,
  colors: {
    primary: '#0099da',
    secondary: '#37c26e',
    black: '#282b32',
    none: '#282b32',
    violet: '#673fb4',
    blue: '#0099da',
    green: '#37c26e',
    red: '#fc4f52',
    darkBlack: '#171717',
    orange: '#e5891E',
    darkOrange: '#e5661E',
    gray: {
      darker: '#3c414b',
      dark: '#58606e',
      regular: '#98A1B3',
      light: '#bfc5d6',
      lighter: '#f2f5fa',
      placeholder: '#a3a3a3',
      previewBackground: '#7a8599;',
    },
    danger: '#fc4f52',
    warning: '#ff9159',
    yellow: '#f3b721',
    info: '#6654ff',
    lightGreen: '#80cc14',
    success: '#2ba763',
    gold: '#b58e58',
    blockItemBorder: '#dde3f0',
    previewBlack: '#0f141f',
    cta: '#2196f3',
    budapestViolet: '#583193',
    budapestGreen: '#63a143',
    budapestRed: '#c0202b',
    budapestBlue: '#2c2e81',
    rigaGold: '#af9661',
  },
  general: {
    gridSize: 12,
    gridGap: '18px',
    borderRadius: '4px',
    mobilePadding: '5vw',
    borderWidth: '1px',
    headerHeight: '75px',
    containerWidth: {
      md: '980px',
      lg: '1200px',
    },
    resumeItemHeight: {
      lg: '420px',
      md: '390px',
      sm: '350px',
      xs: '150px'
    },
    previewWidth: {
      md: '720px',
      lg: '720px'
    }
  },
  modal: {
    backdropColor: 'rgba(30, 30, 30, .85)'
  },
  transitions: {
    fast: '.2s ease',
    medium: '.4s ease',
    slow: '.8s ease'
  },
  zIndex: {
    header: 1000,
    headerFixed: 1030,
    modalBg: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070
  },
  spaces: {
    unit: `calc(${BASE_FONT_SIZE} / 2)`
  },
  shadows: {
    level1: `0 7px 12px ${SHADOW_COLOR}`,
    level2: `0 3px 40px ${SHADOW_COLOR}`,
    level3: `0 27px 45px ${SHADOW_COLOR}`
  },
  font: {
    size: {
      base: BASE_FONT_SIZE,
      h1: '32px',
      h2: '28px',
      h3: '24px',
      h4: '18px',
      h5: '16px',
      h6: '14px',
      small: '12px',
      smaller: '10px'
    },
    lineHeight: {
      base: 1.38,
      reduced: 1.2,
      increased: 1.5,
      double: 2
    },
    letterSpacing: {
      base: 'normal',
      accent: '0.2em'
    },
    family: {
      text: 'TTComommons, Roboto light, Helvetica Neue, sans-serif',
      header: 'TTComommons Bold, Arial Rounded, Helvetica Neue, sans-serif',
      accent: 'TTComommons DemiBold, Arial Rounded, Helvetica Neue, sans-serif',
      correctText: 'TTCommons, Roboto light, Helvetica Neue, sans-serif',
      correctHeader: 'TTCommons DemiBold, Arial Rounded, Helvetica Neue, sans-serif',
      correctAccent: 'TTCommons DemiBold, Arial Rounded, Helvetica Neue, sans-serif',
      wizardHeader: 'Montserrat Bold, TTCommons Bold, Arial Rounded, Helvetica Neue, sans-serif',
      wizardSubheader: 'Montserrat,TTCommons, Roboto light, Helvetica Neue, sans-serif',
      tahoma: 'Tahoma',
      openSans: 'Open Sans',
      arial: 'Arial',
      monaco: 'Monaco'
    }
  },
  min,
  max,
  between,
  getCurrentBreakpoint
};

export default theme;
