import React from 'react';
import { shallow } from 'enzyme';

import ResponsiveSchool from './responsive-school';

const responsiveSizes = ['xs', 'sm', 'md', 'lg', 'xl'];

const parseResponsiveStyles = (classNames) => {
  const responsiveStyles = { xs: true };

  classNames.split(' ').forEach((className) => {
    if (!className.match(/^d-/)) { return; }

    const defaultMatch = className.match(/^d-(\w+)$/);

    if (defaultMatch) {
      const [, style] = defaultMatch;

      responsiveStyles.xs = style;
    }

    const sizeMatch = className.match(/^d-(\w\w)-(\w+)/);

    if (sizeMatch) {
      const [, size, style] = sizeMatch;

      responsiveStyles[size] = style;
    }
  });

  return responsiveStyles;
};

const isVisible = (className, size) => {
  if (typeof className === 'undefined') { return true; }

  const responsiveStyles = parseResponsiveStyles(className);
  const sizeIndex = responsiveSizes.indexOf(size);

  for (let i = sizeIndex; i >= 0; i -= 1) {
    const currentSize = responsiveSizes[i];
    const style = responsiveStyles[currentSize];

    if (style) { return style !== 'none'; }
  }

  return true;
};

const responsiveText = (wrapper, size) => {
  const children = wrapper.children();

  if (children.length === 0) { return wrapper.text(); }

  if (!isVisible(wrapper.prop('className'), size)) { return ''; }

  let buffer = '';

  wrapper.children().forEach((child) => {
    buffer += responsiveText(child, size);
  });

  return buffer;
};

describe('<ResponsiveSchool />', () => {
  const school = 'pyromancy';

  describe('with level: 0', () => {
    const level = 0;

    it('should match the snapshot', () => {
      const rendered = shallow(<ResponsiveSchool level={level} school={school} />);

      expect(rendered).toMatchSnapshot();
    });

    describe('when rendered at size: xs', () => {
      it('should display the level and school', () => {
        const rendered = shallow(<ResponsiveSchool level={level} school={school} />);

        expect(rendered).toHaveDisplayName('span');
        expect(responsiveText(rendered, 'xs')).toEqual(`Pyr ${level}`);
      });
    });

    describe('when rendered at size: sm', () => {
      it('should display the level and school', () => {
        const rendered = shallow(<ResponsiveSchool level={level} school={school} />);

        expect(rendered).toHaveDisplayName('span');
        expect(responsiveText(rendered, 'sm')).toEqual(`Pyr ${level}`);
      });
    });

    describe('when rendered at size: md', () => {
      it('should display the level and school', () => {
        const rendered = shallow(<ResponsiveSchool level={level} school={school} />);

        expect(rendered).toHaveDisplayName('span');
        expect(responsiveText(rendered, 'md')).toEqual(`Pyromancy ${level}`);
      });
    });

    describe('when rendered at size: lg', () => {
      it('should display the level and school', () => {
        const rendered = shallow(<ResponsiveSchool level={level} school={school} />);

        expect(rendered).toHaveDisplayName('span');
        expect(responsiveText(rendered, 'lg')).toEqual('Pyromancy cantrip');
      });
    });
  });

  describe('with level: 1', () => {
    const level = 1;

    it('should match the snapshot', () => {
      const rendered = shallow(<ResponsiveSchool level={level} school={school} />);

      expect(rendered).toMatchSnapshot();
    });

    describe('when rendered at size: xs', () => {
      it('should display the level and school', () => {
        const rendered = shallow(<ResponsiveSchool level={level} school={school} />);

        expect(rendered).toHaveDisplayName('span');
        expect(responsiveText(rendered, 'xs')).toEqual(`Pyr ${level}`);
      });
    });

    describe('when rendered at size: sm', () => {
      it('should display the level and school', () => {
        const rendered = shallow(<ResponsiveSchool level={level} school={school} />);

        expect(rendered).toHaveDisplayName('span');
        expect(responsiveText(rendered, 'sm')).toEqual(`Pyr ${level}`);
      });
    });

    describe('when rendered at size: md', () => {
      it('should display the level and school', () => {
        const rendered = shallow(<ResponsiveSchool level={level} school={school} />);

        expect(rendered).toHaveDisplayName('span');
        expect(responsiveText(rendered, 'md')).toEqual(`Pyromancy ${level}`);
      });
    });

    describe('when rendered at size: lg', () => {
      it('should display the level and school', () => {
        const rendered = shallow(<ResponsiveSchool level={level} school={school} />);

        expect(rendered).toHaveDisplayName('span');
        expect(responsiveText(rendered, 'lg')).toEqual('1st-level pyromancy');
      });
    });
  });

  describe('with level: 2', () => {
    const level = 2;

    it('should match the snapshot', () => {
      const rendered = shallow(<ResponsiveSchool level={level} school={school} />);

      expect(rendered).toMatchSnapshot();
    });

    describe('when rendered at size: xs', () => {
      it('should display the level and school', () => {
        const rendered = shallow(<ResponsiveSchool level={level} school={school} />);

        expect(rendered).toHaveDisplayName('span');
        expect(responsiveText(rendered, 'xs')).toEqual(`Pyr ${level}`);
      });
    });

    describe('when rendered at size: sm', () => {
      it('should display the level and school', () => {
        const rendered = shallow(<ResponsiveSchool level={level} school={school} />);

        expect(rendered).toHaveDisplayName('span');
        expect(responsiveText(rendered, 'sm')).toEqual(`Pyr ${level}`);
      });
    });

    describe('when rendered at size: md', () => {
      it('should display the level and school', () => {
        const rendered = shallow(<ResponsiveSchool level={level} school={school} />);

        expect(rendered).toHaveDisplayName('span');
        expect(responsiveText(rendered, 'md')).toEqual(`Pyromancy ${level}`);
      });
    });

    describe('when rendered at size: lg', () => {
      it('should display the level and school', () => {
        const rendered = shallow(<ResponsiveSchool level={level} school={school} />);

        expect(rendered).toHaveDisplayName('span');
        expect(responsiveText(rendered, 'lg')).toEqual('2nd-level pyromancy');
      });
    });
  });

  describe('with level: 3', () => {
    const level = 3;

    it('should match the snapshot', () => {
      const rendered = shallow(<ResponsiveSchool level={level} school={school} />);

      expect(rendered).toMatchSnapshot();
    });

    describe('when rendered at size: xs', () => {
      it('should display the level and school', () => {
        const rendered = shallow(<ResponsiveSchool level={level} school={school} />);

        expect(rendered).toHaveDisplayName('span');
        expect(responsiveText(rendered, 'xs')).toEqual(`Pyr ${level}`);
      });
    });

    describe('when rendered at size: sm', () => {
      it('should display the level and school', () => {
        const rendered = shallow(<ResponsiveSchool level={level} school={school} />);

        expect(rendered).toHaveDisplayName('span');
        expect(responsiveText(rendered, 'sm')).toEqual(`Pyr ${level}`);
      });
    });

    describe('when rendered at size: md', () => {
      it('should display the level and school', () => {
        const rendered = shallow(<ResponsiveSchool level={level} school={school} />);

        expect(rendered).toHaveDisplayName('span');
        expect(responsiveText(rendered, 'md')).toEqual(`Pyromancy ${level}`);
      });
    });

    describe('when rendered at size: lg', () => {
      it('should display the level and school', () => {
        const rendered = shallow(<ResponsiveSchool level={level} school={school} />);

        expect(rendered).toHaveDisplayName('span');
        expect(responsiveText(rendered, 'lg')).toEqual('3rd-level pyromancy');
      });
    });
  });

  describe('with level: 4+', () => {
    const level = 4;

    it('should match the snapshot', () => {
      const rendered = shallow(<ResponsiveSchool level={level} school={school} />);

      expect(rendered).toMatchSnapshot();
    });

    describe('when rendered at size: xs', () => {
      it('should display the level and school', () => {
        const rendered = shallow(<ResponsiveSchool level={level} school={school} />);

        expect(rendered).toHaveDisplayName('span');
        expect(responsiveText(rendered, 'xs')).toEqual(`Pyr ${level}`);
      });
    });

    describe('when rendered at size: sm', () => {
      it('should display the level and school', () => {
        const rendered = shallow(<ResponsiveSchool level={level} school={school} />);

        expect(rendered).toHaveDisplayName('span');
        expect(responsiveText(rendered, 'sm')).toEqual(`Pyr ${level}`);
      });
    });

    describe('when rendered at size: md', () => {
      it('should display the level and school', () => {
        const rendered = shallow(<ResponsiveSchool level={level} school={school} />);

        expect(rendered).toHaveDisplayName('span');
        expect(responsiveText(rendered, 'md')).toEqual(`Pyromancy ${level}`);
      });
    });

    describe('when rendered at size: lg', () => {
      it('should display the level and school', () => {
        const rendered = shallow(<ResponsiveSchool level={level} school={school} />);

        expect(rendered).toHaveDisplayName('span');
        expect(responsiveText(rendered, 'lg')).toEqual('4th-level pyromancy');
      });
    });
  });
});
