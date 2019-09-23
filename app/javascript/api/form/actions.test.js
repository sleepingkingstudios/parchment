import generateActions from './actions';

describe('Form request actions', () => {
  const namespace = 'createWidget';
  const {
    REQUEST_FAILURE,
    REQUEST_PENDING,
    REQUEST_SUCCESS,
    SET_FORM_DATA,
    UPDATE_FORM_DATA,
    UPDATE_FORM_FIELD,
    requestFailure,
    requestPending,
    requestSuccess,
    setFormData,
    updateFormData,
    updateFormField,
  } = generateActions({ namespace });

  describe('generateActions', () => {
    it('should be a function', () => {
      expect(typeof generateActions).toEqual('function');
    });
  });

  describe('REQUEST_FAILURE', () => {
    it('should define the namespaced action', () => {
      expect(REQUEST_FAILURE).toEqual(`${namespace}/requestFailure`);
    });
  });

  describe('REQUEST_PENDING', () => {
    it('should define the namespaced action', () => {
      expect(REQUEST_PENDING).toEqual(`${namespace}/requestPending`);
    });
  });

  describe('REQUEST_SUCCESS', () => {
    it('should define the namespaced action', () => {
      expect(REQUEST_SUCCESS).toEqual(`${namespace}/requestSuccess`);
    });
  });

  describe('SET_FORM_DATA', () => {
    it('should define the namespaced action', () => {
      expect(SET_FORM_DATA).toEqual(`${namespace}/setFormData`);
    });
  });

  describe('UPDATE_FORM_DATA', () => {
    it('should define the namespaced action', () => {
      expect(UPDATE_FORM_DATA).toEqual(`${namespace}/updateFormData`);
    });
  });

  describe('UPDATE_FORM_FIELD', () => {
    it('should define the namespaced action', () => {
      expect(UPDATE_FORM_FIELD).toEqual(`${namespace}/updateFormField`);
    });
  });

  describe('requestFailure', () => {
    it('should be a function', () => {
      expect(typeof requestFailure).toEqual('function');
    });

    it('should create the action', () => {
      const errors = {
        name: ['is Inigo Montoya', 'you kill my father', 'prepare to die'],
      };
      const action = requestFailure(errors);

      expect(action).toEqual({
        type: REQUEST_FAILURE,
        payload: { errors },
      });
    });
  });

  describe('requestPending', () => {
    it('should be a function', () => {
      expect(typeof requestPending).toEqual('function');
    });

    it('should create the action', () => {
      const action = requestPending();

      expect(action).toEqual({ type: REQUEST_PENDING, payload: {} });
    });
  });

  describe('requestSuccess', () => {
    it('should be a function', () => {
      expect(typeof requestSuccess).toEqual('function');
    });

    it('should create the action', () => {
      const data = {
        id: '00000000-0000-0000-0000-000000000000',
        name: 'Inigo Montoya',
      };
      const action = requestSuccess(data);

      expect(action).toEqual({
        type: REQUEST_SUCCESS,
        payload: { data },
      });
    });
  });

  describe('setFormData', () => {
    it('should be a function', () => {
      expect(typeof setFormData).toEqual('function');
    });

    it('should create the action', () => {
      const data = {
        id: '00000000-0000-0000-0000-000000000000',
        name: 'Inigo Montoya',
      };
      const action = setFormData(data);

      expect(action).toEqual({
        type: SET_FORM_DATA,
        payload: { data },
      });
    });
  });

  describe('updateFormData', () => {
    it('should be a function', () => {
      expect(typeof updateFormData).toEqual('function');
    });

    it('should create the action', () => {
      const data = {
        name: 'Roberts',
        occupation: 'Dread Pirate',
      };
      const action = updateFormData({ data });

      expect(action).toEqual({
        type: UPDATE_FORM_DATA,
        payload: {
          path: [],
          data,
        },
      });
    });

    describe('with path: array', () => {
      it('should create the action', () => {
        const path = ['films', 'romance', 'characters'];
        const data = {
          name: 'Roberts',
          occupation: 'Dread Pirate',
        };
        const action = updateFormData({ data, path });

        expect(action).toEqual({
          type: UPDATE_FORM_DATA,
          payload: {
            path,
            data,
          },
        });
      });
    });

    describe('with path: value', () => {
      it('should create the action', () => {
        const path = 'characters';
        const data = {
          name: 'Roberts',
          occupation: 'Dread Pirate',
        };
        const action = updateFormData({ data, path });

        expect(action).toEqual({
          type: UPDATE_FORM_DATA,
          payload: {
            path: [path],
            data,
          },
        });
      });
    });
  });

  describe('updateFormField', () => {
    it('should be a function', () => {
      expect(typeof updateFormField).toEqual('function');
    });

    it('should create the action', () => {
      const propName = 'name';
      const value = 'Inigo Montoya';
      const action = updateFormField({ propName, value });

      expect(action).toEqual({
        type: UPDATE_FORM_FIELD,
        payload: {
          path: [],
          propName,
          value,
        },
      });
    });

    describe('with path: array', () => {
      it('should create the action', () => {
        const path = ['films', 'romance', 'characters'];
        const propName = 'name';
        const value = 'Inigo Montoya';
        const action = updateFormField({ path, propName, value });

        expect(action).toEqual({
          type: UPDATE_FORM_FIELD,
          payload: {
            path,
            propName,
            value,
          },
        });
      });
    });

    describe('with path: value', () => {
      it('should create the action', () => {
        const path = 'characters';
        const propName = 'name';
        const value = 'Inigo Montoya';
        const action = updateFormField({ path, propName, value });

        expect(action).toEqual({
          type: UPDATE_FORM_FIELD,
          payload: {
            path: [path],
            propName,
            value,
          },
        });
      });
    });
  });
});
