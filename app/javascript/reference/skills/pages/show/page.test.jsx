import React from 'react';
import { shallow } from 'enzyme';

import ShowSkillPage from './page';
import { SkillBlock } from '../../components/block';
import endpoint, { hooks } from '../../store/showFindSkill';

jest.mock('../../store/showFindSkill');

hooks.useEndpoint.mockImplementation(() => () => ({}));

describe('ShowSkillPage', () => {
  const id = '00000000-0000-0000-0000-000000000000';
  const match = { params: { id } };
  const defaultProps = { match };

  it('should render the show page', () => {
    const state = { data: {} };

    hooks.useEndpoint.mockImplementationOnce(() => state);

    const rendered = shallow(<ShowSkillPage {...defaultProps} />);

    expect(rendered).toHaveDisplayName('ShowPage');
    expect(rendered).toHaveProp({ Block: SkillBlock });
    expect(rendered).toHaveProp({ endpoint });
    expect(rendered).toHaveProp({ resourceName: 'Skill' });
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
        label: 'Skills',
        url: '/reference/skills',
      },
      {
        label: 'Loading...',
        url: `/reference/skills/${id}`,
        active: true,
      },
    ];
    const state = { data: {} };

    hooks.useEndpoint.mockImplementationOnce(() => state);

    const rendered = shallow(<ShowSkillPage {...defaultProps} />);

    expect(rendered).toHaveProp({ breadcrumbs });
  });

  it('should render the buttons', () => {
    const state = { data: {} };

    hooks.useEndpoint.mockImplementationOnce(() => state);

    const rendered = shallow(<ShowSkillPage {...defaultProps} />);

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
          label: 'Skills',
          url: '/reference/skills',
        },
        {
          label: 'Disco',
          url: `/reference/skills/${id}`,
          active: true,
        },
      ];
      const skill = { id, name: 'Disco' };
      const state = { data: { skill } };

      hooks.useEndpoint.mockImplementationOnce(() => state);

      const rendered = shallow(<ShowSkillPage {...defaultProps} />);

      expect(rendered).toHaveProp({ breadcrumbs });
    });

    it('should render the buttons', () => {
      const skill = { id, name: 'Disco' };
      const state = { data: { skill } };

      hooks.useEndpoint.mockImplementationOnce(() => state);

      const rendered = shallow(<ShowSkillPage {...defaultProps} />);

      expect(rendered).toHaveProp({ buttons: [] });
    });
  });
});
