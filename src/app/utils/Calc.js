import * as converters from 'units-converter';

// Constants
import { GENDERS_MAPPING, TARGETS_MAPPING } from 'app/constants';

const TDEE_ADJUSTMENTS = {
  [TARGETS_MAPPING.DECREASE]: -400,
  [TARGETS_MAPPING.INCREASE]: 400,
};

export default class Calc {
  constructor({ abs, activityRate, gender, target, weight }) {
    this.data = { abs, activityRate, gender, target, weight };
  }

  updateData = ({ abs, activityRate, gender, target, weight }) => {
    delete this.data;
    this.data = { abs, activityRate, gender, target, weight };
  };

  get fatPercentage() {
    const { abs, gender, weight } = this.data;

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

  get lbm() {
    return (1 - this.fatPercentage) * this.data.weight;
  }

  get bmr() {
    return 370 + 21.6 * this.lbm;
  }

  get currentTdee() {
    return this.data.activityRate * this.bmr;
  }

  get targetTdee() {
    return 1.55 * this.bmr;
  }

  get caloriesIn() {
    return this.targetTdee + TDEE_ADJUSTMENTS[this.data.target];
  }

  get macro() {
    const protein = this.data.weight * 2;
    const caloriesInValue = this.caloriesIn;
    const fat = 0.02 * caloriesInValue;
    const carb = (caloriesInValue - (protein * 4 + fat * 9)) / 4;
    return { carb, fat, protein };
  }
}
