import React from 'react';
import { shallow } from 'enzyme';

import ApiLoader from './loader';
import { INITIALIZED } from '../../store/requestStatus';

const ExampleComponent = () => (<p>Example Component</p>);

describe('ApiLoader', () => {
  const defaultProps = {
    data: { widget: { key: 'value' } },
    errors: { name: ['is Inigo Montoya'] },
    performRequest: () => {},
    render: ExampleComponent,
    status: INITIALIZED,
  };

  describe('with default options', () => {
    const props = { ...defaultProps };

    it('should delegate to render()', () => {
      const render = jest.fn(() => (<ExampleComponent />));
      const rendered = shallow(<ApiLoader {...props} render={render} />);

      expect(rendered).toHaveDisplayName('ExampleComponent');
    });

    it('should pass the data, errors, and status to render()', () => {
      const render = jest.fn();
      const { data, errors, status } = props;

      shallow(<ApiLoader {...props} render={render} />);

      expect(render).toHaveBeenCalledWith({ data, errors, status });
    });

    it('should call performRequest()', () => {
      const performRequest = jest.fn();

      shallow(<ApiLoader {...props} performRequest={performRequest} />);

      expect(performRequest).toHaveBeenCalledWith({});
    });
  });

  describe('with mapDataToProps', () => {
    const mapDataToProps = data => ({ widget: data.widget });
    const props = { ...defaultProps, mapDataToProps };

    it('should pass the widget, errors, and status to render()', () => {
      const render = jest.fn();
      const { data, errors, status } = props;
      const { widget } = data;

      shallow(<ApiLoader {...props} render={render} />);

      expect(render).toHaveBeenCalledWith({ errors, status, widget });
    });
  });

  describe('with requestOptions: value', () => {
    const requestOptions = {
      wildcards: { id: '00000000-0000-0000-0000-000000000000' },
    };
    const props = { ...defaultProps, requestOptions };

    it('should call performRequest()', () => {
      const performRequest = jest.fn();

      shallow(<ApiLoader {...props} performRequest={performRequest} />);

      expect(performRequest).toHaveBeenCalledWith(requestOptions);
    });
  });
});
