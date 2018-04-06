import { breakpoints } from "./theme";

function globalCss(theme) {
    return `   
        html, body, div, span, applet, object, iframe,
        h1, h2, h3, h4, h5, h6, p, blockquote, pre,
        a, abbr, acronym, address, big, cite, code,
        del, dfn, em, img, ins, kbd, q, s, samp,
        small, strike, strong, sub, sup, tt, var,
        b, u, i, center,
        dl, dt, dd, ol, ul, li,
        fieldset, form, label, legend,
        table, caption, tbody, tfoot, thead, tr, th, td,
        article, aside, canvas, details, embed, 
        figure, figcaption, footer, header, hgroup, 
        menu, nav, output, ruby, section, summary,
        time, mark, audio, video {
            margin: 0;
            padding: 0;
            border: 0;
            font-size: 14px;
            font: inherit;
            vertical-align: baseline;
        }
        /* HTML5 display-role reset for older browsers */
        article, aside, details, figcaption, figure, 
        footer, header, hgroup, menu, nav, section {
            display: block;
        }
        html{
            width: 100%;
            overflow-x: hidden;
        }
        html, body {
            height: 100%;
            line-height: 1;
        }
        img{
            max-width: 100%;
        }
        ol, ul {
            list-style: none;
        }
        blockquote, q {
            quotes: none;
        }
        blockquote:before, blockquote:after,
        q:before, q:after {
            content: '';
            content: none;
        }
        table {
            border-collapse: collapse;
            border-spacing: 0;
        }
        *{
            box-sizing: inherit;
        }
        body {
            background: ${theme.body.background};
            color: ${theme.body.color};
            font-family: ${theme.body.fontFamily};
            margin: 0;
            box-sizing: border-box;
            -webkit-font-smoothing: antialiased;
	        -moz-osx-font-smoothing: grayscale;
        }
        h1,h2,h3,h4,h5,h6,button {
            text-transform: uppercase;
        }
        h1,h2,h3,h4,h5,h6,p,hr {
            margin: 0 0 ${theme.paragraph.margin}em;
        }
        p {
            margin: ${theme.paragraph.margin}rem 0 ${theme.paragraph.margin *
        4}rem 0;
            line-height: 1.5;
        }
        strong, b{
            font-weight: bold;
        }
        small{
            font-size: 0.8em;
        }

        /* ----- React Animation Styles ----- */

        // SlideUp
        .slideUp-enter {
            opacity: 0;
            transform: translateY(-50%);
        }
        .slideUp-enter.slideUp-enter-active {
            opacity: 1;
            transform: translateY(0%);
        }
        .slideUp-leave {
            opacity: 1;
            transform: translateY(0%);
        }
        .slideUp-leave.slideUp-leave-active {
            opacity: 0;
            transform: translateY(-50%);
        }
        // transition
        .slideUp-enter,
        .slideUp-leave {
            transition: transform 250ms ease-in, opacity 250ms ease-in;
        }

        // slideLeft
        .slideLeft-enter {
            transform: translateX(-100%);
        }

        .slideLeft-enter.slideLeft-enter-active {
            transform: translateX(0);
            transition: all 250ms ease-in;
        }

        .slideLeft-leave {
            transform: translateX(0);
        }

        .slideLeft-leave.slideLeft-leave-active {
            transform: translateX(100%);
            transition: all 250ms ease-in;
        }

        // slideRight
        .slideRight-enter {
            transform: translateX(100%);
        }

        .slideRight-enter.slideRight-enter-active {
            transform: translateX(0);
            transition: all 250ms ease-in;
        }

        .slideRight-leave {
            transform: translateX(0);
        }

        .slideRight-leave.slideRight-leave-active {
            transform: translateX(-100%);
            transition: all 250ms ease-in;
        }

        /* ----- Table Styles ----- */

        table, td, th {    
            text-align: left;
        }

        th, td {
            padding: ${theme.table.padding / 2}em;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;    
        }
        
        thead{
            font-weight: bold;
            border-bottom: ${theme.table.border};
            text-transform: ${theme.table.textTransform};
        }

        tbody tr:nth-child(odd){
            background-color: ${theme.table.stripeColor};
        }

        /* ----- Anchor Styles ----- */
        a{
            color: ${theme.anchor.color};
            font-weight: ${theme.anchor.fontWeight};
            text-decoration: ${theme.anchor.textDecoration};
            
        }

        /* ----- Heading Styles ----- */
        ${headings()}    


        /* ----- Utility Styles (used in HTML embedded in posts) ----- */
        .floatLeft {
            float: left;
            margin-right: 1em;
        } 
        .floatRight {
            float: right;
            margin-left: 1em;
        }   
        .width25{
            max-width: 25%;
        }   
        .width50{
            max-width: 50%;
        }   
        .width75{
            max-width: 75%;
        }    

        .postContent blockquote {
            padding: 2rem 2rem 1.2rem 2rem;
            background: #eaeaea;
            font-size: 2rem;
        }
    `;
}

function headings() {
    const h1Size = 2;
    const breakpoint = ["large", "medium", "small"];
    let string = new String();

    for (var i = 1; i < 7; i++) {
        let size = h1Size / (i / 1.2);
        string = string.concat(`
            h${i} {
                font-weight: bold;
                font-size: ${size}rem;
                ${breakpoint.map(
                    breakpoint => `@media (min-width: ${
                        breakpoints[breakpoint]
                    }px) {
                        font-size: ${size * 2}rem;
                    }`
                )}
            }
        `);
    }

    return string;
}

export default globalCss;
