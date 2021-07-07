// import { Font } from '/imports/pdf/core/ui/atoms';
// import { Meteor } from 'meteor/meteor';
//
// Font.registerHyphenationCallback( word => [word] );
//
// Font.register(`${Meteor.absoluteUrl()}fonts/icomoon.ttf`, { family: 'Icomoon' });
// Font.register(`${Meteor.absoluteUrl()}fonts/template_icons.ttf`, { family: 'TemplateIcons' });
//
// Font.register(`${Meteor.absoluteUrl()}fonts/SourceSansPro-Light.ttf`, { family: 'Source Sans Light' });
// Font.register(`${Meteor.absoluteUrl()}fonts/SourceSansPro-Regular.ttf`, { family: 'Source Sans' });
// Font.register(`${Meteor.absoluteUrl()}fonts/SourceSansPro-Semibold.ttf`, { family: 'Source Sans Semibold' });
// Font.register(`${Meteor.absoluteUrl()}fonts/SourceSansPro-It.ttf`, { family: 'Source Sans It', fontStyle: 'italic' });
// Font.register(`${Meteor.absoluteUrl()}fonts/SourceSansPro-SemiboldIt.ttf`, { family: 'Source Sans SemiboldIt' });
//
// Font.register(`${Meteor.absoluteUrl()}fonts/Montserrat-Bold.ttf`, { family: 'Montserrat Bold' });
// Font.register(`${Meteor.absoluteUrl()}fonts/Montserrat-Light.ttf`, { family: 'Montserrat Light' });
// Font.register(`${Meteor.absoluteUrl()}fonts/Montserrat-Regular.ttf`, { family: 'Montserrat' });
// Font.register(`${Meteor.absoluteUrl()}fonts/Montserrat-Italic.ttf`, { family: 'Montserrat Italic' });
// Font.register(`${Meteor.absoluteUrl()}fonts/Montserrat-Medium.ttf`, { family: 'Montserrat Medium' });
// Font.register(`${Meteor.absoluteUrl()}fonts/Montserrat-SemiBold.ttf`, { family: 'Montserrat SemiBold' });
// Font.register(`${Meteor.absoluteUrl()}fonts/Montserrat-BoldItalic.ttf`, { family: 'Montserrat BoldItalic' });
//
// Font.register(`${Meteor.absoluteUrl()}fonts/CrimsonText-Regular.ttf`, { family: 'CrimsonText' });
// Font.register(`${Meteor.absoluteUrl()}fonts/CrimsonText-Italic.ttf`, { family: 'CrimsonText Italic' });
// Font.register(`${Meteor.absoluteUrl()}fonts/CrimsonText-Bold.ttf`, { family: 'CrimsonText Bold' });
// Font.register(`${Meteor.absoluteUrl()}fonts/CrimsonText-BoldItalic.ttf`, { family: 'CrimsonText BoldItalic' });
// Font.register(`${Meteor.absoluteUrl()}fonts/CrimsonText-SemiBoldItalic.ttf`, { family: 'CrimsonText SemiBoldItalic' });
// Font.register(`${Meteor.absoluteUrl()}fonts/CrimsonText-SemiBold.ttf`, { family: 'CrimsonText SemiBold' });
//
// Font.register(`${Meteor.absoluteUrl()}fonts/Lato-Regular.ttf`, { family: 'Lato' });
// Font.register(`${Meteor.absoluteUrl()}fonts/Lato-Italic.ttf`, { family: 'Lato Italic' });
// Font.register(`${Meteor.absoluteUrl()}fonts/Lato-Bold.ttf`, { family: 'Lato Bold' });
// Font.register(`${Meteor.absoluteUrl()}fonts/Lato-BoldItalic.ttf`, { family: 'Lato BoldItalic' });
// Font.register(`${Meteor.absoluteUrl()}fonts/Lato-Medium.ttf`, { family: 'Lato Medium' });
// Font.register(`${Meteor.absoluteUrl()}fonts/Lato-Semibold.ttf`, { family: 'Lato SemiBold' });
//
// Font.register(`${Meteor.absoluteUrl()}fonts/SolomonSans-Normal.ttf`, { family: 'SolomonSans' });
// Font.register(`${Meteor.absoluteUrl()}fonts/Solomon-Sans-Normal-Italic.ttf`, { family: 'SolomonSans Italic' });
// Font.register(`${Meteor.absoluteUrl()}fonts/SolomonSans-SemiBold.ttf`, { family: 'SolomonSans SemiBold' });
// Font.register(`${Meteor.absoluteUrl()}fonts/Solomon-Sans-Bold.ttf`, { family: 'SolomonSans Bold' });
// Font.register(`${Meteor.absoluteUrl()}fonts/Solomon-Sans-Bold-Italic.ttf`, { family: 'SolomonSans BoldItalic' });
//
// Font.register(`${Meteor.absoluteUrl()}fonts/LiberationSans-Regular.ttf`, { family: 'LiberationSans' });
// Font.register(`${Meteor.absoluteUrl()}fonts/LiberationSans-Italic.ttf`, { family: 'LiberationSans Italic' });
// Font.register(`${Meteor.absoluteUrl()}fonts/LiberationSans-Bold.ttf`, { family: 'LiberationSans Bold' });
// Font.register(`${Meteor.absoluteUrl()}fonts/LiberationSans-BoldItalic.ttf`, { family: 'LiberationSans BoldItalic' });
//
// Font.register(`${Meteor.absoluteUrl()}fonts/Roboto-Regular.ttf`, { family: 'Roboto' });
// Font.register(`${Meteor.absoluteUrl()}fonts/Roboto-Medium.ttf`, { family: 'Roboto Medium' });
// Font.register(`${Meteor.absoluteUrl()}fonts/Roboto-Italic.ttf`, { family: 'Roboto Italic' });
// Font.register(`${Meteor.absoluteUrl()}fonts/Roboto-Bold.ttf`, { family: 'Roboto Bold' });
// Font.register(`${Meteor.absoluteUrl()}fonts/Roboto-BoldItalic.ttf`, { family: 'Roboto BoldItalic' });
// Font.register(`${Meteor.absoluteUrl()}fonts/Roboto-Black.ttf`, { family: 'Roboto Black' });
//
// Font.register(`${Meteor.absoluteUrl()}fonts/PtSerif.ttf`, { family: 'PtSerif' });
// Font.register(`${Meteor.absoluteUrl()}fonts/PtSerif-Italic.ttf`, { family: 'PtSerif Italic' });
// Font.register(`${Meteor.absoluteUrl()}fonts/PtSerif-Bold.ttf`, { family: 'PtSerif Bold' });
// Font.register(`${Meteor.absoluteUrl()}fonts/PtSerif-BoldItalic.ttf`, { family: 'PtSerif BoldItalic' });
// Font.register(`${Meteor.absoluteUrl()}fonts/PtSerif-Semibold.ttf`, { family: 'PtSerif SemiBold' });
//
// Font.register(`${Meteor.absoluteUrl()}fonts/HelveticaNeue.ttf`, { family: 'HelveticaNeue' });
// Font.register(`${Meteor.absoluteUrl()}fonts/HelveticaNeueIt.ttf`, { family: 'HelveticaNeue Italic' });
// Font.register(`${Meteor.absoluteUrl()}fonts/HelveticaNeue-Medium.ttf`, { family: 'HelveticaNeue Medium' });
// Font.register(`${Meteor.absoluteUrl()}fonts/HelveticaNeu-Bold.ttf`, { family: 'HelveticaNeue Bold' });
//
// Font.register(
//   'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
//   { family: 'Oswald' }
// );
