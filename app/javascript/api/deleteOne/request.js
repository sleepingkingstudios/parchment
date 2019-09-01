import ApiRequest from '../endpoint/request';
import { valueOrDefault } from '../../utils/object';

class DeleteOneRequest extends ApiRequest {
  constructor(options) {
    const {
      method,
      ...rest
    } = options;

    super({ method: valueOrDefault(method, 'DELETE'), ...rest });
  }
}

export default DeleteOneRequest;
