import MD5 from 'md5.js';
import uuidV4 from 'uuid/v4';

export const generateFingerprintUuid = (seed) => {
  const fingerprint = new MD5().update(seed).digest('hex');

  return [
    fingerprint.slice(0, 8),
    fingerprint.slice(8, 12),
    fingerprint.slice(12, 16),
    fingerprint.slice(16, 20),
    fingerprint.slice(20, 32),
  ].join('-');
};

export const generateRandomUuid = uuidV4;

const rxp = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

export const isUuid = (value) => {
  if (typeof value !== 'string') { return false; }

  return rxp.test(value.toLowerCase());
};
