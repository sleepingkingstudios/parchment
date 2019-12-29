import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter as Router } from 'react-router-dom';

import {
  CancelButton,
  PublicationDateField,
  PublisherNameField,
  SlugField,
  SubmitButton,
  TitleField,
} from './fields';
import { booksData } from '../../fixtures';
import { INITIALIZED } from '../../../api/status';

describe('<BookForm /> fields', () => {
  const onChangeAction = jest.fn(
    ({ propName, value }) => ({ payload: { propName, value } }),
  );
  const onSubmitAction = jest.fn(() => ({ payload: { ok: true } }));
  const book = booksData[0];
  const form = {
    data: { book },
    path: ['book'],
    onChangeAction,
    onSubmitAction,
  };

  describe('<CancelButton />', () => {
    const children = 'Do Nothing';
    const defaultProps = {
      children,
      form,
      isUpdate: false,
    };

    it('should set the display name', () => {
      expect(CancelButton.displayName).toEqual('CancelButton');
    });

    it('should render a form group', () => {
      const rendered = shallow(<CancelButton {...defaultProps} />);

      expect(rendered).toHaveDisplayName('FormGroup');
    });

    it('should match the snapshot', () => {
      const rendered = mount(<CancelButton {...defaultProps} />, { wrappingComponent: Router });

      expect(rendered).toMatchSnapshot();
    });
  });

  describe('<PublicationDateField />', () => {
    const defaultProps = { form };

    it('should set the display name', () => {
      expect(PublicationDateField.displayName).toEqual('PublicationDateField');
    });

    it('should render a form field', () => {
      const rendered = shallow(<PublicationDateField {...defaultProps} />);

      expect(rendered).toHaveDisplayName('FormField');
    });

    it('should match the snapshot', () => {
      const rendered = mount(<PublicationDateField {...defaultProps} />);

      expect(rendered).toMatchSnapshot();
    });
  });

  describe('<PublisherNameField />', () => {
    const defaultProps = { form };

    it('should set the display name', () => {
      expect(PublisherNameField.displayName).toEqual('PublisherNameField');
    });

    it('should render a form field', () => {
      const rendered = shallow(<PublisherNameField {...defaultProps} />);

      expect(rendered).toHaveDisplayName('FormField');
    });

    it('should match the snapshot', () => {
      const rendered = mount(<PublisherNameField {...defaultProps} />);

      expect(rendered).toMatchSnapshot();
    });
  });

  describe('<SlugField />', () => {
    const defaultProps = { form };

    it('should set the display name', () => {
      expect(SlugField.displayName).toEqual('SlugField');
    });

    it('should render a form field', () => {
      const rendered = shallow(<SlugField {...defaultProps} />);

      expect(rendered).toHaveDisplayName('FormField');
    });

    it('should match the snapshot', () => {
      const rendered = mount(<SlugField {...defaultProps} />);

      expect(rendered).toMatchSnapshot();
    });
  });

  describe('<SubmitButton />', () => {
    const children = 'Do Something';
    const defaultProps = { children, form, status: INITIALIZED };

    it('should set the display name', () => {
      expect(SubmitButton.displayName).toEqual('SubmitButton');
    });

    it('should render a form group', () => {
      const rendered = shallow(<SubmitButton {...defaultProps} />);

      expect(rendered).toHaveDisplayName('FormGroup');
    });

    it('should match the snapshot', () => {
      const rendered = mount(<SubmitButton {...defaultProps} />);

      expect(rendered).toMatchSnapshot();
    });
  });

  describe('<TitleField />', () => {
    const defaultProps = { form };

    it('should set the display name', () => {
      expect(TitleField.displayName).toEqual('TitleField');
    });

    it('should render a form field', () => {
      const rendered = shallow(<TitleField {...defaultProps} />);

      expect(rendered).toHaveDisplayName('FormField');
    });

    it('should match the snapshot', () => {
      const rendered = mount(<TitleField {...defaultProps} />);

      expect(rendered).toMatchSnapshot();
    });
  });
});
