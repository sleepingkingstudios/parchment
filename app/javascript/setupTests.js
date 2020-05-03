/* eslint import/no-extraneous-dependencies: "off" */

import { configure } from 'enzyme';
import 'jest-enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { LocalStorage } from 'node-localstorage';

configure({ adapter: new Adapter() });

global.localStorage = new LocalStorage('./tmp/localStorage');
