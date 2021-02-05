import React from 'react';
import { shallow } from 'enzyme';

import { PENDING } from 'api/status';
import ShowPageContent from './content';

describe('<ShowPageContent />', () => {
  const Block = () => (<div />);
  const data = { widget: {} };
  const resourceName = 'widget';
  const status = PENDING;
  const defaultProps = {
    Block,
    data,
    resourceName,
    status,
  };

  describe('with default props', () => {
    const rendered = shallow(<ShowPageContent {...defaultProps} />);

    it('should render a status switch', () => {
      expect(rendered).toHaveDisplayName('StatusSwitch');

      expect(rendered).toHaveProp({ status });
    });

    describe('when the status is INITIALIZED', () => {
      const content = rendered.renderProp('renderInitialized')({});

      it('should display the loading message', () => {
        expect(content).toHaveDisplayName('p');
        expect(content).toHaveClassName('loading-message loading-message-pending');
        expect(content).toHaveText('Loading widget data from the server...');
      });
    });

    describe('when the status is FAILURE', () => {
      const content = rendered.renderProp('renderFailure')({});

      it('should display the loading message', () => {
        expect(content).toHaveDisplayName('p');
        expect(content).toHaveClassName('loading-message loading-message-failure');
        expect(content).toHaveText('Unable to load widget data from the server.');
      });
    });

    describe('when the status is PENDING', () => {
      const content = rendered.renderProp('renderPending')({});

      it('should display the loading message', () => {
        expect(content).toHaveDisplayName('p');
        expect(content).toHaveClassName('loading-message loading-message-pending');
        expect(content).toHaveText('Loading widget data from the server...');
      });
    });

    describe('when the status is SUCCESS', () => {
      const content = rendered.renderProp('renderSuccess')({});

      it('should display the block with the data', () => {
        expect(content).toHaveDisplayName('Block');

        expect(content).toHaveProp({ data });
        expect(content).toHaveProp({ resourceName });
        expect(content).toHaveProp({ showAdditionalDetails: true });
      });
    });
  });
});
