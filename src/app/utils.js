import shajs from 'sha.js';

export function computeChecksum(...args) {
  return shajs('sha1')
    .update(args.join('_'))
    .digest('hex');
}
