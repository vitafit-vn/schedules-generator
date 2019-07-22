import PropTypes from 'prop-types';

const HtmlHead = ({ site }) => (
  <head>
    <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <meta name="apple-mobile-web-app-title" content={site.pageTitle} />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="theme-color" content="#000" />
    <meta name="application-name" content={site.pageTitle} />
    <title>{site.pageTitle}</title>
  </head>
);

HtmlHead.propTypes = {
  site: PropTypes.shape({
    pageTitle: PropTypes.string.isRequired,
    publicPath: PropTypes.string.isRequired,
  }).isRequired,
};

export default HtmlHead;
