import React from 'react';
import { shallow } from 'enzyme';

import Breadcrumbs from '../breadcrumbs';
import Page from './index';

describe('<Page />', () => {
  const children = (
    <dl className="mysteria">
      <dt>What lies beyond the furthest reaches of the sky?</dt>
      <dd>
        That which will lead the lost child back to her mother&apos;s arms.
        Exile.
      </dd>
    </dl>
  );
  const defaultProps = { children };

  it('should wrap the contents in a div', () => {
    const rendered = shallow(<Page {...defaultProps} />);

    expect(rendered).toHaveDisplayName('div');
    expect(rendered).toHaveClassName('container');
    expect(rendered).toHaveClassName('page');
  });

  it('should render the header', () => {
    const rendered = shallow(<Page {...defaultProps} />);
    const header = rendered.find('PageHeader');

    expect(header).toExist();
    expect(header).toHaveProp('title', 'Parchment');
    expect(header).toHaveProp('subtitle', '5e Campaign Companion');
    expect(header).toHaveProp({ showNavigation: true });
  });

  it('should render the current user', () => {
    const rendered = shallow(<Page {...defaultProps} />);
    const connected = rendered.find('ConnectedCurrentUser');

    expect(connected).toExist();
  });

  it('should render the alerts', () => {
    const rendered = shallow(<Page {...defaultProps} />);
    const connected = rendered.find('Connect(Alerts)').at(0);

    expect(connected).toExist();
  });

  it('should render the children', () => {
    const rendered = shallow(<Page {...defaultProps} />);

    expect(rendered).toContainReact(children);
  });

  it('should render the footer', () => {
    const rendered = shallow(<Page {...defaultProps} />);
    const footer = rendered.find('PageFooter');

    expect(footer).toExist();
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<Page {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });

  describe('with custom props', () => {
    const props = {
      ...defaultProps,
      className: 'page-example',
      subtitle: 'Example Subtitle',
      title: 'Example Title',
    };

    it('should wrap the contents in a div', () => {
      const rendered = shallow(<Page {...props} />);
      const { className } = props;

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('container');
      expect(rendered).toHaveClassName('page');
      expect(rendered).toHaveClassName(className);
    });

    it('should render the header', () => {
      const rendered = shallow(<Page {...props} />);
      const header = rendered.find('PageHeader');
      const { title, subtitle } = props;

      expect(header).toExist();
      expect(header).toHaveProp({ title });
      expect(header).toHaveProp({ subtitle });
    });
  });

  describe('with breadcrumbs: component', () => {
    const breadcrumbs = [
      {
        label: 'Root',
        url: '/',
      },
      {
        label: 'Directory',
        url: '/directory',
      },
      {
        label: 'Page',
        active: true,
      },
    ];
    const CustomBreadcrumbs = (<Breadcrumbs breadcrumbs={breadcrumbs} />);
    const props = { ...defaultProps, breadcrumbs: CustomBreadcrumbs };

    it('should render the footer', () => {
      const rendered = shallow(<Page {...props} />);
      const footer = rendered.find('PageFooter');

      expect(footer).toExist();
      expect(footer).toHaveProp({ breadcrumbs: CustomBreadcrumbs });
    });
  });

  describe('with breadcrumbs: value', () => {
    const breadcrumbs = [
      {
        label: 'Root',
        url: '/',
      },
      {
        label: 'Directory',
        url: '/directory',
      },
      {
        label: 'Page',
        active: true,
      },
    ];
    const props = { ...defaultProps, breadcrumbs };

    it('should render the footer', () => {
      const rendered = shallow(<Page {...props} />);
      const footer = rendered.find('PageFooter');

      expect(footer).toExist();
      expect(footer).toHaveProp({ breadcrumbs });
    });
  });

  describe('with layout: fluid', () => {
    const props = { ...defaultProps, layout: 'fluid' };

    it('should wrap the contents in a div', () => {
      const rendered = shallow(<Page {...props} />);

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('container-fluid');
      expect(rendered).toHaveClassName('page');
    });
  });

  describe('with showNavigation: false', () => {
    const props = { ...defaultProps, showNavigation: false };

    it('should render the header', () => {
      const rendered = shallow(<Page {...props} />);
      const header = rendered.find('PageHeader');

      expect(header).toExist();
      expect(header).toHaveProp('title', 'Parchment');
      expect(header).toHaveProp('subtitle', '5e Campaign Companion');
      expect(header).toHaveProp({ showNavigation: false });
    });
  });

  describe('with showUser: false', () => {
    it('should not render the current user', () => {
      const rendered = shallow(<Page {...defaultProps} showUser={false} />);
      const connected = rendered.find('ConnectedCurrentUser');

      expect(connected).not.toExist();
    });
  });
});
