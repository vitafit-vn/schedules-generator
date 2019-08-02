import axios from 'axios';
import cheerio from 'cheerio'; // eslint-disable-line import/no-extraneous-dependencies
import fs from 'fs';
import _ from 'lodash';

const homeExercises = require('../data/workoutlabs/home_exercises.json');

/*
urls = $('.clearAfter.neGrid a').toArray().map(a => ({ id: a.dataset.id, url: a.href }))
names = $('.clearAfter.neGrid a span').toArray().map(span => span.innerHTML)
compoundSvgs = $('.clearAfter.neGrid a .iImgWrp img').toArray().map(img => img.src)
splitedSvgs = $('.clearAfter.neGrid a .iImgWrp .exAnim .f').toArray().map(div => div.innerHTML)

obj = urls.map(({ id, url }, index) => ({
  id,
  compound: compoundSvgs[index],
  name: names[index],
  url,
}))

JSON.stringify(obj, null, 2)
*/

async function removeWatermark(svgUrl) {
  try {
    const { data } = await axios.get(svgUrl);
    const $ = cheerio.load(data, { normalizeWhitespace: true, xmlMode: true });
    $('svg > svg').remove();
    return $.xml();
  } catch (error) {
    console.warn(error);
    return undefined;
  }
}

function buildSvgImages() {
  _.each(homeExercises, async ({ code, image_svg: svgUrl }) => {
    if (svgUrl == null) return;

    const svg = await removeWatermark(svgUrl);
    if (svg != null) fs.writeFileSync(`./src/static/images/exercises/${code}.svg`, svg);
  });
}

buildSvgImages();
