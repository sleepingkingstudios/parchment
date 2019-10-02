import { readFileSync, readdirSync } from 'fs';
import path from 'path';
import { parse } from 'yaml';

import {
  camelizeKeys,
  valueOrDefault,
} from '../utils/object';

const rootDir = path.join(__dirname, '..', '..', '..');

const readAndParseFile = (filePath) => {
  try {
    const raw = readFileSync(filePath);
    const parsed = parse(raw.toString());

    return parsed;
  } catch (err) {
    return null;
  }
};

const readDataFile = ({ environment, resourceName }) => {
  const filePath = path
    .join(rootDir, 'data', environment, `${resourceName}.yml`);

  return readAndParseFile(filePath);
};

const readDataDir = ({ environment, resourceName }) => {
  const dirPath = path.join(rootDir, 'data', environment, resourceName);
  let dirFiles;

  try {
    dirFiles = readdirSync(dirPath);
  } catch (err) {
    return null;
  }

  const parsed = [];

  dirFiles.forEach((fileName) => {
    const filePath = path.join(dirPath, fileName);

    if (fileName[0] !== '_') { parsed.push(readAndParseFile(filePath)); }
  });

  const data = parsed.reduce((ary, items) => (
    Array.isArray(items) ? ary.concat(items) : ary.concat([items])
  ), []);

  return data;
};

/* eslint-disable-next-line import/prefer-default-export */
export const load = (resourceName, options = {}) => {
  const environment = valueOrDefault(options.environment, 'fixtures');
  let data;

  data = readDataFile({ environment, resourceName });

  if (data) { return camelizeKeys(data); }

  data = readDataDir({ environment, resourceName });

  if (data) { return camelizeKeys(data); }

  return null;
};
