import ApiRequest from '../endpoint/request';
import { valueOrDefault } from '../../utils/object';

class FindManyRequest extends ApiRequest {
  constructor(options) {
    const {
      method,
      ...rest
    } = options;

    super({ method: valueOrDefault(method, 'GET'), ...rest });
  }
}

export default FindManyRequest;
