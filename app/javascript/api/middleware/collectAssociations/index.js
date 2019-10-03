import pluralize from 'pluralize';

import { assign, dig, exists } from '../../../utils/object';
import { underscore } from '../../../utils/string';

const findAssociation = ({
  data,
  foreignKey,
  foreignType,
  plural,
}) => {
  if (!exists(foreignType)) { return undefined; }

  if (!plural) { return data[underscore(foreignType)]; }

  const key = pluralize(underscore(foreignType));

  const associationData = data[key];

  if (!exists(associationData)) { return undefined; }

  return associationData.find(item => (item.id === foreignKey));
};

const collectBelongsToPolymorphicAssociation = ({
  associationName,
  data,
  plural,
  resource,
}) => {
  const modifiedData = Object.assign({}, resource);
  const foreignKey = resource[`${associationName}_id`];
  const foreignType = resource[`${associationName}_type`];

  modifiedData[associationName] = findAssociation({
    data,
    foreignKey,
    foreignType,
    plural,
  });

  return modifiedData;
};

const collectAssociation = ({
  associationName,
  associationType,
  data,
  plural,
  polymorphic,
  resource,
}) => {
  if (associationType === 'belongsTo') {
    if (polymorphic) {
      return collectBelongsToPolymorphicAssociation({
        associationName,
        data,
        plural,
        resource,
      });
    }
  }

  return resource;
};

const collectAssociations = ({
  associationName,
  associationType,
  polymorphic,
  resourceName,
}) => ({
  handleSuccess: next => ({ dispatch, getState, response }) => {
    const data = dig(response, 'json', 'data');

    let resource = data[resourceName];
    const options = {
      associationName,
      associationType,
      data,
      polymorphic,
    };

    if (Array.isArray(resource)) {
      resource = resource.map(item => collectAssociation({
        ...options,
        plural: true,
        resource: item,
      }));
    } else {
      resource = collectAssociation({
        ...options,
        plural: false,
        resource,
      });
    }
    const modifiedResponse = assign(response, resource, 'json', 'data', resourceName);

    next({ dispatch, getState, response: modifiedResponse });
  },
});

export default collectAssociations;
