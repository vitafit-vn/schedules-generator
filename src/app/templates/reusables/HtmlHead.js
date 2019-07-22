import _ from 'lodash';
import PropTypes from 'prop-types';

const APPLE_TOUCH_ICON_SIZES = [
  '57x57',
  '60x60',
  '72x72',
  '76x76',
  '114x114',
  '120x120',
  '144x144',
  '152x152',
  '180x180',
];

const HtmlHead = ({ site }) => {
  const { pageTitle, publicPath } = site;
  const faviconPrefix = `${publicPath}/images/favicons`;

  return (
    <head>
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content="#fff" />
      <meta name="application-name" content={pageTitle} />
      {_.map(APPLE_TOUCH_ICON_SIZES, size => (
        <link rel="apple-touch-icon" sizes={size} href={`${faviconPrefix}/apple-touch-icon-57x57.png`} />
      ))}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content={pageTitle} />
      <link rel="icon" type="image/png" sizes="32x32" href={`${faviconPrefix}/favicon-32x32.png`} />
      <link rel="icon" type="image/png" sizes="16x16" href={`${faviconPrefix}/favicon-16x16.png`} />
      <link rel="shortcut icon" href={`${faviconPrefix}/favicon.ico`} />
      <title>{pageTitle}</title>
    </head>
  );
};

HtmlHead.propTypes = {
  site: PropTypes.shape({
    pageTitle: PropTypes.string.isRequired,
    publicPath: PropTypes.string.isRequired,
  }).isRequired,
};

export default HtmlHead;
