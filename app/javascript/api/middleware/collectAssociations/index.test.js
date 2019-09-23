import collectAssociations from './index';

describe('collectAssociations request middleware', () => {
  it('should be a function', () => {
    expect(typeof collectAssociations).toEqual('function');
  });

  describe('with a resource with a polymorphic belongsTo association', () => {
    const associationName = 'source';
    const associationType = 'belongsTo';
    const resourceName = 'spell';
    const middleware = collectAssociations({
      associationName,
      associationType,
      polymorphic: true,
      resourceName,
    });

    describe('handleSuccess()', () => {
      const { handleSuccess } = middleware;

      it('should be a function', () => {
        expect(typeof handleSuccess).toEqual('function');
      });

      it('should return a function', () => {
        const next = jest.fn();

        expect(typeof handleSuccess(next)).toEqual('function');
      });

      describe('when the resource does not have an association', () => {
        const spell = {
          id: '10000000-0000-0000-0000-000000000000',
          name: 'Conjure Flumph',
        };
        const data = { spell };

        it('should modify the response', () => {
          const next = jest.fn();
          const dispatch = jest.fn();
          const getState = jest.fn();
          const response = { json: { data } };
          const expectedData = {
            spell: {
              id: '10000000-0000-0000-0000-000000000000',
              name: 'Conjure Flumph',
              source: undefined,
            },
          };

          const expectedResponse = { json: { data: expectedData } };

          handleSuccess(next)({ dispatch, getState, response });

          expect(next).toHaveBeenCalledWith({ dispatch, getState, response: expectedResponse });
        });
      });

      describe('when the resource has an association', () => {
        const book = {
          id: '00000000-0000-0000-0000-000000000000',
          name: "The Flumph Fancier's Handbook",
        };
        const spell = {
          id: '10000000-0000-0000-0000-000000000000',
          name: 'Conjure Flumph',
          source_id: book.id,
          source_type: 'Book',
        };
        const data = {
          book,
          spell,
        };

        it('should modify the response', () => {
          const next = jest.fn();
          const dispatch = jest.fn();
          const getState = jest.fn();
          const response = { json: { data } };
          const expectedData = {
            book,
            spell: {
              id: '10000000-0000-0000-0000-000000000000',
              name: 'Conjure Flumph',
              source: book,
              source_id: book.id,
              source_type: 'Book',
            },
          };

          const expectedResponse = { json: { data: expectedData } };

          handleSuccess(next)({ dispatch, getState, response });

          expect(next).toHaveBeenCalledWith({ dispatch, getState, response: expectedResponse });
        });
      });
    });
  });

  describe('with a resources array with a polymorphic belongsTo association', () => {
    const associationName = 'source';
    const associationType = 'belongsTo';
    const resourceName = 'spells';
    const middleware = collectAssociations({
      associationName,
      associationType,
      polymorphic: true,
      resourceName,
    });

    describe('handleSuccess()', () => {
      const { handleSuccess } = middleware;
      const books = [
        {
          id: '00000000-0000-0000-0000-000000000000',
          name: "The Flumph Fancier's Handbook",
        },
      ];
      const periodicals = [
        {
          id: '10000000-0000-0000-0000-000000000000',
          issue: 12,
          name: 'Flumph Monthly',
        },
      ];
      const webArticles = [
        {
          id: '30000000-0000-0000-0000-000000000000',
          url: 'flumphs.com/flumph-magic',
        },
      ];
      const spells = [
        {
          id: '20000000-0000-0000-0000-000000000000',
          name: 'Conjure Flumph',
          source_id: books[0].id,
          source_type: 'Book',
        },
        {
          id: '20000000-0000-0000-0000-000000000001',
          name: 'Flumph Bolt',
          source_id: periodicals[0].id,
          source_type: 'Periodical',
        },
        {
          id: '20000000-0000-0000-0000-000000000002',
          name: 'Magic Circle Against Flumphs',
          source_id: webArticles[0].id,
          source_type: 'WebArticle',
        },
        {
          id: '20000000-0000-0000-0000-000000000003',
          name: 'Transform Flumph',
        },
      ];
      const data = {
        books,
        periodicals,
        spells,
        web_articles: webArticles,
      };

      it('should be a function', () => {
        expect(typeof handleSuccess).toEqual('function');
      });

      it('should return a function', () => {
        const next = jest.fn();

        expect(typeof handleSuccess(next)).toEqual('function');
      });

      it('should modify the response', () => {
        const next = jest.fn();
        const dispatch = jest.fn();
        const getState = jest.fn();
        const response = { json: { data } };
        const expectedData = {
          books,
          periodicals,
          spells: [
            {
              id: '20000000-0000-0000-0000-000000000000',
              name: 'Conjure Flumph',
              source: books[0],
              source_id: books[0].id,
              source_type: 'Book',
            },
            {
              id: '20000000-0000-0000-0000-000000000001',
              name: 'Flumph Bolt',
              source: periodicals[0],
              source_id: periodicals[0].id,
              source_type: 'Periodical',
            },
            {
              id: '20000000-0000-0000-0000-000000000002',
              name: 'Magic Circle Against Flumphs',
              source: webArticles[0],
              source_id: webArticles[0].id,
              source_type: 'WebArticle',
            },
            {
              id: '20000000-0000-0000-0000-000000000003',
              name: 'Transform Flumph',
              source: undefined,
            },
          ],
          web_articles: webArticles,
        };
        const expectedResponse = { json: { data: expectedData } };

        handleSuccess(next)({ dispatch, getState, response });

        expect(next).toHaveBeenCalledWith({ dispatch, getState, response: expectedResponse });
      });
    });
  });
});
