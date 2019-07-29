import _ from 'lodash';
import * as converters from 'units-converter';

// Constants
import { GENDERS_MAPPING, TARGETS_MAPPING } from 'app/constants';

const TDEE_ADJUSTMENTS = {
  [TARGETS_MAPPING.DECREASE]: -400,
  [TARGETS_MAPPING.INCREASE]: 400,
};

function calcFatPercentage({ abs, gender, weight }) {
  const absInInch = converters
    .length(abs)
    .from('cm')
    .to('in').value;

  const weightInPound = converters
    .mass(weight)
    .from('kg')
    .to('lb').value;

  const prefix = gender === GENDERS_MAPPING.MALE ? -98.42 + 4.15 * absInInch : -76.76 + 4.15 * absInInch;

  return (prefix - 0.082 * weightInPound) / weightInPound;
}

function calcMacro({ caloriesIn, weight }) {
  const protein = weight * 2;
  const fat = 0.02 * caloriesIn;
  const carb = (caloriesIn - (protein * 4 + fat * 9)) / 4;
  return { carb, fat, protein };
}

function calcAllData({ abs, activityRate, gender, target, weight }) {
  const fatPercentage = calcFatPercentage({ abs, gender, weight });
  const lbm = (1 - fatPercentage) * weight;
  const bmr = 370 + 21.6 * lbm;
  const currentTdee = activityRate * bmr;
  const targetTdee = 1.55 * bmr;
  const caloriesIn = targetTdee + TDEE_ADJUSTMENTS[target];
  const macro = calcMacro({ caloriesIn, weight });

  return { bmr, caloriesIn, currentTdee, fatPercentage, lbm, macro, targetTdee };
}

export default class Calc {
  constructor(params) {
    const abs = parseFloat(params.abs);
    const activityRate = parseFloat(params.activityRate);
    const gender = _.valuesIn(GENDERS_MAPPING, params.gender) ? params.gender : GENDERS_MAPPING.FEMALE;
    const target = _.valuesIn(TARGETS_MAPPING, params.target) ? params.target : TARGETS_MAPPING.DECREASE;
    const weight = parseFloat(params.weight);
    console.debug(params, { abs, activityRate, gender, target, weight });

    Object.assign(this, calcAllData({ abs, activityRate, gender, target, weight }));
  }
}
