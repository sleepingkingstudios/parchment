import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import findSpellRequest from './findSpell';

jest.mock('react');
jest.mock('react-redux');

const dispatch = jest.fn();

useDispatch.mockImplementation(() => dispatch);
useEffect.mockImplementation(fn => fn());

describe('Spells findSpell findSpellRequest()', () => {
  const id = '00000000-0000-0000-0000-000000000000';

  it('should be a function', () => {
    expect(typeof findSpellRequest).toEqual('function');
  });

  it('should return a function', () => {
    const findSpell = findSpellRequest(() => jest.fn());

    expect(typeof findSpell).toEqual('function');
  });

  it('should call useEffect()', () => {
    const findSpell = findSpellRequest(() => jest.fn());

    findSpell(id);

    expect(useEffect).toHaveBeenCalled();
  });

  it('should call performRequest with the id and dispatch', () => {
    const innerRequest = jest.fn();
    const outerRequest = jest.fn(() => innerRequest);
    const findSpell = findSpellRequest(outerRequest);

    findSpell(id);

    expect(outerRequest).toHaveBeenCalledWith({ wildcards: { id } });
    expect(innerRequest).toHaveBeenCalledWith(dispatch);
  });
});
