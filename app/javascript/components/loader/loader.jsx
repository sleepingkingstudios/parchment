import { Component } from 'react';
import PropTypes from 'prop-types';

import { formErrorsType } from '../form/entities';

class ApiLoader extends Component {
  componentDidMount() {
    const {
      performRequest,
      requestOptions,
    } = this.props;

    performRequest(requestOptions);
  }

  render() {
    const {
      data,
      errors,
      render,
      status,
      mapDataToProps,
    } = this.props;

    return render(
      Object.assign(
        { errors, status },
        mapDataToProps(data),
      ),
    );
  }
}

ApiLoader.defaultProps = {
  mapDataToProps: data => ({ data }),
  requestOptions: {},
};

ApiLoader.propTypes = {
  /* eslint-disable-next-line react/forbid-prop-types */
  data: PropTypes.object.isRequired,
  /* eslint-disable-next-line react/forbid-prop-types */
  errors: formErrorsType.isRequired,
  mapDataToProps: PropTypes.func,
  performRequest: PropTypes.func.isRequired,
  /* eslint-disable-next-line react/forbid-prop-types */
  requestOptions: PropTypes.object,
  render: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
};

export default ApiLoader;
