import * as converters from 'units-converter';

// Constants
import { GENDERS_MAPPING, TARGETS_MAPPING } from 'app/constants';

const TDEE_ADJUSTMENTS = {
  [TARGETS_MAPPING.DECREASE]: -400,
  [TARGETS_MAPPING.INCREASE]: 400,
};

export function fatPercentage({ abs, gender, weight }) {
  const absInInch = converters
    .length(abs)
    .from('cm')
    .to('in')
    .value();

  const weightInPound = converters
    .mass(weight)
    .from('kg')
    .to('pb')
    .value();

  if (gender === GENDERS_MAPPING.MALE) return (-98.42 + 4.15 * absInInch - 0.082 * weightInPound) / weightInPound;
  return (-76.76 + 4.15 * absInInch - 0.082 * weightInPound) / weightInPound;
}

export function lbm({ abs, gender, weight }) {
  const fatPercent = fatPercentage({ abs, gender, weight });
  return (1 - fatPercent) / weight;
}

export function bmr({ abs, gender, weight }) {
  const lbmValue = lbm({ abs, gender, weight });
  return 370 + 21.6 * lbmValue;
}

export function tdee({ abs, activityRate, gender, target, weight }) {
  const adjustRate = activityRate || TDEE_ADJUSTMENTS[target];
  const bmrValue = bmr({ abs, gender, weight });
  return adjustRate * bmrValue;
}
