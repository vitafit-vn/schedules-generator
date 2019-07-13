import fs from 'fs';
import _ from 'lodash';
import Handlebars from 'handlebars/runtime';

import './configs/templates.handlebars';

function registerPartials() {
  // Handlebars.registerPartial('chartImage', Handlebars.templates.chart_image);
  // Handlebars.registerPartial('clientInfo', Handlebars.templates.client_info);
  // Handlebars.registerPartial('footer', Handlebars.templates.footer);
  // Handlebars.registerPartial('generalReadings', Handlebars.templates.general_readings);
  // Handlebars.registerPartial('header', Handlebars.templates.header);
  // Handlebars.registerPartial('htmlHead', Handlebars.templates.html_head);
  // Handlebars.registerPartial('opportunities', Handlebars.templates.opportunities);
  // Handlebars.registerPartial('questions', Handlebars.templates.questions);
}

registerPartials();

/* eslint-disable import/prefer-default-export */

export function renderWeeklySchedule(schedule) {
  const { code, byWeeks } = schedule;

  _.each(byWeeks, ({ weekNumber, weekDays }) => {
    const fileName = `${code}_${weekNumber}`;
    const html = Handlebars.templates.weekly({ code, weekNumber, weekDays });
    fs.writeFileSync(`./outputs/weekly/${fileName}.html`, html, 'utf-8');
  });
}
