import { breakpoints, colors } from "./theme";

function globalCss(theme) {
    return `   
        @import url("https://use.typekit.net/xsi0mvc.css");

        @font-face {
            font-family: 'Gotham';
            src: url('/fonts/Gotham-Medium.woff2') format('woff2'),
                url('/fonts/Gotham-Medium.woff') format('woff');
            font-weight: normal;
            font-style: normal;
        }
        
        @font-face {
            font-family: 'Gotham';
            src: url('/fonts/Gotham-Bold.woff2') format('woff2'),
                url('/fonts/Gotham-Bold.woff') format('woff');
            font-weight: bold;
            font-style: normal;
        }

        @font-face {
            font-family: 'Gotham';
            src: url('/fonts/Gotham-Black.woff2') format('woff2'),
                url('/fonts/Gotham-Black.woff') format('woff');
            font-weight: 800;
            font-style: normal;
        }

        @font-face {
            font-family: 'Gotham';
            src: url('/fonts/Gotham-Light.woff2') format('woff2'),
                url('/fonts/Gotham-Light.woff') format('woff');
            font-weight: lighter;
            font-style: normal;
        }

        @font-face {
            font-family: 'Gotham';
            src: url('/fonts/Gotham-Ultra.woff2') format('woff2'),
                url('/fonts/Gotham-Ultra.woff') format('woff');
            font-weight: 900;
            font-style: normal;
        }

        @font-face {
            font-family: 'Avenir';
            src: url('/fonts/Avenir-Medium.woff2') format('woff2'),
            url('/fonts/Avenir-Medium.woff') format('woff');
            font-weight: normal;
            font-style: normal;
        }

        @font-face {
            font-family: 'Avenir';
            src: url('/fonts/Avenir-Black.woff2') format('woff2'),
                url('/fonts/Avenir-Black.woff') format('woff');
            font-weight: bold;
            font-style: normal;
        }

        @font-face {
            font-family: 'Avenir';
            src: url('/fonts/Avenir-Light.woff2') format('woff2'),
                url('/fonts/Avenir-Light.woff') format('woff');
            font-weight: lighter;
            font-style: normal;
        }        

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
        h1,h2,h3,h4,h5,h6{
            font-family: ${theme.headings.fontFamily};
        }
        h1,h2,h3,h4,h5,h6,button {
            text-transform: uppercase;
        }
        h1,h2,h3,h4,h5,h6,p,hr {
            margin: 0 0 ${theme.paragraph.margin}rem;
        }
        p {
            margin: ${theme.paragraph.margin}rem 0 ${
        theme.paragraph.margin
    }rem 0;
            line-height: 1.8;
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

        button {
            font-family: Gotham, Avenir, sans-serif;
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
            display:block;
            padding: 15px 20px 15px 30px;
            margin: 0 0 2rem;
            position: relative;
            //font-family: "Adobe Caslon Pro", Georgia, serif;
            font-size: 2rem;
            color: ${colors.background};
          

            &:after{
                font-family: "Adobe Caslon Pro", Georgia, serif;
                content: '\\201C'; /*Unicode for Left Double Quote*/
                font-size: 200px;
                font-weight: bold;
                position: absolute;
                left: 10px;
                top: 0px;
                color: #ddd;
                z-index: 0;
            }

            p{
                margin-bottom: 0;
                line-height: 1;
                position: relative;
                z-index: 1;
            }
        }

        /* ----- CMS content style ----- */
        .cms-content{
            color: ${colors.lightGray};

            h1, h2, h3, h4, h5, h6{
                font-weight: 900;
                color: ${colors.black};
                margin: 4rem 0 1rem;
                &:first-child{
                    margin: 0 0 1rem;
                    
                }
            }
            h1{
                font-size: 1.2rem;
            }
            h2{
                font-size: 1rem;
            }
            p{
                margin: 0 0 2rem;
            }
            a{
                color: inherit;
            }
            a[href]{
                text-decoration: underline;
            }
            ul{
                margin-left: 25px;
                list-style-type: none;
                > li{
                    line-height: 1.8;
                    text-indent: -25px;
                    margin-bottom: 10px;
                    &:before{
                        content: "— ";
                        margin-right: 5px;
                    }
                }
            }
            .highlighted{
                strong{
                    display: block;
                    margin-bottom: 1rem;
                }
               background: #eeeeee
               padding: 30px 30px 0;
               overflow: hidden;
            }
        }

        .work-cms-content{
            ul{
                margin-left: 25px;
                list-style-type: none;
                > li{
                    line-height: 1.8;
                    text-indent: -25px;
                    margin-bottom: 20px;
                    &:before{
                        content: "— ";
                        margin-right: 5px;
                    }
                }
            }
        }

        /* ----- Map Styles ----- */
        div.leaflet-container {
            background: ${colors.background};
        }

        
        /* ----- Cookie (One trust) Style Overides ----- */
        div .optanon-show-settings-popup-wrapper  {
            display: inline;
        }
        
        div .optanon-show-settings-button  {
            display: inline;
        }

        
        div .optanon-show-settings-popup-wrapper .optanon-show-settings-left {
            display: none;
        }
        div .optanon-show-settings-popup-wrapper .optanon-show-settings-middle {
            display: inline;
            background: none !important;
            border: none;
            float: none;
            a.optanon-show-settings {
                color: ${theme.anchor.color} !important;
                font-size: 14px;
                font-weight: bold;
            }
        }
        div .optanon-show-settings-popup-wrapper .optanon-show-settings-right {
            display: none;
        }

        /* ----- Iframe Styles ----- */
        iframe{
            max-width: 100%;
        }

        .parallax-custom-bg{
            width: 100vw;
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
