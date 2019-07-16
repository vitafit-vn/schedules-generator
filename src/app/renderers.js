import _ from 'lodash';
import Handlebars from 'handlebars/runtime';

import './configs/templates.handlebars';

function registerPartials() {
  Handlebars.registerPartial('htmlHead', Handlebars.templates.html_head);
}

registerPartials();

/* eslint-disable import/prefer-default-export */

export function renderWeeklySchedule(weeklyData, userInfo) {
  const { weekDays } = weeklyData;
  return Handlebars.templates.weekly({ weekDays, userInfo });
}
