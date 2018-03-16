// @flow

import styled from 'preact-emotion';

import { tablet, desktop, leftCol } from 'pasteup/breakpoints';

import NotFoundSvg from './notfound.svg';

const NotFoundLogo = styled(NotFoundSvg)({
    display: 'block',
    height: '80%',
    maxWidth: '350px',
    width: '100%',

    [tablet]: {
        height: 'auto',
        maxWidth: '100%',
        width: '350px',
    },

    [desktop]: {
        width: '378px',
    },

    [leftCol]: {
        width: '567px',
    },
});

export default NotFoundLogo;