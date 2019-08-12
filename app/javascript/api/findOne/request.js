import ApiRequest from '../endpoint/request';
import { valueOrDefault } from '../../utils/object';

class FindOneRequest extends ApiRequest {
  constructor(options) {
    const {
      method,
      ...rest
    } = options;

    super({ method: valueOrDefault(method, 'GET'), ...rest });
  }
}

export default FindOneRequest;
