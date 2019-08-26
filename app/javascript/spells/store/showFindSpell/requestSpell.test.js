import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import findSpellRequest from './requestSpell';

jest.mock('react');
jest.mock('react-redux');

const dispatch = jest.fn();

useDispatch.mockImplementation(() => dispatch);
useEffect.mockImplementation(fn => fn());

describe('ShowFindSpell store requestSpell()', () => {
  const id = '00000000-0000-0000-0000-000000000000';

  it('should be a function', () => {
    expect(typeof findSpellRequest).toEqual('function');
  });

  it('should return a function', () => {
    const requestSpell = findSpellRequest(() => jest.fn());

    expect(typeof requestSpell).toEqual('function');
  });

  it('should call useEffect()', () => {
    const requestSpell = findSpellRequest(() => jest.fn());

    requestSpell(id);

    expect(useEffect).toHaveBeenCalled();
  });

  it('should call performRequest with the id and dispatch', () => {
    const innerRequest = jest.fn();
    const outerRequest = jest.fn(() => innerRequest);
    const requestSpell = findSpellRequest(outerRequest);

    requestSpell(id);

    expect(outerRequest).toHaveBeenCalledWith({ wildcards: { id } });
    expect(innerRequest).toHaveBeenCalledWith(dispatch);
  });
});
