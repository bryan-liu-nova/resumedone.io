import styledHTML, { css as cssHTML } from 'styled-components';
import styledPDF, { css as cssPDF } from 'styled-components';

export let isHTML = true;

export let css = isHTML ? cssHTML : cssPDF;

export default isHTML ? styledHTML : styledPDF;

