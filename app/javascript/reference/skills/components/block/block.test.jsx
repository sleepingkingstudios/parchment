import React from 'react';
import { shallow } from 'enzyme';

import SkillBlock from './block';
import { capitalize } from '../../../../utils/string';

describe('<SkillBlock />', () => {
  const skill = {
    id: '00000000-0000-0000-0000-000000000000',
    name: 'Disco',
    slug: 'disco',
    abilityScore: 'charisma',
    shortDescription: 'Get down and boogie.',
    description: 'Disco will never die!',
  };
  const defaultProps = { data: skill };

  it('should wrap the contents in a <div> element', () => {
    const rendered = shallow(<SkillBlock {...defaultProps} />);

    expect(rendered).toHaveDisplayName('div');
    expect(rendered).toHaveClassName('skill-block');
  });

  it('should render the skill name', () => {
    const rendered = shallow(<SkillBlock {...defaultProps} />);
    const nameElement = rendered.find('.skill-block-name');

    expect(nameElement).toHaveDisplayName('p');
    expect(nameElement).toIncludeText(skill.name);
  });

  it('should render the skill ability score', () => {
    const rendered = shallow(<SkillBlock {...defaultProps} />);
    const nameElement = rendered.find('.skill-block-ability-score');

    expect(nameElement).toHaveDisplayName('p');
    expect(nameElement).toHaveText(`Ability Score: ${capitalize(skill.abilityScore)}`);
  });

  it('should render the skill description', () => {
    const rendered = shallow(<SkillBlock {...defaultProps} />);
    const descriptionElement = rendered.find('RichText');

    expect(descriptionElement).toExist();
    expect(descriptionElement).toHaveClassName('skill-block-description');
    expect(descriptionElement).toHaveProp('text', skill.description);
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<SkillBlock {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });

  describe('with showAdditionalDetails: true', () => {
    it('should render the skill slug', () => {
      const rendered = shallow(
        <SkillBlock {...defaultProps} showAdditionalDetails />,
      );
      const descriptionElement = rendered.find('.skill-block-slug');

      expect(descriptionElement).toExist();
      expect(descriptionElement).toHaveDisplayName('p');
      expect(descriptionElement).toHaveText(`Slug: ${skill.slug}`);
    });

    it('should render the skill short description', () => {
      const rendered = shallow(
        <SkillBlock {...defaultProps} showAdditionalDetails />,
      );
      const shortDescriptionElement = rendered.find('.skill-block-short-description');

      expect(shortDescriptionElement).toHaveDisplayName('p');
      expect(shortDescriptionElement).toHaveText(`Short Description: ${skill.shortDescription}`);
    });
  });
});
