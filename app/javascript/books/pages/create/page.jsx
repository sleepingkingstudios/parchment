import React from 'react';

import { BookForm } from '../../components/form';
import { CreatePage } from '../../../components/create-page';
import endpoint from '../../store/createBookForm';

const CreateBookPage = () => (
  <CreatePage
    Form={BookForm}
    endpoint={endpoint}
    mapData={data => data}
    resourceName="Book"
  />
);

CreateBookPage.defaultProps = {};

CreateBookPage.propTypes = {};

export default CreateBookPage;
