import React from 'react';
import { shallow } from 'enzyme';

import SpellLoader from './loader';
import { INITIALIZED } from '../../store/requestStatus';

describe('SpellLoader', () => {
  const spellId = '00000000-0000-0000-0000-000000000000';
  const defaultProps = {
    data: { spell: {} },
    performRequest: jest.fn(),
    render: jest.fn(),
    spellId,
    status: INITIALIZED,
  };
  const ExampleComponent = () => (<p>Example Component</p>);

  it('should delegate to render()', () => {
    const render = jest.fn(() => (<ExampleComponent />));
    const rendered = shallow(<SpellLoader {...defaultProps} render={render} />);

    expect(rendered).toHaveDisplayName('ExampleComponent');
  });

  it('should pass the spell and status to render()', () => {
    const render = jest.fn();
    const { data, status } = defaultProps;
    const { spell } = data;

    shallow(<SpellLoader {...defaultProps} render={render} />);

    expect(render).toHaveBeenCalledWith({ spell, status });
  });

  it('should call performRequest()', () => {
    const performRequest = jest.fn();

    shallow(<SpellLoader {...defaultProps} performRequest={performRequest} />);

    expect(performRequest).toHaveBeenCalledWith({ wildcards: { id: spellId } });
  });
});
