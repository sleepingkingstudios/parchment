import {
  camelizeKeys,
  dig,
  valueOrDefault,
} from '../../../utils/object';

const updateFormData = (options) => {
  const { formEndpoint } = options;
  const {
    actions,
    namespace,
  } = formEndpoint;

  const { setFormData } = actions;
  const mapData = valueOrDefault(options.mapData, obj => obj);

  const handleSuccess = next => ({ dispatch, getState, response }) => {
    next({ dispatch, getState, response });

    const data = camelizeKeys(valueOrDefault(dig(response, 'json', 'data'), {}));
    const mappedData = mapData(data);

    const action = setFormData(mappedData);

    dispatch(action);
  };

  const middleware = {
    handleSuccess,
    options: { mapData: options.mapData, namespace },
    type: 'api/updateFormData',
  };

  return middleware;
};

export default updateFormData;
