import React from 'react';
import { shallow } from 'enzyme';

import Page from './index';

describe('<Page />', () => {
  const props = { title: 'Example Title' };
  const rendered = shallow(<Page {...props} />);

  it('should set the className', () => {
    expect(rendered).toHaveClassName('container page');
  });

  it('should render the header', () => {
    const header = rendered.find('PageHeader');

    expect(header).toExist();
    expect(header).toHaveProp('title', props.title);
  });

  describe('with className', () => {
    const renderedWithProps = shallow(
      <Page {...props} className="page-example" />,
    );

    it('should set the className', () => {
      expect(renderedWithProps).toHaveClassName('container page page-example');
    });
  });

  describe('with layout: fluid', () => {
    const renderedWithProps = shallow(<Page {...props} layout="fluid" />);

    it('should set the className', () => {
      expect(renderedWithProps).toHaveClassName('container-fluid page');
    });
  });

  describe('with children', () => {
    const children = (
      <dl className="mysteria">
        <dt>What lies beyond the furthest reaches of the sky?</dt>
        <dd>
          That which will lead the lost child back to her mother&apos;s arms.
          Exile.
        </dd>
      </dl>
    );
    const renderedWithChildren = shallow(
      <Page {...props}>
        { children }
      </Page>,
    );

    it('should render the children', () => {
      expect(renderedWithChildren).toContainMatchingElement('dl');
    });

    it('should render the term', () => {
      expect(renderedWithChildren.text())
        .toContain('What lies beyond the furthest reaches of the sky?');
    });

    it('should render the definition', () => {
      expect(renderedWithChildren.text())
        .toContain(
          'That which will lead the lost child back to her mother\'s arms. '
          + 'Exile.',
        );
    });
  });
});
