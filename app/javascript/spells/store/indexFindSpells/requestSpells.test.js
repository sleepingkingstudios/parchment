import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import findSpellsRequest from './requestSpells';

jest.mock('react');
jest.mock('react-redux');

const dispatch = jest.fn();

useDispatch.mockImplementation(() => dispatch);
useEffect.mockImplementation(fn => fn());

describe('IndexFindSpells store requestSpells()', () => {
  it('should be a function', () => {
    expect(typeof findSpellsRequest).toEqual('function');
  });

  it('should return a function', () => {
    const requestSpell = findSpellsRequest(() => jest.fn());

    expect(typeof requestSpell).toEqual('function');
  });

  it('should call useEffect()', () => {
    const requestSpells = findSpellsRequest(() => jest.fn());

    requestSpells();

    expect(useEffect).toHaveBeenCalled();
  });

  it('should call performRequest with the dispatch', () => {
    const innerRequest = jest.fn();
    const outerRequest = jest.fn(() => innerRequest);
    const requestSpells = findSpellsRequest(outerRequest);

    requestSpells();

    expect(outerRequest).toHaveBeenCalled();
    expect(innerRequest).toHaveBeenCalledWith(dispatch);
  });
});
