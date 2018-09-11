type Pillar = 'news' | 'opinion' | 'sport' | 'culture' | 'lifestyle';


// shared type declarations
interface LinkType {
    title: string,
    longTitle: string,
    url: string,
    children?: Array<LinkType>,
    mobileOnly?: boolean,
    pillar?: Pillar,
}

interface PillarType extends LinkType {
    pillar: Pillar
}

interface NavType {
    pillars: Array<PillarType>,
    otherLinks: Array<LinkType>,
    brandExtensions: Array<LinkType>,
    subNavSections?: {
        parent: LinkType,
        links: Array<LinkType>,
    },
}
interface CAPIType {
    headline: string,
    standfirst: string,
    main: string,
    body: string,
    author: string,
    webPublicationDate: Date,
    sectionName: string,
}


// 3rd party type declarations
declare module "emotion-server" {
    export const extractCritical: any;
}
declare module "dompurify" {
    const createDOMPurify: any;
    export default createDOMPurify;
}
declare module "compose-function" {
    const compose: any;
    export default compose;
}