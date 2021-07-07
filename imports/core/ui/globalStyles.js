import { createGlobalStyle } from 'styled-components';
import styledNormalize from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
  ${styledNormalize}
  * {
    box-sizing: border-box;
    outline: none !important;
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }
  *:not(input, textarea) {
    user-select: none;
    -moz-user-select: -moz-none;
    -webkit-user-select: none;
  }
  body {
    font-family: ${p => p.theme.font.family.correctText};
    font-size: ${p => p.theme.font.size.base};
    font-weight: normal;
    line-height: ${p => p.theme.font.lineHeight.base};
    letter-spacing: ${p => p.theme.font.letterSpacing.base};
  }
  .DraftEditor-root {
    * {
      -webkit-user-select: text !important;
      user-select: text !important;
    }
  }
  h1, h2, h3, h4, h5, h6 {
    color: ${p => p.theme.colors.black};
    font-family: ${p => p.theme.font.family.header};
  }
  h1 {
    font-size: ${p => p.theme.font.size.h1}px;
  }
  h2 {
    font-size: ${p => p.theme.font.size.h2}px;
  }
  h3 {
    font-size: ${p => p.theme.font.size.h3}px;
  }
  h4 {
    font-size: ${p => p.theme.font.size.h4}px;
  }
  h5 {
    font-size: ${p => p.theme.font.size.h5}px;
  }
  h6 {
    font-size: ${p => p.theme.font.size.h6}px;
  }
  p {
    color: ${p => p.theme.colors.black};
    font-size: ${p => p.theme.font.size.base}px;
  }
  .reorder-wrapper-item {
    position: relative;
    transition: top 1s ease-in;
  }
   @font-face {
    font-family: 'icomoon';
    src:  url('/fonts/icomoon.eot?g11dv3');
    src:  url('/fonts/icomoon.eot?g11dv3#iefix') format('embedded-opentype'),
      url('/fonts/icomoon.ttf?g11dv3') format('truetype'),
      url('/fonts/icomoon.woff?g11dv3') format('woff'),
      url('/fonts/icomoon.svg?g11dv3#icomoon') format('svg');
    font-weight: normal;
    font-style: normal;
  }
  [class^="icon-"], [class*=" icon-"] {
    /* use !important to prevent issues with browser extensions that change fonts */
    font-family: 'icomoon' !important;
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
  
    /* Better Font Rendering =========== */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .icon-activity:before {
    content: "\\e900";
  }
  .icon-airplay:before {
    content: "\\e901";
  }
  .icon-alert-circle:before {
    content: "\\e902";
  }
  .icon-alert-octagon:before {
    content: "\\e903";
  }
  .icon-alert-triangle:before {
    content: "\\e904";
  }
  .icon-align-center:before {
    content: "\\e905";
  }
  .icon-align-justify:before {
    content: "\\e906";
  }
  .icon-align-left:before {
    content: "\\e907";
  }
  .icon-align-right:before {
    content: "\\e908";
  }
  .icon-anchor:before {
    content: "\\e909";
  }
  .icon-aperture:before {
    content: "\\e90a";
  }
  .icon-archive:before {
    content: "\\e90b";
  }
  .icon-arrow-down-circle:before {
    content: "\\e90c";
  }
  .icon-arrow-down-left:before {
    content: "\\e90d";
  }
  .icon-arrow-down-right:before {
    content: "\\e90e";
  }
  .icon-arrow-down:before {
    content: "\\e90f";
  }
  .icon-arrow-left-circle:before {
    content: "\\e910";
  }
  .icon-arrow-left:before {
    content: "\\e911";
  }
  .icon-arrow-right-circle:before {
    content: "\\e912";
  }
  .icon-arrow-right:before {
    content: "\\e913";
  }
  .icon-arrow-up-circle:before {
    content: "\\e914";
  }
  .icon-arrow-up-left:before {
    content: "\\e915";
  }
  .icon-arrow-up-right:before {
    content: "\\e916";
  }
  .icon-arrow-up:before {
    content: "\\e917";
  }
  .icon-at-sign:before {
    content: "\\e918";
  }
  .icon-award:before {
    content: "\\e919";
  }
  .icon-bar-chart-2:before {
    content: "\\e91a";
  }
  .icon-bar-chart:before {
    content: "\\e91b";
  }
  .icon-battery-charging:before {
    content: "\\e91c";
  }
  .icon-battery:before {
    content: "\\e91d";
  }
  .icon-bell-off:before {
    content: "\\e91e";
  }
  .icon-bell:before {
    content: "\\e91f";
  }
  .icon-bluetooth:before {
    content: "\\e920";
  }
  .icon-bold:before {
    content: "\\e921";
  }
  .icon-book-open:before {
    content: "\\e922";
  }
  .icon-box:before {
    content: "\\e923";
  }
  .icon-camera-off:before {
    content: "\\e924";
  }
  .icon-camera:before {
    content: "\\e925";
  }
  .icon-check-circle:before {
    content: "\\e926";
  }
  .icon-check-square:before {
    content: "\\e927";
  }
  .icon-check:before {
    content: "\\e928";
  }
  .icon-chevron-down:before {
    content: "\\e929";
  }
  .icon-chevron-left:before {
    content: "\\e92a";
  }
  .icon-chevron-right:before {
    content: "\\e92b";
  }
  .icon-chevron-up:before {
    content: "\\e92c";
  }
  .icon-chevrons-up:before {
    content: "\\e92d";
  }
  .icon-circle:before {
    content: "\\e92e";
  }
  .icon-clipboard:before {
    content: "\\e92f";
  }
  .icon-clock:before {
    content: "\\e930";
  }
  .icon-cloud-snow:before {
    content: "\\e931";
  }
  .icon-cloud:before {
    content: "\\e932";
  }
  .icon-code:before {
    content: "\\e933";
  }
  .icon-copy:before {
    content: "\\e934";
  }
  .icon-crop:before {
    content: "\\e935";
  }
  .icon-crosshair:before {
    content: "\\e936";
  }
  .icon-database:before {
    content: "\\e937";
  }
  .icon-delete:before {
    content: "\\e938";
  }
  .icon-dollar-sign:before {
    content: "\\e939";
  }
  .icon-download-cloud:before {
    content: "\\e93a";
  }
  .icon-download:before {
    content: "\\e93b";
  }
  .icon-droplet:before {
    content: "\\e93c";
  }
  .icon-edit-2:before {
    content: "\\e93d";
  }
  .icon-edit-3:before {
    content: "\\e93e";
  }
  .icon-edit:before {
    content: "\\e93f";
  }
  .icon-external-link:before {
    content: "\\e940";
  }
  .icon-eye-off:before {
    content: "\\e941";
  }
  .icon-eye:before {
    content: "\\e942";
  }
  .icon-facebook:before {
    content: "\\e943";
  }
  .icon-file-minus:before {
    content: "\\e944";
  }
  .icon-file-plus:before {
    content: "\\e945";
  }
  .icon-file-text:before {
    content: "\\e946";
  }
  .icon-file:before {
    content: "\\e947";
  }
  .icon-film:before {
    content: "\\e95b";
  }
  .icon-flag:before {
    content: "\\e98a";
  }
  .icon-folder-minus:before {
    content: "\\e948";
  }
  .icon-folder-plus:before {
    content: "\\e949";
  }
  .icon-folder:before {
    content: "\\e98b";
  }
  .icon-gift:before {
    content: "\\e98c";
  }
  .icon-globe:before {
    content: "\\e98d";
  }
  .icon-headphones:before {
    content: "\\e98e";
  }
  .icon-heart:before {
    content: "\\e98f";
  }
  .icon-home:before {
    content: "\\e94a";
  }
  .icon-image:before {
    content: "\\e94b";
  }
  .icon-info:before {
    content: "\\e94c";
  }
  .icon-instagram:before {
    content: "\\e94d";
  }
  .icon-link-2:before {
    content: "\\e94e";
  }
  .icon-link:before {
    content: "\\e94f";
  }
  .icon-lock:before {
    content: "\\e990";
  }
  .icon-log-in:before {
    content: "\\e950";
  }
  .icon-log-out:before {
    content: "\\e951";
  }
  .icon-mail:before {
    content: "\\e952";
  }
  .icon-map-pin:before {
    content: "\\e991";
  }
  .icon-mic:before {
    content: "\\e992";
  }
  .icon-more-horizontal:before {
    content: "\\e953";
  }
  .icon-more-vertical:before {
    content: "\\e954";
  }
  .icon-paperclip:before {
    content: "\\e955";
  }
  .icon-pause-circle:before {
    content: "\\e956";
  }
  .icon-pause:before {
    content: "\\e957";
  }
  .icon-phone:before {
    content: "\\e958";
  }
  .icon-play:before {
    content: "\\e959";
  }
  .icon-plus-circle:before {
    content: "\\e95a";
  }
  .icon-plus:before {
    content: "\\e95d";
  }
  .icon-power:before {
    content: "\\e95c";
  }
  .icon-refresh-ccw:before {
    content: "\\e95e";
  }
  .icon-repeat:before {
    content: "\\e95f";
  }
  .icon-rotate-ccw:before {
    content: "\\e960";
  }
  .icon-rotate-cw:before {
    content: "\\e961";
  }
  .icon-rss:before {
    content: "\\e962";
  }
  .icon-save:before {
    content: "\\e963";
  }
  .icon-send:before {
    content: "\\e964";
  }
  .icon-settings:before {
    content: "\\e965";
  }
  .icon-share:before {
    content: "\\e966";
  }
  .icon-shield-off:before {
    content: "\\e967";
  }
  .icon-shield:before {
    content: "\\e968";
  }
  .icon-sliders:before {
    content: "\\e969";
  }
  .icon-thumbs-down:before {
    content: "\\e96a";
  }
  .icon-thumbs-up:before {
    content: "\\e96b";
  }
  .icon-toggle-left:before {
    content: "\\e96c";
  }
  .icon-toggle-right:before {
    content: "\\e96d";
  }
  .icon-trash-2:before {
    content: "\\e96e";
  }
  .icon-trash:before {
    content: "\\e96f";
  }
  .icon-trello:before {
    content: "\\e970";
  }
  .icon-trending-down:before {
    content: "\\e971";
  }
  .icon-trending-up:before {
    content: "\\e972";
  }
  .icon-twitter:before {
    content: "\\e973";
  }
  .icon-unlock:before {
    content: "\\e974";
  }
  .icon-upload-cloud:before {
    content: "\\e975";
  }
  .icon-upload:before {
    content: "\\e976";
  }
  .icon-user-check:before {
    content: "\\e977";
  }
  .icon-user-minus:before {
    content: "\\e978";
  }
  .icon-user-plus:before {
    content: "\\e979";
  }
  .icon-user-x:before {
    content: "\\e97a";
  }
  .icon-user:before {
    content: "\\e97b";
  }
  .icon-users:before {
    content: "\\e97c";
  }
  .icon-video-off:before {
    content: "\\e97d";
  }
  .icon-video:before {
    content: "\\e97e";
  }
  .icon-volume-2:before {
    content: "\\e97f";
  }
  .icon-volume-x:before {
    content: "\\e980";
  }
  .icon-watch:before {
    content: "\\e993";
  }
  .icon-wifi:before {
    content: "\\e981";
  }
  .icon-x-circle:before {
    content: "\\e982";
  }
  .icon-x-octagon:before {
    content: "\\e983";
  }
  .icon-x-square:before {
    content: "\\e984";
  }
  .icon-x:before {
    content: "\\e985";
  }
  .icon-youtube:before {
    content: "\\e986";
  }
  .icon-zap-off:before {
    content: "\\e987";
  }
  .icon-zap:before {
    content: "\\e988";
  }
  .icon-zoom-in:before {
    content: "\\e994";
  }
  .icon-zoom-out:before {
    content: "\\e989";
  }
  @font-face {
    font-family: 'Open Sans';
    src: url('/fonts/OpenSans-Regular.ttf');
    font-weight: 400;
    font-style: italic;
  }
  @font-face {
    font-family: 'Open Sans';
    src: url('/fonts/OpenSans-Bold.ttf');
    font-weight: 700;
    font-style: italic;
  }
  @font-face {
    font-family: 'Tahoma';
    src: url('/fonts/Tahoma.ttf');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'TTCommons';
    src: url('/fonts/TTCommons-Regular.woff2');
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: 'TTCommons';
    src: url('/fonts/TTCommons-DemiBold.woff');
    font-weight: 500;
    font-style: normal;
  }
  @font-face {
    font-family: 'TTCommons Bold';
    src: url('/fonts/TTCommons-Bold.woff2');
    font-weight: 600;
    font-style: normal;
  }
  @font-face {
    font-family: 'TTCommons DemiBold';
    src: url('/fonts/TTCommons-DemiBold.woff');
    font-weight: 500;
    font-style: normal;
  }
  @font-face {
    font-family: 'Montserrat';
    src: url('/fonts/Montserrat-Regular.ttf');
  }
  @font-face {
    font-family: 'Montserrat Bold';
    src: url('/fonts/Montserrat-Bold.ttf');
  }
  @font-face {
    font-family: 'Montserrat Light';
    src: url('/fonts/Montserrat-Light.ttf');
  }
  @font-face {
    font-family: 'Montserrat Medium';
    src: url('/fonts/Montserrat-Medium.ttf');
  }
  @font-face {
    font-family: 'Montserrat SemiBold';
    src: url('/fonts/Montserrat-SemiBold.ttf');
  }
  @font-face {
    font-family: 'Montserrat BoldItalic';
    src: url('/fonts/Montserrat-BoldItalic.ttf');
  }
  @font-face {
    font-family: 'Monaco';
    src: url('/fonts/Monaco-Regular.ttf');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'TemplateIcons';
    src: url('/fonts/template_icons.ttf');
  }
  @font-face {
    font-family: 'Source Sans Light';
    src: url('/fonts/SourceSansPro-Light.ttf');
  }
  @font-face {
    font-family: 'Source Sans';
    src: url('/fonts/SourceSansPro-Regular.ttf');
  }
  @font-face {
    font-family: 'Source Sans Semibold';
    src: url('/fonts/SourceSansPro-Semibold.ttf');
  }
  @font-face {
    font-family: 'Source Sans It';
    src: url('/fonts/SourceSansPro-It.ttf');
    font-style: italic;
  }
  @font-face {
    font-family: 'Source Sans SemiboldIt';
    src: url('/fonts/SourceSansPro-SemiboldIt.ttf');
  }
  @font-face {
    font-family: 'CrimsonText';
    src: url('/fonts/CrimsonText-Regular.ttf');
  }
  @font-face {
    font-family: 'CrimsonText Italic';
    src: url('/fonts/CrimsonText-Italic.ttf');
  }
  @font-face {
    font-family: 'CrimsonText Bold';
    src: url('/fonts/CrimsonText-Bold.ttf');
  }
  @font-face {
    font-family: 'CrimsonText BoldItalic';
    src: url('/fonts/CrimsonText-BoldItalic.ttf');
  }
  @font-face {
    font-family: 'CrimsonText SemiBoldItalic';
    src: url('/fonts/CrimsonText-SemiBoldItalic.ttf');
  }
  @font-face {
    font-family: 'CrimsonText SemiBold';
    src: url('/fonts/CrimsonText-SemiBold.ttf');
  }
  @font-face {
    font-family: 'Lato';
    src: url('/fonts/Lato-Regular.ttf');
  }
  @font-face {
    font-family: 'Lato Italic';
    src: url('/fonts/Lato-Italic.ttf');
  }
  @font-face {
    font-family: 'Lato Bold';
    src: url('/fonts/Lato-Bold.ttf');
  }
  @font-face {
    font-family: 'Lato BoldItalic';
    src: url('/fonts/Lato-BoldItalic.ttf');
  }
  @font-face {
    font-family: 'Lato Medium';
    src: url('/fonts/Lato-Medium.ttf');
  }
  @font-face {
    font-family: 'Lato SemiBold';
    src: url('/fonts/Lato-Semibold.ttf');
  }
  @font-face {
    font-family: 'SolomonSans';
    src: url('/fonts/SolomonSans-Normal.ttf');
  }
  @font-face {
    font-family: 'SolomonSans Italic';
    src: url('/fonts/Solomon-Sans-Normal-Italic.ttf');
  }
  @font-face {
    font-family: 'SolomonSans SemiBold';
    src: url('/fonts/SolomonSans-SemiBold.ttf');
  }
  @font-face {
    font-family: 'SolomonSans Bold';
    src: url('/fonts/Solomon-Sans-Bold.ttf');
  }
  @font-face {
    font-family: 'SolomonSans BoldItalic';
    src: url('/fonts/Solomon-Sans-Bold-Italic.ttf');
  }
  @font-face {
    font-family: 'LiberationSans';
    src: url('/fonts/LiberationSans-Regular.ttf');
  }
  @font-face {
    font-family: 'LiberationSans Italic';
    src: url('/fonts/LiberationSans-Italic.ttf');
  }
  @font-face {
    font-family: 'LiberationSans Bold';
    src: url('/fonts/LiberationSans-Bold.ttf');
  }
  @font-face {
    font-family: 'LiberationSans BoldItalic';
    src: url('/fonts/LiberationSans-BoldItalic.ttf');
  }
  @font-face {
    font-family: 'Roboto';
    src: url('/fonts/Roboto-Regular.ttf'); 
  }
  @font-face {
    font-family: 'Roboto Medium';
    src: url('/fonts/Roboto-Medium.ttf');
  }
  @font-face {
    font-family: 'Roboto Italic';
    src: url('/fonts/Roboto-Italic.ttf');
  }
  @font-face {
    font-family: 'Roboto Bold';
    src: url('/fonts/Roboto-Bold.ttf');
  }
  @font-face {
    font-family: 'Roboto BoldItalic';
    src: url('/fonts/Roboto-BoldItalic.ttf');
  }
  @font-face {
    font-family: 'Roboto Black';
    src: url('/fonts/Roboto-Black.ttf');
  }
  @font-face {
    font-family: 'PtSerif';
    src: url('/fonts/PtSerif.ttf');
  }
  @font-face {
    font-family: 'PtSerif Italic';
    src: url('/fonts/PtSerif-Italic.ttf');
  }
  @font-face {
    font-family: 'PtSerif Bold';
    src: url('/fonts/PtSerif-Bold.ttf');
  }
  @font-face {
    font-family: 'PtSerif BoldItalic';
    src: url('/fonts/PtSerif-BoldItalic.ttf');
  }
  @font-face {
    font-family: 'PtSerif SemiBold';
    src: url('/fonts/PtSerif-Semibold.ttf');
  }
  @font-face {
    font-family: 'HelveticaNeue';
    src: url('/fonts/HelveticaNeue.ttf');
  }
  @font-face {
    font-family: 'HelveticaNeue Italic';
    src: url('/fonts/HelveticaNeueIt.ttf');
  }
  @font-face {
    font-family: 'HelveticaNeue Medium';
    src: url('/fonts/HelveticaNeue-Medium.ttf');
  }
  @font-face {
    font-family: 'HelveticaNeue Bold';
    src: url('/fonts/HelveticaNeu-Bold.ttf');
  }
  @font-face {
    font-family: 'Oswald';
    src: url('https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf');
  }
  @font-face {
    font-family: 'BebasNeue';
    src: url('/fonts/BebasNeue-Regular.ttf');
  }
  @font-face {
    font-family: 'Raleway';
    src: url('/fonts/Raleway-Regular.ttf');
    font-style: normal;
    font-weight: 400;
  }
  @font-face {
    font-family: 'Raleway Medium';
    src: url('/fonts/Raleway-Medium.ttf');
    font-style: normal;
    font-weight: 500;
  }
  @font-face {
    font-family: 'Raleway Italic';
    src: url('/fonts/Raleway-Italic.ttf');
    font-style: italic;
    font-weight: 400;
  }
  @font-face {
    font-family: 'Raleway SemiBold';
    src: url('/fonts/Raleway-SemiBold.ttf');
    font-style: normal;
    font-weight: 600;
  }
  @font-face {
    font-family: 'Raleway Bold';
    src: url('/fonts/Raleway-Bold.ttf');
    font-style: normal;
    font-weight: 700;
  }
  @font-face {
    font-family: 'Raleway BoldItalic';
    src: url('/fonts/Raleway-BoldItalic.ttf');
    font-style: italic;
    font-weight: 700;
  }
  @font-face {
    font-family: 'Raleway Light';
    src: url('/fonts/Raleway-Light.ttf');
    font-style: normal;
    font-weight: 400;
  }
  
  /* devanagari */
  @font-face {
    font-family: Poppins;
    font-style: normal;
    font-weight: 400;
    font-display: block;
    src: local('Poppins Regular'), local('Poppins-Regular'), url('../fonts/Poppins/pxiEyp8kv8JHgFVrJJbecmNE.woff2') format('woff2');
    unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;
  }

  /* latin-ext */
  @font-face {
    font-family: Poppins;
    font-style: normal;
    font-weight: 400;
    font-display: block;
    src: local('Poppins Regular'), local('Poppins-Regular'), url('../fonts/Poppins/pxiEyp8kv8JHgFVrJJnecmNE.woff2') format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }

  /* latin */
  @font-face {
    font-family: Poppins;
    font-style: normal;
    font-weight: 400;
    font-display: block;
    src: local('Poppins Regular'), local('Poppins-Regular'), url('../fonts/Poppins/pxiEyp8kv8JHgFVrJJfecg.woff2') format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  @font-face {
    font-family: Poppins;
    font-style: italic;
    font-weight: 500;
    font-display:block;src: local("Poppins Medium Italic"),local("Poppins-MediumItalic"),url(/fonts/Poppins/pxiDyp8kv8JHgFVrJJLmg1hVFteOcEg.woff2) format("woff2");
    unicode-range: u+0900-097f,u+1cd0-1cf6,u+1cf8-1cf9,u+200c-200d,u+20a8,u+20b9,u+25cc,u+a830-a839,u+a8e0-a8fb
  }  
  @font-face {
    font-family: Poppins;
    font-style: italic;
    font-weight: 500;
    font-display:block;src: local("Poppins Medium Italic"),local("Poppins-MediumItalic"),url(/fonts/Poppins/pxiDyp8kv8JHgFVrJJLmg1hVGdeOcEg.woff2) format("woff2");
    unicode-range: u+0100-024f,u+0259,u+1e??,u+2020,u+20a0-20ab,u+20ad-20cf,u+2113,u+2c60-2c7f,u+a720-a7ff
  }  
  @font-face {
    font-family: Poppins;
    font-style: italic;
    font-weight: 500;
    font-display:block;src: local("Poppins Medium Italic"),local("Poppins-MediumItalic"),url(/fonts/Poppins/pxiDyp8kv8JHgFVrJJLmg1hVF9eO.woff2) format("woff2");
    unicode-range: u+00??,u+0131,u+0152-0153,u+02bb-02bc,u+02c6,u+02da,u+02dc,u+2000-206f,u+2074,u+20ac,u+2122,u+2191,u+2193,u+2212,u+2215,u+feff,u+fffd
  }
  @font-face {
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-display: block;
    src: local("Poppins Medium"), local("Poppins-Medium"), url(../fonts/Poppins/pxiByp8kv8JHgFVrLGT9Z1xlFQ.woff2) format("woff2");
    unicode-range: u+00??, u+0131, u+0152-0153, u+02bb-02bc, u+02c6, u+02da, u+02dc, u+2000-206f, u+2074, u+20ac, u+2122, u+2191, u+2193, u+2212, u+2215, u+feff, u+fffd
  }
  @font-face {
    font-family:Poppins;
    font-style:normal;
    font-weight:600;
    font-display:block;
    src:local("Poppins SemiBold"),local("Poppins-SemiBold"),url(../fonts/Poppins/pxiByp8kv8JHgFVrLEj6Z11lFc-K.woff2) format("woff2");
    unicode-range:u+0900-097f,u+1cd0-1cf6,u+1cf8-1cf9,u+200c-200d,u+20a8,u+20b9,u+25cc,u+a830-a839,u+a8e0-a8fb
  }
  @font-face {
      font-family:Poppins;
      font-style:normal;
      font-weight:600;
      font-display:block;
      src:local("Poppins SemiBold"),local("Poppins-SemiBold"),url(../fonts/Poppins/pxiByp8kv8JHgFVrLEj6Z1JlFc-K.woff2) format("woff2");
      unicode-range:u+0100-024f,u+0259,u+1e??,u+2020,u+20a0-20ab,u+20ad-20cf,u+2113,u+2c60-2c7f,u+a720-a7ff
  }
  @font-face {
      font-family:Poppins;
      font-style:normal;
      font-weight:600;
      font-display:block;
      src:local("Poppins SemiBold"),local("Poppins-SemiBold"),url(../fonts/Poppins/pxiByp8kv8JHgFVrLEj6Z1xlFQ.woff2) format("woff2");
      unicode-range:u+00??,u+0131,u+0152-0153,u+02bb-02bc,u+02c6,u+02da,u+02dc,u+2000-206f,u+2074,u+20ac,u+2122,u+2191,u+2193,u+2212,u+2215,u+feff,u+fffd
  }
  @font-face {
    font-family: Poppins;
    font-style: normal;
    font-weight: 700;
    font-display:block;src: local("Poppins Bold"),local("Poppins-Bold"),url(/fonts/Poppins/pxiByp8kv8JHgFVrLCz7Z11lFc-K.woff2) format("woff2");
    unicode-range: u+0900-097f,u+1cd0-1cf6,u+1cf8-1cf9,u+200c-200d,u+20a8,u+20b9,u+25cc,u+a830-a839,u+a8e0-a8fb;
  }
  @font-face {
    font-family: Poppins;
    font-style: normal;
    font-weight: 700;
    font-display:block;src: local("Poppins Bold"),local("Poppins-Bold"),url(/fonts/Poppins/pxiByp8kv8JHgFVrLCz7Z1JlFc-K.woff2) format("woff2");
    unicode-range: u+0100-024f,u+0259,u+1e??,u+2020,u+20a0-20ab,u+20ad-20cf,u+2113,u+2c60-2c7f,u+a720-a7ff;
  }
  @font-face {
    font-family: Poppins;
    font-style: normal;
    font-weight: 700;
    font-display:block;src: local("Poppins Bold"),local("Poppins-Bold"),url(/fonts/Poppins/pxiByp8kv8JHgFVrLCz7Z1xlFQ.woff2) format("woff2");
    unicode-range: u+00??,u+0131,u+0152-0153,u+02bb-02bc,u+02c6,u+02da,u+02dc,u+2000-206f,u+2074,u+20ac,u+2122,u+2191,u+2193,u+2212,u+2215,u+feff,u+fffd;
  }

  @font-face {
    font-family: Poppins;
    font-style: normal;
    font-weight: 800;
    font-display: swap;
    src: local("Poppins ExtraBold"), local("Poppins-ExtraBold"), url(../fonts/Poppins/pxiByp8kv8JHgFVrLDD4Z11lFc-K.woff2) format("woff2");
    unicode-range: u+0900-097f, u+1cd0-1cf6, u+1cf8-1cf9, u+200c-200d, u+20a8, u+20b9, u+25cc, u+a830-a839, u+a8e0-a8fb
  }

  @font-face {
    font-family: Poppins;
    font-style: normal;
    font-weight: 800;
    font-display: swap;
    src: local("Poppins ExtraBold"), local("Poppins-ExtraBold"), url(../fonts/Poppins/pxiByp8kv8JHgFVrLDD4Z1JlFc-K.woff2) format("woff2");
    unicode-range: u+0100-024f, u+0259, u+1e??, u+2020, u+20a0-20ab, u+20ad-20cf, u+2113, u+2c60-2c7f, u+a720-a7ff
  }

  @font-face {
    font-family: Poppins;
    font-style: normal;
    font-weight: 800;
    font-display: swap;
    src: local("Poppins ExtraBold"), local("Poppins-ExtraBold"), url(../fonts/Poppins/pxiByp8kv8JHgFVrLDD4Z1xlFQ.woff2) format("woff2");
    unicode-range: u+00??, u+0131, u+0152-0153, u+02bb-02bc, u+02c6, u+02da, u+02dc, u+2000-206f, u+2074, u+20ac, u+2122, u+2191, u+2193, u+2212, u+2215, u+feff, u+fffd
  }
  @font-face {
    font-family: icomoon;
    src: url('/fonts/sprite/icomoon.eot?kgkd2g');
    src: url('/fonts/sprite/icomoon.eot?kgkd2g#iefix') format('embedded-opentype'), url('/fonts/sprite/icomoon.ttf?kgkd2g') format('truetype'), url('/fonts/sprite/icomoon.woff?kgkd2g') format('woff'), url('/fonts/sprite/icomoon.svg?kgkd2g#icomoon') format('svg');
    font-weight: normal;
    font-style: normal;
  }
`;

export default GlobalStyle;
