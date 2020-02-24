import PropTypes from 'prop-types';

export const mechanicType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  shortDescription: PropTypes.string.isRequired,
  notes: PropTypes.string,
});

export const mechanicListType = PropTypes.arrayOf(mechanicType);

export const bookFormType = PropTypes.shape(
  {
    mechanic: mechanicType,
  },
);

export const mechanicDefaultAttributes = {
  id: '',
  name: '',
  description: '',
  shortDescription: '',
  notes: '',
};

export const buildMechanic = (attributes = {}) => (
  Object.assign({}, attributes, mechanicDefaultAttributes)
);
