/* eslint-env jest */

/* eslint-disable-next-line import/prefer-default-export */
export const shouldGenerateTheFormActions = ({ actions, namespace }) => {
  const {
    SET_FORM_DATA,
    UPDATE_FORM_DATA,
    UPDATE_FORM_FIELD,
    setFormData,
    updateFormData,
    updateFormField,
  } = actions;

  describe('SET_FORM_DATA', () => {
    it('should define the action', () => {
      expect(SET_FORM_DATA).toEqual(`${namespace}/setFormData`);
    });
  });

  describe('UPDATE_FORM_DATA', () => {
    it('should define the action', () => {
      expect(UPDATE_FORM_DATA).toEqual(`${namespace}/updateFormData`);
    });
  });

  describe('UPDATE_FORM_FIELD', () => {
    it('should define the action', () => {
      expect(UPDATE_FORM_FIELD).toEqual(`${namespace}/updateFormField`);
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
};
