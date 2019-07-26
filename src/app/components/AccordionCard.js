import PropTypes from 'prop-types';

const AccordionCard = ({ children, heading, index, parentId, peakAt }) => {
  /**
   * `peakAt` == `null` or out of range: No peaks
   * `peakAt` in range: intially show the content at `peakAt` index
   */
  const ariaExpanded = index === peakAt ? 'true' : 'false';
  const headingCollapsed = index === peakAt ? '' : 'collapsed';
  const contentShown = index === peakAt ? 'show' : '';

  return (
    <div className="card">
      <div className="card-header" id={`schedule-heading-${index}`}>
        <button
          aria-controls={`schedule-collapse-${index}`}
          aria-expanded={ariaExpanded}
          className={`btn btn-link ${headingCollapsed} mb-0`}
          data-target={`#schedule-collapse-${index}`}
          data-toggle="collapse"
          type="button"
        >
          {heading}
        </button>
      </div>
      <div
        aria-labelledby={`schedule-heading-${index}`}
        className={`collapse ${contentShown}`}
        data-parent={`#${parentId}`}
        id={`schedule-collapse-${index}`}
      >
        {children}
      </div>
    </div>
  );
};

AccordionCard.propTypes = {
  children: PropTypes.any.isRequired,
  heading: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  parentId: PropTypes.string.isRequired,
  peakAt: PropTypes.number,
};

AccordionCard.defaultProps = {
  peakAt: undefined,
};

export default AccordionCard;
