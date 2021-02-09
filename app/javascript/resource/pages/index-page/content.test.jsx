import React from 'react';
import { shallow } from 'enzyme';

import { PENDING } from 'api/status';
import IndexPageContent from './content';

describe('<IndexPageContent />', () => {
  const Table = () => (<div />);
  const data = { widgets: [] };
  const pluralDisplayName = 'gadgets';
  const resourceName = 'widgets';
  const status = PENDING;
  const useDestroyRequest = jest.fn();
  const defaultProps = {
    Table,
    data,
    pluralDisplayName,
    resourceName,
    status,
    useDestroyRequest,
  };

  describe('with default props', () => {
    const rendered = shallow(<IndexPageContent {...defaultProps} />);

    it('should render a status switch', () => {
      expect(rendered).toHaveDisplayName('StatusSwitch');

      expect(rendered).toHaveProp({ status });
    });

    describe('when the status is INITIALIZED', () => {
      const content = rendered.renderProp('renderInitialized')({});

      it('should display an empty table', () => {
        expect(content).toHaveDisplayName('Table');
      });

      it('should display the loading message', () => {
        const message = shallow(content.prop('emptyMessage'));

        expect(message).toHaveClassName('loading-message loading-message-pending');
        expect(message).toHaveText('Loading gadgets data from the server...');
      });
    });

    describe('when the status is FAILURE', () => {
      const content = rendered.renderProp('renderFailure')({});

      it('should display an empty table', () => {
        expect(content).toHaveDisplayName('Table');
      });

      it('should display the loading message', () => {
        const message = shallow(content.prop('emptyMessage'));

        expect(message).toHaveClassName('loading-message loading-message-failure');
        expect(message).toHaveText('Unable to load gadgets data from the server.');
      });
    });

    describe('when the status is PENDING', () => {
      const content = rendered.renderProp('renderPending')({});

      it('should display an empty table', () => {
        expect(content).toHaveDisplayName('Table');
      });

      it('should display the loading message', () => {
        const message = shallow(content.prop('emptyMessage'));

        expect(message).toHaveClassName('loading-message loading-message-pending');
        expect(message).toHaveText('Loading gadgets data from the server...');
      });
    });

    describe('when the status is SUCCESS', () => {
      const content = rendered.renderProp('renderSuccess')({});

      it('should display the table with the data', () => {
        expect(content).toHaveDisplayName('Table');

        expect(content).toHaveProp({ data });
        expect(content).toHaveProp({ pluralDisplayName });
        expect(content).toHaveProp({ resourceName });
        expect(content).toHaveProp({ useDestroyRequest });
      });
    });
  });
});
