import _ from 'lodash';
import PropTypes from 'prop-types';

const YoutubeLink = ({ name, url }) => {
  if (_.isEmpty(url)) return null;

  return (
    <a href={url} rel="noopener noreferrer" target="_blank">
      <img
        alt={`${name} video url`}
        className="mb-1 ml-2"
        src={`${process.env.PUBLIC_PATH}/images/youtube-logo.png`}
        srcSet={`${process.env.PUBLIC_PATH}/images/youtube-logo.svg`}
        width={20}
      />
    </a>
  );
};

YoutubeLink.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string,
};

export default YoutubeLink;
