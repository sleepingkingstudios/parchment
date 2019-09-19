import React from 'react';
import PropTypes from 'prop-types';
import pluralize from 'pluralize';

import FormSelectInput from '../../../../components/form/select-input';
import { hooks } from '../../../store/formFindSources';
import { exists } from '../../../../utils/object';
import { capitalize } from '../../../../utils/string';

export const mapDataToSource = ({ data }) => {
  const { spell } = data;
  const { sourceId, sourceType } = spell;

  if (!(exists(sourceId) && exists(sourceType))) { return ''; }

  return `${capitalize(pluralize.singular(sourceType))} ${sourceId}`;
};

export const mapSourceToData = ({ value }) => {
  const [sourceType, sourceId] = value.split(' ');

  return { sourceId, sourceType };
};

const buildOptions = sourceTypes => (
  Object.entries(sourceTypes).map((sourceType) => {
    const [sourceName, sources] = sourceType;

    return {
      label: capitalize(sourceName),
      value: sources.map((source) => {
        const { id, name } = source;

        return {
          label: name,
          value: `${capitalize(pluralize.singular(sourceName))} ${id}`,
        };
      }),
    };
  })
);

const { useEndpoint } = hooks;

const SelectSpellSourceInput = ({ ...props }) => {
  const { data } = useEndpoint();
  const options = buildOptions(data);

  return (
    <FormSelectInput
      {...props}
      defaultOption="Homebrew"
      options={options}
    />
  );
};

SelectSpellSourceInput.defaultProps = {
  value: '',
};

SelectSpellSourceInput.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export default SelectSpellSourceInput;
