import React from 'react';
import { shallow } from 'enzyme';

import ActionsTableActions from './actions';
import { hooks } from '../../store/deleteAction';

jest.mock('../../store/deleteAction');

const performRequest = jest.fn();

describe('<ActionsTableActions />', () => {
  const defaultProps = { id: '00000000-0000-0000-0000-000000000000' };
  const { id } = defaultProps;

  beforeEach(() => {
    hooks.useDeleteData.mockImplementation(() => performRequest);
  });

  it('should set the class name', () => {
    const rendered = shallow(<ActionsTableActions {...defaultProps} />);

    expect(rendered).toHaveClassName('mechanics-actions');
  });

  it('should render the show link', () => {
    const rendered = shallow(<ActionsTableActions {...defaultProps} />);
    const link = rendered.find('LinkButton').at(0);

    expect(link).toExist();
    expect(link).toHaveProp('url', `/mechanics/actions/${id}`);
    expect(link).toHaveProp('children', 'Show');
  });

  it('should render the update link', () => {
    const rendered = shallow(<ActionsTableActions {...defaultProps} />);
    const link = rendered.find('LinkButton').at(1);

    expect(link).toExist();
    expect(link).toHaveProp('url', `/mechanics/actions/${id}/update`);
    expect(link).toHaveProp('children', 'Update');
  });

  it('should render the delete link', () => {
    const rendered = shallow(<ActionsTableActions {...defaultProps} />);
    const link = rendered.find('Button');

    expect(link).toExist();
    expect(link).toHaveProp('onClick', performRequest);
    expect(link).toHaveProp('children', 'Delete');

    expect(hooks.useDeleteData).toHaveBeenCalledWith({
      onSuccess: expect.any(Function),
      wildcards: { id },
    });
  });

  describe('with onDelete: function', () => {
    const onDelete = jest.fn();
    const props = { ...defaultProps, onDelete };

    beforeEach(() => { onDelete.mockClear(); });

    it('should render the delete link', () => {
      const rendered = shallow(<ActionsTableActions {...props} />);
      const link = rendered.find('Button');

      expect(link).toExist();
      expect(link).toHaveProp('onClick', performRequest);
      expect(link).toHaveProp('children', 'Delete');

      expect(hooks.useDeleteData).toHaveBeenCalledWith({
        onSuccess: expect.any(Function),
        wildcards: { id },
      });
    });

    it('should wrap onDelete as middleware', () => {
      hooks.useDeleteData.mockImplementation(({ onSuccess }) => onSuccess);

      const rendered = shallow(<ActionsTableActions {...props} />);
      const link = rendered.find('Button');
      const handler = link.prop('onClick');
      const next = jest.fn();
      const args = { dispatch: jest.fn(), getState: jest.fn(), response: {} };

      expect(typeof handler).toEqual('function');

      handler(next)(args);

      expect(next).toHaveBeenCalledWith(args);
      expect(onDelete).toHaveBeenCalledWith(args);
    });
  });
});
