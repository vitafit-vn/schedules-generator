import shajs from 'sha.js';

/* eslint-disable import/prefer-default-export */

export function computeChecksum(...args) {
  return shajs('sha1')
    .update(args.join('_'))
    .digest('hex');
}
