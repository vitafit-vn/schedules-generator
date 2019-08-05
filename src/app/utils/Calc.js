import _ from 'lodash';
import * as converters from 'units-converter';

// Constants
import { GENDERS_MAPPING, TARGETS_MAPPING } from 'app/constants';

const TDEE_ADJUSTMENTS = {
  [TARGETS_MAPPING.DECREASE]: -400,
  [TARGETS_MAPPING.INCREASE]: 400,
};

const TARGET_BMI = 20;
const TARGET_FAT_PERCENTAGE = 0.2;

function computeFatPercentage({ abs, gender, weight }) {
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

function computeMacro({ caloriesIn, weight }) {
  const protein = weight * 2;
  const fat = 0.02 * caloriesIn;
  const carb = (caloriesIn - (protein * 4 + fat * 9)) / 4;
  return { carb, fat, protein };
}

function calTargetWeight(height) {
  const heightInMeter = converters
    .length(height)
    .from('cm')
    .to('m').value;

  return heightInMeter * heightInMeter * TARGET_BMI;
}

function computeAllData({ abs, activityRate, gender, height, target, weight }) {
  const fatPercentage = computeFatPercentage({ abs, gender, weight });
  const lbm = (1 - fatPercentage) * weight;
  const bmr = 370 + 21.6 * lbm;
  const currentTdee = activityRate * bmr;
  const targetTdee = 1.55 * bmr;
  const caloriesIn = targetTdee + TDEE_ADJUSTMENTS[target];
  const macro = computeMacro({ caloriesIn, weight });
  const targetWeight = calTargetWeight(height);
  const weightDelta = weight * fatPercentage - targetWeight * TARGET_FAT_PERCENTAGE;

  return { bmr, caloriesIn, currentTdee, fatPercentage, lbm, macro, targetTdee, targetWeight, weightDelta };
}

function checkObjectContains(object, value) {
  const allValues = _.values(object);
  if (_.includes(allValues, value)) return value;
  return object[allValues[0]];
}

export default class Calc {
  constructor(params) {
    const abs = parseFloat(params.abs);
    const activityRate = parseFloat(params.activityRate);
    const gender = checkObjectContains(GENDERS_MAPPING, params.gender);
    const height = parseFloat(params.height);
    const target = checkObjectContains(TARGETS_MAPPING, params.target);
    const weight = parseFloat(params.weight);

    Object.assign(this, { abs, activityRate, gender, height, target, weight });
    this.computedValues = computeAllData({ abs, activityRate, gender, height, target, weight });
  }
}
