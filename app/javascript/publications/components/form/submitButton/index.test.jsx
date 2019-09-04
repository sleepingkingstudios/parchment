import React from 'react';
import { shallow, mount } from 'enzyme';

import PublicationFormSubmitButton from './index';

import { publicationsData } from '../../../fixtures';
import {
  FAILURE,
  INITIALIZED,
  PENDING,
  SUCCESS,
} from '../../../../api/status';

describe('<PublicationFormSubmitButton />', () => {
  const onSubmitAction = jest.fn(() => ({ payload: { ok: true } }));
  const publication = publicationsData[0];
  const form = {
    data: { publication },
    path: ['publication'],
    onSubmitAction,
  };
  const defaultProps = {
    form,
    isUpdate: false,
    status: INITIALIZED,
  };

  it('should render the button', () => {
    const rendered = shallow(<PublicationFormSubmitButton {...defaultProps} />);

    expect(rendered).toHaveDisplayName('FormSubmitWrapper');
    expect(rendered).toHaveProp('block', true);
    expect(rendered).toHaveProp('disabled', false);
    expect(rendered).toHaveProp({ form });
  });

  it('should set the button text', () => {
    const rendered = mount(<PublicationFormSubmitButton {...defaultProps} />);

    expect(rendered).toHaveText('Create Publication');
  });

  it('should not show a spinner', () => {
    const rendered = shallow(<PublicationFormSubmitButton {...defaultProps} />);

    expect(rendered).not.toContainMatchingElement('Spinner');
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<PublicationFormSubmitButton {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });

  describe('with isUpdate: true', () => {
    const updateProps = { ...defaultProps, isUpdate: true };

    it('should render the button', () => {
      const rendered = shallow(<PublicationFormSubmitButton {...updateProps} />);

      expect(rendered).toHaveDisplayName('FormSubmitWrapper');
      expect(rendered).toHaveProp('block', true);
      expect(rendered).toHaveProp('disabled', false);
      expect(rendered).toHaveProp({ form });
    });

    it('should set the button text', () => {
      const rendered = mount(<PublicationFormSubmitButton {...updateProps} />);

      expect(rendered).toHaveText('Update Publication');
    });

    it('should not show a spinner', () => {
      const rendered = shallow(<PublicationFormSubmitButton {...updateProps} />);

      expect(rendered).not.toContainMatchingElement('Spinner');
    });

    it('should match the snapshot', () => {
      const rendered = shallow(<PublicationFormSubmitButton {...updateProps} />);

      expect(rendered).toMatchSnapshot();
    });

    describe('with status: FAILURE', () => {
      const props = { ...updateProps, status: FAILURE };

      it('should set the button text', () => {
        const rendered = mount(<PublicationFormSubmitButton {...props} />);

        expect(rendered).toHaveText('Update Publication');
      });

      it('should not show a spinner', () => {
        const rendered = shallow(<PublicationFormSubmitButton {...props} />);

        expect(rendered).not.toContainMatchingElement('Spinner');
      });
    });

    describe('with status: PENDING', () => {
      const props = { ...updateProps, status: PENDING };

      it('should set the button text', () => {
        const rendered = mount(<PublicationFormSubmitButton {...props} />);

        expect(rendered).toHaveText('Updating Publication...');
      });

      it('should not show a spinner', () => {
        const rendered = shallow(<PublicationFormSubmitButton {...props} />);

        expect(rendered).toContainMatchingElement('Spinner');
      });
    });

    describe('with status: SUCCESS', () => {
      const props = { ...updateProps, status: SUCCESS };

      it('should set the button text', () => {
        const rendered = mount(<PublicationFormSubmitButton {...props} />);

        expect(rendered).toHaveText('Update Publication');
      });

      it('should not show a spinner', () => {
        const rendered = shallow(<PublicationFormSubmitButton {...props} />);

        expect(rendered).not.toContainMatchingElement('Spinner');
      });
    });
  });

  describe('with status: FAILURE', () => {
    const props = { ...defaultProps, status: FAILURE };

    it('should render the button', () => {
      const rendered = shallow(<PublicationFormSubmitButton {...props} />);

      expect(rendered).toHaveDisplayName('FormSubmitWrapper');
      expect(rendered).toHaveProp('block', true);
      expect(rendered).toHaveProp('disabled', false);
      expect(rendered).toHaveProp({ form });
    });

    it('should set the button text', () => {
      const rendered = mount(<PublicationFormSubmitButton {...defaultProps} />);

      expect(rendered).toHaveText('Create Publication');
    });

    it('should not show a spinner', () => {
      const rendered = shallow(<PublicationFormSubmitButton {...defaultProps} />);

      expect(rendered).not.toContainMatchingElement('Spinner');
    });
  });

  describe('with status: PENDING', () => {
    const props = { ...defaultProps, status: PENDING };

    it('should render the button', () => {
      const rendered = shallow(<PublicationFormSubmitButton {...props} />);

      expect(rendered).toHaveDisplayName('FormSubmitWrapper');
      expect(rendered).toHaveProp('block', true);
      expect(rendered).toHaveProp('disabled', true);
      expect(rendered).toHaveProp({ form });
    });

    it('should set the button text', () => {
      const rendered = mount(<PublicationFormSubmitButton {...props} />);

      expect(rendered).toHaveText('Creating Publication...');
    });

    it('should show a spinner', () => {
      const rendered = shallow(<PublicationFormSubmitButton {...props} />);

      expect(rendered).toContainMatchingElement('Spinner');
    });
  });

  describe('with status: SUCCESS', () => {
    const props = { ...defaultProps, status: SUCCESS };

    it('should render the button', () => {
      const rendered = shallow(<PublicationFormSubmitButton {...props} />);

      expect(rendered).toHaveDisplayName('FormSubmitWrapper');
      expect(rendered).toHaveProp('block', true);
      expect(rendered).toHaveProp('disabled', false);
      expect(rendered).toHaveProp({ form });
    });

    it('should set the button text', () => {
      const rendered = mount(<PublicationFormSubmitButton {...defaultProps} />);

      expect(rendered).toHaveText('Create Publication');
    });

    it('should not show a spinner', () => {
      const rendered = shallow(<PublicationFormSubmitButton {...defaultProps} />);

      expect(rendered).not.toContainMatchingElement('Spinner');
    });
  });
});
