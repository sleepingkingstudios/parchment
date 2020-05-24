import pluralize from 'pluralize';

import {
  assign,
  dig,
  exists,
  valueOrDefault,
} from '../../../utils/object';
import { underscore, upperCamelize } from '../../../utils/string';

const findAssociationData = ({
  data,
  plural,
  resourceName,
}) => {
  if (plural) { return data[pluralize(underscore(resourceName))]; }

  const associationData = data[underscore(resourceName)];

  if (!exists(associationData)) { return undefined; }

  return [associationData];
};

const findAssociationById = ({ associationData, foreignKeyName, foreignKeyValue }) => {
  const actualForeignKeyName = valueOrDefault(foreignKeyName, 'id');

  return associationData.find(item => (item[actualForeignKeyName] === foreignKeyValue));
};

const findAssociationByIdAndType = ({
  associationData,
  foreignKeyName,
  foreignKeyValue,
  foreignTypeName,
  foreignTypeValue,
}) => {
  const actualForeignKeyName = valueOrDefault(foreignKeyName, 'id');
  const actualForeignTypeName = valueOrDefault(foreignTypeName, 'type');

  return associationData.find(item => (
    item[actualForeignKeyName] === foreignKeyValue
      && item[actualForeignTypeName] === foreignTypeValue
  ));
};

const findAssociation = ({
  data,
  foreignKeyName,
  foreignKeyValue,
  foreignTypeName,
  foreignTypeValue,
  plural,
  resourceName,
}) => {
  if (!exists(resourceName)) { return undefined; }

  const associationData = findAssociationData({
    data,
    plural,
    resourceName,
  });

  if (!exists(associationData)) { return undefined; }

  if (!exists(foreignTypeName)) {
    return findAssociationById({ associationData, foreignKeyName, foreignKeyValue });
  }

  return findAssociationByIdAndType({
    associationData,
    foreignKeyName,
    foreignKeyValue,
    foreignTypeName,
    foreignTypeValue,
  });
};

const collectBelongsToPolymorphicAssociation = ({
  associationName,
  data,
  plural,
  resource,
}) => {
  const modifiedData = Object.assign({}, resource);
  const foreignKeyValue = resource[`${associationName}_id`];
  const resourceName = resource[`${associationName}_type`];

  modifiedData[associationName] = findAssociation({
    data,
    foreignKeyValue,
    plural,
    resourceName,
  });

  return modifiedData;
};

const collectHasOnePolymorphicAssociation = ({
  associationName,
  data,
  inverseName,
  plural,
  resource,
  resourceName,
}) => {
  const modifiedData = Object.assign({}, resource);
  const foreignKeyName = `${inverseName}_id`;
  const foreignKeyValue = resource.id;
  const foreignTypeName = `${inverseName}_type`;
  const foreignTypeValue = upperCamelize(pluralize(resourceName, 1));

  modifiedData[associationName] = findAssociation({
    data,
    foreignKeyName,
    foreignKeyValue,
    foreignTypeName,
    foreignTypeValue,
    plural,
    resourceName: associationName,
  });

  return modifiedData;
};

const getQualifiedAssociationType = ({ associationType, polymorphic }) => {
  if (!polymorphic) { return associationType; }

  return `${associationType}Polymorphic`;
};

const collectAssociation = (props) => {
  const { associationType, polymorphic, resource } = props;
  const qualifiedAssociationType = getQualifiedAssociationType({
    associationType,
    polymorphic,
  });

  switch (qualifiedAssociationType) {
    case 'belongsToPolymorphic':
      return collectBelongsToPolymorphicAssociation(props);
    case 'hasOnePolymorphic':
      return collectHasOnePolymorphicAssociation(props);
    default:
      return resource;
  }
};

const collectAssociations = ({
  associationName,
  associationType,
  inverseName,
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
      inverseName,
      polymorphic,
      resourceName,
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
  options: {
    associationName,
    associationType,
    inverseName,
    polymorphic,
    resourceName,
  },
  type: 'api/collectAssociations',
});

export default collectAssociations;
