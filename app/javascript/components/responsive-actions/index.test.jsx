import React from 'react';
import { shallow } from 'enzyme';

import ResponsiveActions from './index';

import { responsiveText } from '../../utils/react';

describe('<ResponsiveActions />', () => {
  const id = '00000000-0000-0000-0000-000000000000';
  const resourceName = 'widget';
  const defaultProps = { id, resourceName };

  describe('with default props', () => {
    it('should render the actions', () => {
      const rendered = shallow(<ResponsiveActions {...defaultProps} />);

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('responsive-actions');
      expect(rendered).toHaveClassName('widget-actions');
    });

    it('should render the show link', () => {
      const rendered = shallow(<ResponsiveActions {...defaultProps} />);
      const showLink = rendered.find('.show-link');
      const renderedLink = showLink.shallow();
      const url = `/widgets/${id}`;

      expect(showLink).toExist();
      expect(showLink).toHaveDisplayName('LinkButton');
      expect(showLink).toHaveClassName('show-widget-link');
      expect(showLink).toHaveProp({ url });

      expect(responsiveText(renderedLink, 'xs')).toEqual('<EyeIcon />');
      expect(responsiveText(renderedLink, 'sm')).toEqual('<EyeIcon />');
      expect(responsiveText(renderedLink, 'md')).toEqual('<EyeIcon />');
      expect(responsiveText(renderedLink, 'lg')).toEqual('Show');
      expect(responsiveText(renderedLink, 'xl')).toEqual('<EyeIcon />Show');
    });

    it('should render the update link', () => {
      const rendered = shallow(<ResponsiveActions {...defaultProps} />);
      const updateLink = rendered.find('.update-link');
      const renderedLink = updateLink.shallow();
      const url = `/widgets/${id}/update`;

      expect(updateLink).toExist();
      expect(updateLink).toHaveDisplayName('LinkButton');
      expect(updateLink).toHaveClassName('update-widget-link');
      expect(updateLink).toHaveProp({ url });

      expect(responsiveText(renderedLink, 'xs')).toEqual('');
      expect(responsiveText(renderedLink, 'sm')).toEqual('');
      expect(responsiveText(renderedLink, 'md')).toEqual('<PencilSquareIcon />');
      expect(responsiveText(renderedLink, 'lg')).toEqual('Update');
      expect(responsiveText(renderedLink, 'xl')).toEqual('<PencilSquareIcon />Update');
    });

    it('should not render the delete link', () => {
      const rendered = shallow(<ResponsiveActions {...defaultProps} />);
      const deleteLink = rendered.find('.delete-link');

      expect(deleteLink).not.toExist();
    });

    it('should match the snapshot', () => {
      const rendered = shallow(<ResponsiveActions {...defaultProps} />);

      expect(rendered).toMatchSnapshot();
    });
  });

  describe('with actions: an array that does not include "destroy"', () => {
    const actions = ['show', 'update'];

    it('should render the show link', () => {
      const rendered = shallow(<ResponsiveActions {...defaultProps} actions={actions} />);
      const showLink = rendered.find('.show-link');
      const renderedLink = showLink.shallow();
      const url = `/widgets/${id}`;

      expect(showLink).toExist();
      expect(showLink).toHaveDisplayName('LinkButton');
      expect(showLink).toHaveClassName('show-widget-link');
      expect(showLink).toHaveProp({ url });

      expect(responsiveText(renderedLink, 'xs')).toEqual('<EyeIcon />');
      expect(responsiveText(renderedLink, 'sm')).toEqual('<EyeIcon />');
      expect(responsiveText(renderedLink, 'md')).toEqual('<EyeIcon />');
      expect(responsiveText(renderedLink, 'lg')).toEqual('Show');
      expect(responsiveText(renderedLink, 'xl')).toEqual('<EyeIcon />Show');
    });

    it('should render the update link', () => {
      const rendered = shallow(<ResponsiveActions {...defaultProps} actions={actions} />);
      const updateLink = rendered.find('.update-link');
      const renderedLink = updateLink.shallow();
      const url = `/widgets/${id}/update`;

      expect(updateLink).toExist();
      expect(updateLink).toHaveDisplayName('LinkButton');
      expect(updateLink).toHaveClassName('update-widget-link');
      expect(updateLink).toHaveProp({ url });

      expect(responsiveText(renderedLink, 'xs')).toEqual('');
      expect(responsiveText(renderedLink, 'sm')).toEqual('');
      expect(responsiveText(renderedLink, 'md')).toEqual('<PencilSquareIcon />');
      expect(responsiveText(renderedLink, 'lg')).toEqual('Update');
      expect(responsiveText(renderedLink, 'xl')).toEqual('<PencilSquareIcon />Update');
    });

    it('should not render the delete link', () => {
      const rendered = shallow(<ResponsiveActions {...defaultProps} actions={actions} />);
      const deleteLink = rendered.find('.delete-link');

      expect(deleteLink).not.toExist();
    });
  });

  describe('with actions: an array that does not include "show"', () => {
    const actions = ['update', 'destroy'];

    it('should render the actions', () => {
      const rendered = shallow(<ResponsiveActions {...defaultProps} actions={actions} />);

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('responsive-actions');
      expect(rendered).toHaveClassName('widget-actions');
    });

    it('should not render the show link', () => {
      const rendered = shallow(<ResponsiveActions {...defaultProps} actions={actions} />);
      const showLink = rendered.find('.show-link');

      expect(showLink).not.toExist();
    });

    it('should render the update link', () => {
      const rendered = shallow(<ResponsiveActions {...defaultProps} actions={actions} />);
      const updateLink = rendered.find('.update-link');
      const renderedLink = updateLink.shallow();
      const url = `/widgets/${id}/update`;

      expect(updateLink).toExist();
      expect(updateLink).toHaveDisplayName('LinkButton');
      expect(updateLink).toHaveClassName('update-widget-link');
      expect(updateLink).toHaveProp({ url });

      expect(responsiveText(renderedLink, 'xs')).toEqual('');
      expect(responsiveText(renderedLink, 'sm')).toEqual('');
      expect(responsiveText(renderedLink, 'md')).toEqual('<PencilSquareIcon />');
      expect(responsiveText(renderedLink, 'lg')).toEqual('Update');
      expect(responsiveText(renderedLink, 'xl')).toEqual('<PencilSquareIcon />Update');
    });

    it('should not render the delete link', () => {
      const rendered = shallow(<ResponsiveActions {...defaultProps} actions={actions} />);
      const deleteLink = rendered.find('.delete-link');

      expect(deleteLink).not.toExist();
    });
  });

  describe('with actions: an array that does not include "update"', () => {
    const actions = ['show', 'destroy'];

    it('should render the actions', () => {
      const rendered = shallow(<ResponsiveActions {...defaultProps} actions={actions} />);

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('responsive-actions');
      expect(rendered).toHaveClassName('widget-actions');
    });

    it('should render the show link', () => {
      const rendered = shallow(<ResponsiveActions {...defaultProps} actions={actions} />);
      const showLink = rendered.find('.show-link');
      const renderedLink = showLink.shallow();
      const url = `/widgets/${id}`;

      expect(showLink).toExist();
      expect(showLink).toHaveDisplayName('LinkButton');
      expect(showLink).toHaveClassName('show-widget-link');
      expect(showLink).toHaveProp({ url });

      expect(responsiveText(renderedLink, 'xs')).toEqual('<EyeIcon />');
      expect(responsiveText(renderedLink, 'sm')).toEqual('<EyeIcon />');
      expect(responsiveText(renderedLink, 'md')).toEqual('<EyeIcon />');
      expect(responsiveText(renderedLink, 'lg')).toEqual('Show');
      expect(responsiveText(renderedLink, 'xl')).toEqual('<EyeIcon />Show');
    });

    it('should not render the update link', () => {
      const rendered = shallow(<ResponsiveActions {...defaultProps} actions={actions} />);
      const updateLink = rendered.find('.update-link');

      expect(updateLink).not.toExist();
    });

    it('should not render the delete link', () => {
      const rendered = shallow(<ResponsiveActions {...defaultProps} actions={actions} />);
      const deleteLink = rendered.find('.delete-link');

      expect(deleteLink).not.toExist();
    });
  });

  describe('with baseUrl: value', () => {
    const baseUrl = '/path/to/widgets';

    it('should render the show link', () => {
      const rendered = shallow(<ResponsiveActions {...defaultProps} baseUrl={baseUrl} />);
      const showLink = rendered.find('.show-link');
      const url = `/path/to/widgets/${id}`;

      expect(showLink).toExist();
      expect(showLink).toHaveDisplayName('LinkButton');
      expect(showLink).toHaveClassName('show-widget-link');
      expect(showLink).toHaveProp({ url });
    });

    it('should render the update link', () => {
      const rendered = shallow(<ResponsiveActions {...defaultProps} baseUrl={baseUrl} />);
      const updateLink = rendered.find('.update-link');
      const url = `/path/to/widgets/${id}/update`;

      expect(updateLink).toExist();
      expect(updateLink).toHaveDisplayName('LinkButton');
      expect(updateLink).toHaveClassName('update-widget-link');
      expect(updateLink).toHaveProp({ url });
    });
  });

  describe('with baseUrl: value and slug: value', () => {
    const baseUrl = '/path/to/widgets';
    const slug = 'custom-slug';

    it('should render the show link', () => {
      const rendered = shallow(
        <ResponsiveActions {...defaultProps} baseUrl={baseUrl} slug={slug} />,
      );
      const showLink = rendered.find('.show-link');
      const url = `/path/to/widgets/${slug}`;

      expect(showLink).toExist();
      expect(showLink).toHaveDisplayName('LinkButton');
      expect(showLink).toHaveClassName('show-widget-link');
      expect(showLink).toHaveProp({ url });
    });

    it('should render the update link', () => {
      const rendered = shallow(
        <ResponsiveActions {...defaultProps} baseUrl={baseUrl} slug={slug} />,
      );
      const updateLink = rendered.find('.update-link');
      const url = `/path/to/widgets/${slug}/update`;

      expect(updateLink).toExist();
      expect(updateLink).toHaveDisplayName('LinkButton');
      expect(updateLink).toHaveClassName('update-widget-link');
      expect(updateLink).toHaveProp({ url });
    });
  });

  describe('with deleteEndpoint: endpoint', () => {
    const onClick = jest.fn();
    const useDeleteData = jest.fn(() => onClick);
    const deleteEndpoint = { hooks: { useDeleteData } };

    afterEach(() => { useDeleteData.mockClear(); });

    it('should render the delete link', () => {
      const rendered = shallow(
        <ResponsiveActions {...defaultProps} deleteEndpoint={deleteEndpoint} />,
      );
      const deleteLink = rendered.find('.delete-link');
      const renderedLink = deleteLink.shallow();

      expect(deleteLink).toExist();
      expect(deleteLink).toHaveDisplayName('Button');
      expect(deleteLink).toHaveClassName('delete-widget-link');
      expect(deleteLink).toHaveProp({ onClick });

      expect(responsiveText(renderedLink, 'xs')).toEqual('');
      expect(responsiveText(renderedLink, 'sm')).toEqual('');
      expect(responsiveText(renderedLink, 'md')).toEqual('<TrashIcon />');
      expect(responsiveText(renderedLink, 'lg')).toEqual('Delete');
      expect(responsiveText(renderedLink, 'xl')).toEqual('<TrashIcon />Delete');
    });

    it('should call the useDeleteData hook', () => {
      shallow(
        <ResponsiveActions {...defaultProps} deleteEndpoint={deleteEndpoint} />,
      );

      expect(useDeleteData).toHaveBeenCalledWith({ wildcards: { id } });
    });

    describe('with actions: an array that does not include "delete"', () => {
      const actions = ['show', 'update'];

      it('should not render the delete link', () => {
        const rendered = shallow(
          <ResponsiveActions
            {...defaultProps}
            deleteEndpoint={deleteEndpoint}
            actions={actions}
          />,
        );
        const deleteLink = rendered.find('.delete-link');

        expect(deleteLink).not.toExist();
      });
    });
  });

  describe('with deleteEndpoint: endpoint and onDelete: function', () => {
    let callback;
    const onClick = jest.fn();
    const useDeleteData = jest.fn(
      ({ onSuccess }) => {
        callback = onSuccess;

        return onClick;
      },
    );
    const deleteEndpoint = { hooks: { useDeleteData } };
    const onDelete = jest.fn();

    afterEach(() => {
      onDelete.mockClear();

      callback = null;
    });

    it('should call the useDeleteData hook with the callback', () => {
      const next = jest.fn();
      const props = { key: 'value' };

      shallow(
        <ResponsiveActions
          {...defaultProps}
          deleteEndpoint={deleteEndpoint}
          onDelete={onDelete}
        />,
      );

      expect(typeof callback).toEqual('function');

      callback(next)(props);

      expect(next).toHaveBeenCalledWith(props);
      expect(onDelete).toHaveBeenCalledWith(props);
    });
  });

  describe('with slug: value', () => {
    const slug = 'custom-slug';

    it('should render the show link', () => {
      const rendered = shallow(<ResponsiveActions {...defaultProps} slug={slug} />);
      const showLink = rendered.find('.show-link');
      const url = `/widgets/${slug}`;

      expect(showLink).toExist();
      expect(showLink).toHaveDisplayName('LinkButton');
      expect(showLink).toHaveClassName('show-widget-link');
      expect(showLink).toHaveProp({ url });
    });

    it('should render the update link', () => {
      const rendered = shallow(<ResponsiveActions {...defaultProps} slug={slug} />);
      const updateLink = rendered.find('.update-link');
      const url = `/widgets/${slug}/update`;

      expect(updateLink).toExist();
      expect(updateLink).toHaveDisplayName('LinkButton');
      expect(updateLink).toHaveClassName('update-widget-link');
      expect(updateLink).toHaveProp({ url });
    });
  });

  describe('with useDestroyRequest: function', () => {
    const onClick = jest.fn();
    const useDestroyRequest = jest.fn(() => onClick);

    afterEach(() => { useDestroyRequest.mockClear(); });

    it('should render the delete link', () => {
      const rendered = shallow(
        <ResponsiveActions {...defaultProps} useDestroyRequest={useDestroyRequest} />,
      );
      const deleteLink = rendered.find('.delete-link');
      const renderedLink = deleteLink.shallow();

      expect(deleteLink).toExist();
      expect(deleteLink).toHaveDisplayName('Button');
      expect(deleteLink).toHaveClassName('delete-widget-link');
      expect(deleteLink).toHaveProp({ onClick });

      expect(responsiveText(renderedLink, 'xs')).toEqual('');
      expect(responsiveText(renderedLink, 'sm')).toEqual('');
      expect(responsiveText(renderedLink, 'md')).toEqual('<TrashIcon />');
      expect(responsiveText(renderedLink, 'lg')).toEqual('Delete');
      expect(responsiveText(renderedLink, 'xl')).toEqual('<TrashIcon />Delete');
    });

    it('should call the useDestroyRequest hook', () => {
      shallow(
        <ResponsiveActions {...defaultProps} useDestroyRequest={useDestroyRequest} />,
      );

      expect(useDestroyRequest).toHaveBeenCalledWith({ wildcards: { id } });
    });

    describe('with actions: an array that does not include "destroy"', () => {
      const actions = ['show', 'update'];

      it('should not render the delete link', () => {
        const rendered = shallow(
          <ResponsiveActions
            {...defaultProps}
            useDestroyRequest={useDestroyRequest}
            actions={actions}
          />,
        );
        const deleteLink = rendered.find('.delete-link');

        expect(deleteLink).not.toExist();
      });
    });
  });
});
