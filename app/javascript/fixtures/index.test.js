import { readFileSync, readdirSync } from 'fs';
import path from 'path';
import { stringify } from 'yaml';

import { load } from './index';
import { camelizeKeys } from '../utils/object';
import { underscore } from '../utils/string';

jest.mock('fs');

const rootDir = path.join(__dirname, '..', '..', '..');
const widgetsData = [
  {
    id: '00000000-0000-0000-0000-000000000000',
    name: 'Gadget',
    manufacturer_id: '00000000-0000-0000-0000-100000000000',
  },
  {
    id: '00000000-0000-0000-0000-000000000001',
    name: 'Sprocket',
    manufacturer_id: '00000000-0000-0000-0000-100000000000',
  },
  {
    id: '00000000-0000-0000-0000-000000000002',
    name: 'Whatsit',
    manufacturer_id: '00000000-0000-0000-0000-100000000000',
  },
];
const expectedData = camelizeKeys(widgetsData);

describe('Fixtures', () => {
  describe('load()', () => {
    const resourceName = 'widgets';

    it('should be a function', () => {
      expect(typeof load).toEqual('function');
    });

    describe('with a resource name', () => {
      describe('when the data file exists', () => {
        const filePath = path.join(
          rootDir,
          'data',
          'fixtures',
          `${resourceName}.yml`,
        );

        beforeEach(() => {
          readFileSync.mockImplementation((pathToRead) => {
            if (pathToRead !== filePath) { throw (new Error('not found')); }

            return stringify(widgetsData);
          });
        });

        it('should load the fixtures', () => {
          const loaded = load(resourceName);

          expect(loaded).toEqual(expectedData);
        });
      });

      describe('when the data directory exists with individual files', () => {
        const dataFiles = widgetsData.reduce((obj, widgetData) => {
          const fileName = `${underscore(widgetData.name)}.yml`;
          const filePath = path.join(
            rootDir,
            'data',
            'fixtures',
            resourceName,
            fileName,
          );
          const intermediate = {};

          intermediate[filePath] = widgetData;

          return Object.assign({}, obj, intermediate);
        }, {});
        const dataFileNames = Object.keys(dataFiles).map((filePath) => {
          const segments = filePath.split('/');

          return segments[segments.length - 1];
        });
        const dirPath = path.join(rootDir, 'data', 'fixtures', resourceName);

        beforeEach(() => {
          readdirSync.mockImplementation((pathToRead) => {
            if (pathToRead !== dirPath) { throw (new Error('not found')); }

            return dataFileNames;
          });

          readFileSync.mockImplementation((pathToRead) => {
            if (!dataFiles[pathToRead]) { throw (new Error('not found')); }

            return stringify(dataFiles[pathToRead]);
          });
        });

        it('should load the fixtures', () => {
          const loaded = load(resourceName);

          expect(loaded).toEqual(expectedData);
        });
      });

      describe('when the data directory exists with collection files', () => {
        const dataFiles = widgetsData.reduce((obj, widgetData) => {
          const fileName = `${underscore(widgetData.name)}.yml`;
          const filePath = path.join(
            rootDir,
            'data',
            'fixtures',
            resourceName,
            fileName,
          );
          const intermediate = {};

          intermediate[filePath] = widgetData;

          return Object.assign({}, obj, intermediate);
        }, {});
        const dataFileNames = Object.keys(dataFiles).map((filePath) => {
          const segments = filePath.split('/');

          return segments[segments.length - 1];
        });
        const dirPath = path.join(rootDir, 'data', 'fixtures', resourceName);

        beforeEach(() => {
          readdirSync.mockImplementation((pathToRead) => {
            if (pathToRead !== dirPath) { throw (new Error('not found')); }

            return dataFileNames;
          });

          readFileSync.mockImplementation((pathToRead) => {
            if (!dataFiles[pathToRead]) { throw (new Error('not found')); }

            return stringify([dataFiles[pathToRead]]);
          });
        });

        it('should load the fixtures', () => {
          const loaded = load(resourceName);

          expect(loaded).toEqual(expectedData);
        });
      });
    });

    describe('with a resource name and an environment', () => {
      const environment = 'secrets';

      describe('when the data file exists', () => {
        const filePath = path.join(
          rootDir,
          'data',
          environment,
          `${resourceName}.yml`,
        );

        beforeEach(() => {
          readFileSync.mockImplementation((pathToRead) => {
            if (pathToRead !== filePath) { throw (new Error('not found')); }

            return stringify(widgetsData);
          });
        });

        it('should load the fixtures', () => {
          const loaded = load(resourceName, { environment });

          expect(loaded).toEqual(expectedData);
        });
      });

      describe('when the data directory exists with individual files', () => {
        const dataFiles = widgetsData.reduce((obj, widgetData) => {
          const fileName = `${underscore(widgetData.name)}.yml`;
          const filePath = path.join(
            rootDir,
            'data',
            environment,
            resourceName,
            fileName,
          );
          const intermediate = {};

          intermediate[filePath] = widgetData;

          return Object.assign({}, obj, intermediate);
        }, {});
        const dataFileNames = Object.keys(dataFiles).map((filePath) => {
          const segments = filePath.split('/');

          return segments[segments.length - 1];
        });
        const dirPath = path.join(rootDir, 'data', environment, resourceName);

        beforeEach(() => {
          readdirSync.mockImplementation((pathToRead) => {
            if (pathToRead !== dirPath) { throw (new Error('not found')); }

            return dataFileNames;
          });

          readFileSync.mockImplementation((pathToRead) => {
            if (!dataFiles[pathToRead]) { throw (new Error('not found')); }

            return stringify(dataFiles[pathToRead]);
          });
        });

        it('should load the fixtures', () => {
          const loaded = load(resourceName, { environment });

          expect(loaded).toEqual(expectedData);
        });
      });

      describe('when the data directory exists with collection files', () => {
        const dataFiles = widgetsData.reduce((obj, widgetData) => {
          const fileName = `${underscore(widgetData.name)}.yml`;
          const filePath = path.join(
            rootDir,
            'data',
            environment,
            resourceName,
            fileName,
          );
          const intermediate = {};

          intermediate[filePath] = widgetData;

          return Object.assign({}, obj, intermediate);
        }, {});
        const dataFileNames = Object.keys(dataFiles).map((filePath) => {
          const segments = filePath.split('/');

          return segments[segments.length - 1];
        });
        const dirPath = path.join(rootDir, 'data', environment, resourceName);

        beforeEach(() => {
          readdirSync.mockImplementation((pathToRead) => {
            if (pathToRead !== dirPath) { throw (new Error('not found')); }

            return dataFileNames;
          });

          readFileSync.mockImplementation((pathToRead) => {
            if (!dataFiles[pathToRead]) { throw (new Error('not found')); }

            return stringify([dataFiles[pathToRead]]);
          });
        });

        it('should load the fixtures', () => {
          const loaded = load(resourceName, { environment });

          expect(loaded).toEqual(expectedData);
        });
      });
    });
  });
});
