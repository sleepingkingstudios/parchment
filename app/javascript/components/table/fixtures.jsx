import React from 'react';

import { humanizeList } from '../../utils/array';
import { valueOrDefault } from '../../utils/object';

export const LaunchButton = ({ message }) => (
  <button type="button">{ valueOrDefault(message, 'Launch')}</button>
);

export const formatCrewCapacity = (item) => {
  const count = item.crewCapacity;

  if (count === 1) { return '1 Kerbal'; }

  return `${count} Kerbals`;
};

export const formatExperiments = item => (
  humanizeList(item.experiments, { default: 'None' })
);

export const columns = [
  {
    label: 'Name',
    prop: 'name',
  },
  {
    label: 'Crew Capacity',
    prop: 'crewCapacity',
    value: formatCrewCapacity,
  },
  {
    label: 'Experiments',
    prop: 'experiments',
    value: formatExperiments,
  },
  {
    label: 'Retired',
    prop: 'retired',
  },
  {
    label: '',
    prop: 'launch',
    value: LaunchButton,
  },
];

export const rocketsData = [
  {
    id: '83f5e9e8-92df-4203-bc2e-4381370c2186',
    name: 'Apprentice',
    crewCapacity: 1,
    experiments: [
      'Crew Report',
      'Mystery Goo',
      'Temperature Scan',
      'Pressure Scan',
    ],
    retired: true,
  },
  {
    id: '4bd7454c-3b15-4047-8d57-dfa831dac58e',
    name: 'Sorcerer',
    crewCapacity: 2,
    experiments: [
      'Crew Report',
      'Materials Study',
      'Mystery Goo',
      'Temperature Scan',
      'Pressure Scan',
    ],
    retired: false,
  },
  {
    id: '2fead083-d9ea-4f04-949e-d8c00e800cbb',
    name: 'Warlock',
    crewCapacity: 3,
    experiments: [
      'Crew Report',
      'Materials Study',
      'Mystery Goo',
      'Temperature Scan',
      'Pressure Scan',
      'Gravity Scan',
    ],
    retired: false,
  },
];
