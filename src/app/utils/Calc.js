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

  get fatPercentage() {
    const absInInch = converters
      .length(this.data.abs)
      .from('cm')
      .to('in').value;

    const weightInPound = converters
      .mass(this.data.weight)
      .from('kg')
      .to('lb').value;

    if (this.data.gender === GENDERS_MAPPING.MALE)
      return (-98.42 + 4.15 * absInInch - 0.082 * weightInPound) / weightInPound;

    return (-76.76 + 4.15 * absInInch - 0.082 * weightInPound) / weightInPound;
  }

  get lbm() {
    const fatPercent = this.fatPercentage;
    return (1 - fatPercent) * this.data.weight;
  }

  get bmr() {
    return 370 + 21.6 * this.lbm;
  }

  get tdee() {
    const adjustRate = this.data.activityRate || 1.55;
    return adjustRate * this.bmr;
  }

  get caloriesIn() {
    return this.tdee + TDEE_ADJUSTMENTS[this.data.target];
  }

  get macro() {
    const protein = this.data.weight * 2;
    const caloriesInValue = this.caloriesIn;
    const fat = 0.02 * caloriesInValue;
    const carb = (caloriesInValue - (protein * 4 + fat * 9)) / 4;
    return { carb, fat, protein };
  }
}

// export function fatPercentage({ abs, gender, weight }) {
//   const absInInch = converters
//     .length(abs)
//     .from('cm')
//     .to('in').value;

//   const weightInPound = converters
//     .mass(weight)
//     .from('kg')
//     .to('lb').value;

//   if (gender === GENDERS_MAPPING.MALE) return (-98.42 + 4.15 * absInInch - 0.082 * weightInPound) / weightInPound;
//   return (-76.76 + 4.15 * absInInch - 0.082 * weightInPound) / weightInPound;
// }

// export function lbm({ abs, gender, weight }) {
//   const fatPercent = fatPercentage({ abs, gender, weight });
//   return (1 - fatPercent) * weight;
// }

// export function bmr({ abs, gender, weight }) {
//   const lbmValue = lbm({ abs, gender, weight });
//   return 370 + 21.6 * lbmValue;
// }

// export function tdee({ abs, activityRate, gender, weight }) {
//   const adjustRate = activityRate || 1.55;
//   const bmrValue = bmr({ abs, gender, weight });
//   return adjustRate * bmrValue;
// }

// export function caloriesIn({ abs, gender, target, weight }) {
//   const targetTdee = tdee({ abs, gender, weight });
//   return targetTdee + TDEE_ADJUSTMENTS[target];
// }

// export function macro({ abs, gender, target, weight }) {
//   const protein = weight * 2;
//   const caloriesInValue = caloriesIn({ abs, gender, target, weight });
//   const fat = 0.02 * caloriesInValue;
//   const carb = (caloriesInValue - (protein * 4 + fat * 9)) / 4;
//   return { carb, fat, protein };
// }
