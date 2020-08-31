import React from 'react';
import { shallow } from 'enzyme';

import ShowLanguagePage from './page';
import { LanguageBlock } from '../../components/block';
import endpoint, { hooks } from '../../store/showFindLanguage';

jest.mock('../../store/showFindLanguage');

hooks.useEndpoint.mockImplementation(() => () => ({}));

describe('<ShowLanguagePage />', () => {
  const id = '00000000-0000-0000-0000-000000000000';
  const match = { params: { id } };
  const defaultProps = { match };

  it('should render the show page', () => {
    const state = { data: {} };

    hooks.useEndpoint.mockImplementationOnce(() => state);

    const rendered = shallow(<ShowLanguagePage {...defaultProps} />);

    expect(rendered).toHaveDisplayName('ShowPage');
    expect(rendered).toHaveProp({ Block: LanguageBlock });
    expect(rendered).toHaveProp({ endpoint });
    expect(rendered).toHaveProp({ resourceName: 'Language' });
  });

  it('should render the breadcrumbs', () => {
    const breadcrumbs = [
      {
        label: 'Home',
        url: '/',
      },
      {
        label: 'Reference',
        url: '/reference',
        active: true,
      },
      {
        label: 'Languages',
        url: '/reference/languages',
      },
      {
        label: 'Loading...',
        url: `/reference/languages/${id}`,
        active: true,
      },
    ];
    const state = { data: {} };

    hooks.useEndpoint.mockImplementationOnce(() => state);

    const rendered = shallow(<ShowLanguagePage {...defaultProps} />);

    expect(rendered).toHaveProp({ breadcrumbs });
  });

  it('should render the buttons', () => {
    const state = { data: {} };

    hooks.useEndpoint.mockImplementationOnce(() => state);

    const rendered = shallow(<ShowLanguagePage {...defaultProps} />);

    expect(rendered).toHaveProp({ buttons: [] });
  });

  describe('when the resource is loaded', () => {
    it('should render the breadcrumbs', () => {
      const breadcrumbs = [
        {
          label: 'Home',
          url: '/',
        },
        {
          label: 'Reference',
          url: '/reference',
          active: true,
        },
        {
          label: 'Languages',
          url: '/reference/languages',
        },
        {
          label: 'Body Language',
          url: `/reference/languages/${id}`,
          active: true,
        },
      ];
      const language = { id, name: 'Body Language' };
      const state = { data: { language } };

      hooks.useEndpoint.mockImplementationOnce(() => state);

      const rendered = shallow(<ShowLanguagePage {...defaultProps} />);

      expect(rendered).toHaveProp({ breadcrumbs });
    });

    it('should render the buttons', () => {
      const language = { id, name: 'Body Language' };
      const state = { data: { language } };

      hooks.useEndpoint.mockImplementationOnce(() => state);

      const rendered = shallow(<ShowLanguagePage {...defaultProps} />);

      expect(rendered).toHaveProp({ buttons: [] });
    });
  });
});
