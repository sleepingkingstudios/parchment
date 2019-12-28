import React from 'react';
import { shallow, mount } from 'enzyme';

import BookFormSubmitButton from './index';

import { booksData } from '../../../fixtures';
import {
  FAILURE,
  INITIALIZED,
  PENDING,
  SUCCESS,
} from '../../../../api/status';

describe('<BookFormSubmitButton />', () => {
  const onSubmitAction = jest.fn(() => ({ payload: { ok: true } }));
  const book = booksData[0];
  const form = {
    data: { book },
    path: ['book'],
    onSubmitAction,
  };
  const defaultProps = {
    form,
    isUpdate: false,
    status: INITIALIZED,
  };

  it('should render the button', () => {
    const rendered = shallow(<BookFormSubmitButton {...defaultProps} />);

    expect(rendered).toHaveDisplayName('FormSubmitWrapper');
    expect(rendered).toHaveProp('block', true);
    expect(rendered).toHaveProp('disabled', false);
    expect(rendered).toHaveProp({ form });
  });

  it('should set the button text', () => {
    const rendered = mount(<BookFormSubmitButton {...defaultProps} />);

    expect(rendered).toHaveText('Create Book');
  });

  it('should not show a spinner', () => {
    const rendered = shallow(<BookFormSubmitButton {...defaultProps} />);

    expect(rendered).not.toContainMatchingElement('Spinner');
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<BookFormSubmitButton {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });

  describe('with isUpdate: true', () => {
    const updateProps = { ...defaultProps, isUpdate: true };

    it('should render the button', () => {
      const rendered = shallow(<BookFormSubmitButton {...updateProps} />);

      expect(rendered).toHaveDisplayName('FormSubmitWrapper');
      expect(rendered).toHaveProp('block', true);
      expect(rendered).toHaveProp('disabled', false);
      expect(rendered).toHaveProp({ form });
    });

    it('should set the button text', () => {
      const rendered = mount(<BookFormSubmitButton {...updateProps} />);

      expect(rendered).toHaveText('Update Book');
    });

    it('should not show a spinner', () => {
      const rendered = shallow(<BookFormSubmitButton {...updateProps} />);

      expect(rendered).not.toContainMatchingElement('Spinner');
    });

    it('should match the snapshot', () => {
      const rendered = shallow(<BookFormSubmitButton {...updateProps} />);

      expect(rendered).toMatchSnapshot();
    });

    describe('with status: FAILURE', () => {
      const props = { ...updateProps, status: FAILURE };

      it('should set the button text', () => {
        const rendered = mount(<BookFormSubmitButton {...props} />);

        expect(rendered).toHaveText('Update Book');
      });

      it('should not show a spinner', () => {
        const rendered = shallow(<BookFormSubmitButton {...props} />);

        expect(rendered).not.toContainMatchingElement('Spinner');
      });
    });

    describe('with status: PENDING', () => {
      const props = { ...updateProps, status: PENDING };

      it('should set the button text', () => {
        const rendered = mount(<BookFormSubmitButton {...props} />);

        expect(rendered).toHaveText('Updating Book...');
      });

      it('should not show a spinner', () => {
        const rendered = shallow(<BookFormSubmitButton {...props} />);

        expect(rendered).toContainMatchingElement('Spinner');
      });
    });

    describe('with status: SUCCESS', () => {
      const props = { ...updateProps, status: SUCCESS };

      it('should set the button text', () => {
        const rendered = mount(<BookFormSubmitButton {...props} />);

        expect(rendered).toHaveText('Update Book');
      });

      it('should not show a spinner', () => {
        const rendered = shallow(<BookFormSubmitButton {...props} />);

        expect(rendered).not.toContainMatchingElement('Spinner');
      });
    });
  });

  describe('with status: FAILURE', () => {
    const props = { ...defaultProps, status: FAILURE };

    it('should render the button', () => {
      const rendered = shallow(<BookFormSubmitButton {...props} />);

      expect(rendered).toHaveDisplayName('FormSubmitWrapper');
      expect(rendered).toHaveProp('block', true);
      expect(rendered).toHaveProp('disabled', false);
      expect(rendered).toHaveProp({ form });
    });

    it('should set the button text', () => {
      const rendered = mount(<BookFormSubmitButton {...defaultProps} />);

      expect(rendered).toHaveText('Create Book');
    });

    it('should not show a spinner', () => {
      const rendered = shallow(<BookFormSubmitButton {...defaultProps} />);

      expect(rendered).not.toContainMatchingElement('Spinner');
    });
  });

  describe('with status: PENDING', () => {
    const props = { ...defaultProps, status: PENDING };

    it('should render the button', () => {
      const rendered = shallow(<BookFormSubmitButton {...props} />);

      expect(rendered).toHaveDisplayName('FormSubmitWrapper');
      expect(rendered).toHaveProp('block', true);
      expect(rendered).toHaveProp('disabled', true);
      expect(rendered).toHaveProp({ form });
    });

    it('should set the button text', () => {
      const rendered = mount(<BookFormSubmitButton {...props} />);

      expect(rendered).toHaveText('Creating Book...');
    });

    it('should show a spinner', () => {
      const rendered = shallow(<BookFormSubmitButton {...props} />);

      expect(rendered).toContainMatchingElement('Spinner');
    });
  });

  describe('with status: SUCCESS', () => {
    const props = { ...defaultProps, status: SUCCESS };

    it('should render the button', () => {
      const rendered = shallow(<BookFormSubmitButton {...props} />);

      expect(rendered).toHaveDisplayName('FormSubmitWrapper');
      expect(rendered).toHaveProp('block', true);
      expect(rendered).toHaveProp('disabled', false);
      expect(rendered).toHaveProp({ form });
    });

    it('should set the button text', () => {
      const rendered = mount(<BookFormSubmitButton {...defaultProps} />);

      expect(rendered).toHaveText('Create Book');
    });

    it('should not show a spinner', () => {
      const rendered = shallow(<BookFormSubmitButton {...defaultProps} />);

      expect(rendered).not.toContainMatchingElement('Spinner');
    });
  });
});
