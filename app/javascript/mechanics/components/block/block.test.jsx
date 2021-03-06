import React from 'react';
import { shallow } from 'enzyme';

import MechanicBlock from './block';

describe('<MechanicBlock />', () => {
  const mechanic = {
    id: '00000000-0000-0000-0000-000000000000',
    type: '',
    name: 'Self-Destruct',
    slug: 'self-destruct',
    shortDescription: 'Creates a big boom',
    description: 'Destroys all nearby foes at the cost of your life.',
  };
  const defaultProps = { data: mechanic };

  it('should wrap the contents in a <div> element', () => {
    const rendered = shallow(<MechanicBlock {...defaultProps} />);

    expect(rendered).toHaveDisplayName('div');
    expect(rendered).toHaveClassName('mechanic-block');
  });

  it('should render the mechanic name', () => {
    const rendered = shallow(<MechanicBlock {...defaultProps} />);
    const nameElement = rendered.find('.mechanic-block-name');

    expect(nameElement).toHaveDisplayName('p');
    expect(nameElement).toIncludeText(mechanic.name);
  });

  it('should render the mechanic description', () => {
    const rendered = shallow(<MechanicBlock {...defaultProps} />);
    const descriptionElement = rendered.find('RichText');

    expect(descriptionElement).toExist();
    expect(descriptionElement).toHaveClassName('mechanic-block-description');
    expect(descriptionElement).toHaveProp('text', mechanic.description);
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<MechanicBlock {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });

  describe('when the mechanic has a type', () => {
    const action = Object.assign(
      {},
      mechanic,
      { type: 'Mechanics::Action' },
    );

    it('should render the mechanic name', () => {
      const rendered = shallow(<MechanicBlock {...defaultProps} data={action} />);
      const nameElement = rendered.find('.mechanic-block-name');

      expect(nameElement).toHaveDisplayName('p');
      expect(nameElement).toIncludeText(mechanic.name);
    });

    it('should render the mechanic type', () => {
      const rendered = shallow(<MechanicBlock {...defaultProps} data={action} />);
      const nameElement = rendered.find('.mechanic-block-name');
      const typeElement = nameElement.find('MechanicBlockType').shallow();

      expect(typeElement).toHaveText('(Action)');
    });
  });

  describe('with showAdditionalDetails: true', () => {
    const mechanicWithNotes = Object.assign(
      {},
      mechanic,
      { notes: "It's a real blast" },
    );

    it('should render the mechanic slug', () => {
      const rendered = shallow(
        <MechanicBlock {...defaultProps} data={mechanicWithNotes} showAdditionalDetails />,
      );
      const descriptionElement = rendered.find('.mechanic-block-slug');

      expect(descriptionElement).toExist();
      expect(descriptionElement).toHaveDisplayName('p');
      expect(descriptionElement).toHaveText(`Slug: ${mechanic.slug}`);
    });

    it('should render the mechanic short description', () => {
      const rendered = shallow(
        <MechanicBlock {...defaultProps} data={mechanicWithNotes} showAdditionalDetails />,
      );
      const shortDescriptionElement = rendered.find('.mechanic-block-short-description');

      expect(shortDescriptionElement).toHaveDisplayName('p');
      expect(shortDescriptionElement).toHaveText(`Short Description: ${mechanic.shortDescription}`);
    });

    it('should render the mechanic notes', () => {
      const rendered = shallow(
        <MechanicBlock {...defaultProps} data={mechanicWithNotes} showAdditionalDetails />,
      );
      const notesElement = rendered.find('PlainText');

      expect(notesElement).toExist();
      expect(notesElement).toHaveClassName('mechanic-block-notes');
      expect(notesElement).toHaveProp('text', mechanicWithNotes.notes);
    });

    it('should match the snapshot', () => {
      const rendered = shallow(
        <MechanicBlock {...defaultProps} data={mechanicWithNotes} showAdditionalDetails />,
      );

      expect(rendered).toMatchSnapshot();
    });
  });
});
