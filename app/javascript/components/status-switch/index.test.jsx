import React from 'react';
import { shallow } from 'enzyme';

import StatusSwitch from './index';
import {
  INITIALIZED,
  FAILURE,
  PENDING,
  SUCCESS,
} from '../../api/status';

const ExampleComponent = () => (<p>Example component.</p>);

describe('StatusSwitch', () => {
  const defaultProps = { status: INITIALIZED };

  describe('with default props', () => {
    describe('with status: INITIALIZED', () => {
      it('should render an empty component', () => {
        const rendered = shallow(
          <StatusSwitch {...defaultProps} status={INITIALIZED} />,
        );

        expect(rendered).toBeEmptyRender();
      });
    });

    describe('with status: FAILURE', () => {
      it('should render an empty component', () => {
        const rendered = shallow(
          <StatusSwitch {...defaultProps} status={FAILURE} />,
        );

        expect(rendered).toBeEmptyRender();
      });
    });

    describe('with status: PENDING', () => {
      it('should render an empty component', () => {
        const rendered = shallow(
          <StatusSwitch {...defaultProps} status={PENDING} />,
        );

        expect(rendered).toBeEmptyRender();
      });
    });

    describe('with status: SUCCESS', () => {
      it('should render an empty component', () => {
        const rendered = shallow(
          <StatusSwitch {...defaultProps} status={SUCCESS} />,
        );

        expect(rendered).toBeEmptyRender();
      });
    });
  });

  describe('with renderFailure: function', () => {
    const renderFailure = jest.fn(props => (<ExampleComponent {...props} />));
    const props = { ...defaultProps, renderFailure: ExampleComponent };

    describe('with status: FAILURE', () => {
      it('should call the function', () => {
        const status = FAILURE;
        const customProps = { foo: 'bar' };

        const rendered = shallow(
          <StatusSwitch
            {...props}
            {...customProps}
            renderFailure={renderFailure}
            status={status}
          />,
        );

        expect(rendered).toHaveDisplayName('ExampleComponent');
        expect(rendered).toHaveProp(customProps);
        expect(rendered).toHaveProp({ status });
      });
    });
  });

  describe('with renderInitialized: function', () => {
    const renderInitialized = jest.fn(props => (<ExampleComponent {...props} />));
    const props = { ...defaultProps, renderInitialized: ExampleComponent };

    describe('with status: INITIALIZED', () => {
      it('should call the function', () => {
        const status = INITIALIZED;
        const customProps = { foo: 'bar' };

        const rendered = shallow(
          <StatusSwitch
            {...props}
            {...customProps}
            renderInitialized={renderInitialized}
            status={status}
          />,
        );

        expect(rendered).toHaveDisplayName('ExampleComponent');
        expect(rendered).toHaveProp(customProps);
        expect(rendered).toHaveProp({ status });
      });
    });
  });

  describe('with renderPending: function', () => {
    const renderPending = jest.fn(props => (<ExampleComponent {...props} />));
    const props = { ...defaultProps, renderPending: ExampleComponent };

    describe('with status: PENDING', () => {
      it('should call the function', () => {
        const status = PENDING;
        const customProps = { foo: 'bar' };

        const rendered = shallow(
          <StatusSwitch
            {...props}
            {...customProps}
            renderPending={renderPending}
            status={status}
          />,
        );

        expect(rendered).toHaveDisplayName('ExampleComponent');
        expect(rendered).toHaveProp(customProps);
        expect(rendered).toHaveProp({ status });
      });
    });
  });

  describe('with renderSuccess: function', () => {
    const renderSuccess = jest.fn(props => (<ExampleComponent {...props} />));
    const props = { ...defaultProps, renderSuccess: ExampleComponent };

    describe('with status: SUCCESS', () => {
      it('should call the function', () => {
        const status = SUCCESS;
        const customProps = { foo: 'bar' };

        const rendered = shallow(
          <StatusSwitch
            {...props}
            {...customProps}
            renderSuccess={renderSuccess}
            status={status}
          />,
        );

        expect(rendered).toHaveDisplayName('ExampleComponent');
        expect(rendered).toHaveProp(customProps);
        expect(rendered).toHaveProp({ status });
      });
    });
  });
});
