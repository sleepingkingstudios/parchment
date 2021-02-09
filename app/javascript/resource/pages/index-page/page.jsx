import React from 'react';
import PropTypes from 'prop-types';
import pluralize from 'pluralize';

import HeadingWithButtons from 'components/heading-with-buttons';
import Page from 'components/page';
import { valueOrDefault } from 'utils/object';
import {
  titleize,
  underscore,
} from 'utils/string';
import IndexPageContent from './content';

const defaultBreadcrumbs = [
  {
    label: 'Home',
    url: '/',
  },
];
const generateBreadcrumbs = ({ baseUrl, breadcrumbs, pluralDisplayName }) => (
  [
    ...valueOrDefault(breadcrumbs, defaultBreadcrumbs),
    {
      label: titleize(pluralDisplayName),
      url: `${baseUrl}`,
      active: true,
    },
  ]
);
const generateButtons = ({ baseUrl, singularDisplayName }) => (
  [
    {
      label: `Create ${titleize(singularDisplayName)}`,
      outline: true,
      url: `${baseUrl}/create`,
    },
  ]
);

const IndexPage = (props) => {
  const {
    Table,
    hooks,
    resourceName,
  } = props;
  const baseUrl = valueOrDefault(
    // eslint-disable-next-line react/destructuring-assignment
    props.baseUrl,
    `/${underscore(resourceName).replace(/_/g, '-')}`,
  );
  const pluralDisplayName = valueOrDefault(
    // eslint-disable-next-line react/destructuring-assignment
    props.pluralDisplayName,
    pluralize(resourceName),
  );
  const singularDisplayName = valueOrDefault(
    // eslint-disable-next-line react/destructuring-assignment
    props.singularDisplayName,
    pluralize.singular(resourceName),
  );
  const breadcrumbs = generateBreadcrumbs({
    baseUrl,
    // eslint-disable-next-line react/destructuring-assignment
    breadcrumbs: props.breadcrumbs,
    pluralDisplayName,
  });
  const buttons = generateButtons({ baseUrl, singularDisplayName });
  const {
    useData,
    useDataStatus,
    useDestroyRequest,
    useRequestData,
  } = hooks;
  const data = useData();
  const status = useDataStatus();
  const requestData = useRequestData();

  requestData();

  return (
    <Page breadcrumbs={breadcrumbs}>
      <HeadingWithButtons buttons={buttons}>
        {titleize(pluralDisplayName)}
      </HeadingWithButtons>

      <IndexPageContent
        Table={Table}
        data={data}
        pluralDisplayName={pluralDisplayName}
        resourceName={resourceName}
        singularDisplayName={singularDisplayName}
        status={status}
        useDestroyRequest={useDestroyRequest}
      />
    </Page>
  );
};

IndexPage.defaultProps = {
  Table: null,
  baseUrl: null,
  breadcrumbs: null,
  pluralDisplayName: null,
  singularDisplayName: null,
};

IndexPage.propTypes = {
  Table: PropTypes.elementType,
  baseUrl: PropTypes.string,
  breadcrumbs: PropTypes.arrayOf(PropTypes.object),
  hooks: PropTypes.shape({
    useData: PropTypes.func.isRequired,
    useDataStatus: PropTypes.func.isRequired,
    useDestroyRequest: PropTypes.func.isRequired,
    useRequestData: PropTypes.func.isRequired,
  }).isRequired,
  pluralDisplayName: PropTypes.string,
  resourceName: PropTypes.string.isRequired,
  singularDisplayName: PropTypes.string,
};

export default IndexPage;
