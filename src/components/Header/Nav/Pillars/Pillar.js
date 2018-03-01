// @flow
import styled from 'react-emotion';

import { tablet, desktop } from 'pasteup/breakpoints';
import { pillars } from 'pasteup/palette';
import { headline } from 'pasteup/fonts';

const Pillar = styled('li')({
    float: 'left',
    [desktop]: {
        width: 118,
    },
});

const Link = styled('a')(({ pillar, index }) => ({
    fontFamily: headline,
    fontWeight: 600,
    textDecoration: 'none',
    color: pillars[pillar],
    cursor: 'pointer',
    display: 'block',
    fontSize: '15.4px',
    height: 30,
    lineHeight: 1,
    padding: '0 4px',
    position: 'relative',
    overflow: 'hidden',
    borderLeft: index > 0 ? '1px solid #abc2c9' : 'none',
    [tablet]: {
        fontSize: '22px',
        height: '42px',
        paddingRight: '20px',
        paddingLeft: '5px',
    },
    [desktop]: {
        height: '48px',
    },
    ':after': {
        content: '""',
        display: 'block',
        left: 0,
        position: 'absolute',
        borderBottom: '4px solid currentColor',
        right: 0,
        bottom: '-4px',
        transition: 'transform 150ms ease-out',
    },
    ':focus:after': {
        transform: 'translateY(-4px)',
    },
    ':hover:after': {
        transform: 'translateY(-4px)',
    },
}));

export default ({ children, pillar, index }) => (
    <Pillar>
        <Link href={pillar.href} pillar={pillar.pillar} index={index}>
            {children}
        </Link>
    </Pillar>
);

// if (!props.LinkDropdown) {
//     styles[':after'] = Object.assign(
//         {},
//         styles[':after'],
//         {
//             bottom: 0,
//             content: '""',
//             display: 'block',
//             left: 0,
//             position: 'absolute',
//         },
//         {
//             borderBottom: '4px solid currentColor',
//             right: 0,
//             bottom: '-4px',
//             transition: 'transform 150ms ease-out',
//         },
//     );
// }

// if (props.isHeaderSlim) {
//     styles = Object.assign({}, styles, {
//         fontSize: '20px',
//         height: '44px',
//         lineHeight: '44px',
//         paddingTop: 0,
//         ':before': {
//             top: '17px',
//         },
//     });
// }

// if (props.isHeaderOpen && !props.LinkDropdown) {
//     styles = Object.assign({}, styles, {
//         ':focus': {
//             'text-decoration': 'underline',
//         },
//         ':hover': {
//             'text-decoration': 'underline',
//         },
//     });
// }