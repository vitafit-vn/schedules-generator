import _ from 'lodash';
import Handlebars from 'handlebars/runtime';

import './configs/templates.handlebars';

function registerPartials() {
  Handlebars.registerPartial('htmlHead', Handlebars.templates.html_head);
}

registerPartials();

/* eslint-disable import/prefer-default-export */

export function renderWeeklySchedule(schedule, weekNumber, userInfo) {
  const { code, byWeeks } = schedule;
  const weekSchedule = _.find(byWeeks, { weekNumber });
  return Handlebars.templates.weekly({ code, userInfo, ...weekSchedule });
}
