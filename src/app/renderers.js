// import _ from 'lodash';
import Handlebars from 'handlebars/runtime';

import './configs/templates.handlebars';

function registerPartials() {
  Handlebars.registerPartial('htmlHead', Handlebars.templates.html_head);
}

registerPartials();

const SITE_CONFIGS = {
  pageTitle: process.env.PAGE_TITLE,
  publicPath: process.env.PUBLIC_PATH,
};

/* eslint-disable import/prefer-default-export */

export function renderWeeklySchedule({ userInfo, weekdays }) {
  return Handlebars.templates.weekly({ userInfo, weekdays, site: SITE_CONFIGS });
}
