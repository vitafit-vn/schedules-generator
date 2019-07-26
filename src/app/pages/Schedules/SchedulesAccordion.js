import _ from 'lodash';
import PropTypes from 'prop-types';

const SchedulesAccordion = ({ schedules }) => {
  if (_.isEmpty(schedules)) return;

  return (
    <div className="accordion mt-3 mx-auto" id="schedules-accordion">
      {_.map(schedules, ({ name, html }, index) => (
        <div className="card">
          <div className="card-header" id={`schedule-heading-${index}`}>
            <h2 className="mb-0">
              <button
                aria-controls={`schedule-collapse-${index}`}
                aria-expanded={index === 0 ? 'true' : 'false'}
                className={`btn btn-link ${index > 0 ? 'collapsed' : ''}`}
                data-target={`"#schedule-collapse-${index}"`}
                data-toggle="collapse"
                type="button"
              >
                {name}
              </button>
            </h2>
          </div>
          <div
            aria-labelledby={`schedule-heading-${index}`}
            className={`collapse ${index === 0 ? 'show' : ''}`}
            data-parent="#schedules-accordion"
            id={`schedule-collapse-${index}`}
          >
            <div className="card-body" dangerouslySetInnerHTML={{ __html: html }}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

SchedulesAccordion.propTypes = {
  schedules: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      html: PropTypes.string.isRequired,
    })
  ),
};

export default SchedulesAccordion;
