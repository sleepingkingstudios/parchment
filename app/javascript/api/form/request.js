import ApiRequest from '../endpoint/request';
import { valueOrDefault } from '../../utils/object';

class FormRequest extends ApiRequest {
  constructor(options) {
    const {
      method,
      ...rest
    } = options;

    super({ method: valueOrDefault(method, 'POST'), ...rest });
  }
}

export default FormRequest;
