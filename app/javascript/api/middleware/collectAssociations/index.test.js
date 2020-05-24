import collectAssociations from './index';

describe('collectAssociations request middleware', () => {
  it('should be a function', () => {
    expect(typeof collectAssociations).toEqual('function');
  });

  describe('with default options', () => {
    const middleware = collectAssociations({});
    const { type } = middleware;

    describe('type', () => {
      it('should return api/collectAssociations', () => {
        expect(type).toEqual('api/collectAssociations');
      });
    });
  });

  describe('with a resource with a polymorphic belongsTo association', () => {
    const associationName = 'source';
    const associationType = 'belongsTo';
    const resourceName = 'spell';
    const options = {
      associationName,
      associationType,
      polymorphic: true,
      resourceName,
    };
    const middleware = collectAssociations(options);

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
        describe('when the association is missing', () => {
          const spell = {
            id: '10000000-0000-0000-0000-000000000000',
            name: 'Conjure Flumph',
            source_id: '00000000-0000-0000-0000-000000000000',
            source_type: 'Book',
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
                source_id: '00000000-0000-0000-0000-000000000000',
                source_type: 'Book',
              },
            };

            const expectedResponse = { json: { data: expectedData } };

            handleSuccess(next)({ dispatch, getState, response });

            expect(next).toHaveBeenCalledWith({ dispatch, getState, response: expectedResponse });
          });
        });

        describe('when the association is present', () => {
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

    describe('options', () => {
      it('should return the options', () => {
        expect(middleware.options).toEqual(options);
      });
    });
  });

  describe('with a resource with a polymorphic hasOne association', () => {
    const associationName = 'cover';
    const associationType = 'hasOne';
    const inverseName = 'printable';
    const resourceName = 'book';
    const options = {
      associationName,
      associationType,
      inverseName,
      polymorphic: true,
      resourceName,
    };
    const middleware = collectAssociations(options);

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
        const book = {
          id: '00000000-0000-0000-0000-000000000000',
          name: "The Flumph Fancier's Handbook",
        };
        const data = { book };

        it('should modify the response', () => {
          const next = jest.fn();
          const dispatch = jest.fn();
          const getState = jest.fn();
          const response = { json: { data } };
          const expectedData = {
            book: {
              id: '00000000-0000-0000-0000-000000000000',
              name: "The Flumph Fancier's Handbook",
              cover: undefined,
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
        const cover = {
          id: '10000000-0000-0000-0000-000000000000',
          image_data: 'd6612304dd5fc3149435db6a4696b69b',
          printable_id: '00000000-0000-0000-0000-000000000000',
          printable_type: 'Book',
        };
        const data = { book, cover };

        it('should modify the response', () => {
          const next = jest.fn();
          const dispatch = jest.fn();
          const getState = jest.fn();
          const response = { json: { data } };
          const expectedData = {
            cover,
            book: {
              id: '00000000-0000-0000-0000-000000000000',
              name: "The Flumph Fancier's Handbook",
              cover,
            },
          };

          const expectedResponse = { json: { data: expectedData } };

          handleSuccess(next)({ dispatch, getState, response });

          expect(next).toHaveBeenCalledWith({ dispatch, getState, response: expectedResponse });
        });
      });
    });

    describe('options', () => {
      it('should return the options', () => {
        expect(middleware.options).toEqual(options);
      });
    });
  });

  describe('with a resources array with a polymorphic belongsTo association', () => {
    const associationName = 'source';
    const associationType = 'belongsTo';
    const resourceName = 'spells';
    const options = {
      associationName,
      associationType,
      polymorphic: true,
      resourceName,
    };
    const middleware = collectAssociations(options);

    describe('handleSuccess()', () => {
      const { handleSuccess } = middleware;

      it('should be a function', () => {
        expect(typeof handleSuccess).toEqual('function');
      });

      it('should return a function', () => {
        const next = jest.fn();

        expect(typeof handleSuccess(next)).toEqual('function');
      });

      describe('when the resources do not have associations', () => {
        const spells = [
          {
            id: '20000000-0000-0000-0000-000000000000',
            name: 'Conjure Flumph',
          },
          {
            id: '20000000-0000-0000-0000-000000000001',
            name: 'Flumph Bolt',
          },
          {
            id: '20000000-0000-0000-0000-000000000002',
            name: 'Magic Circle Against Flumphs',
          },
          {
            id: '20000000-0000-0000-0000-000000000003',
            name: 'Transform Flumph',
          },
        ];
        const data = { spells };

        it('should modify the response', () => {
          const next = jest.fn();
          const dispatch = jest.fn();
          const getState = jest.fn();
          const response = { json: { data } };
          const expectedData = {
            spells: [
              {
                id: '20000000-0000-0000-0000-000000000000',
                name: 'Conjure Flumph',
                source: undefined,
              },
              {
                id: '20000000-0000-0000-0000-000000000001',
                name: 'Flumph Bolt',
                source: undefined,
              },
              {
                id: '20000000-0000-0000-0000-000000000002',
                name: 'Magic Circle Against Flumphs',
                source: undefined,
              },
              {
                id: '20000000-0000-0000-0000-000000000003',
                name: 'Transform Flumph',
                source: undefined,
              },
            ],
          };

          const expectedResponse = { json: { data: expectedData } };

          handleSuccess(next)({ dispatch, getState, response });

          expect(next).toHaveBeenCalledWith({ dispatch, getState, response: expectedResponse });
        });
      });

      describe('when the resources have associations', () => {
        describe('when the associations are missing', () => {
          const books = [
            {
              id: '00000000-0000-0000-0000-000000000000',
              name: "The Flumph Fancier's Handbook",
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
              source_id: '10000000-0000-0000-0000-000000000000',
              source_type: 'Periodical',
            },
            {
              id: '20000000-0000-0000-0000-000000000002',
              name: 'Magic Circle Against Flumphs',
              source_id: '30000000-0000-0000-0000-000000000000',
              source_type: 'WebArticle',
            },
            {
              id: '20000000-0000-0000-0000-000000000003',
              name: 'Transform Flumph',
              source_id: '',
              source_type: '',
            },
          ];
          const data = {
            books,
            periodicals: [],
            spells,
          };

          it('should modify the response', () => {
            const next = jest.fn();
            const dispatch = jest.fn();
            const getState = jest.fn();
            const response = { json: { data } };
            const expectedData = {
              books,
              periodicals: [],
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
                  source: undefined,
                  source_id: '10000000-0000-0000-0000-000000000000',
                  source_type: 'Periodical',
                },
                {
                  id: '20000000-0000-0000-0000-000000000002',
                  name: 'Magic Circle Against Flumphs',
                  source: undefined,
                  source_id: '30000000-0000-0000-0000-000000000000',
                  source_type: 'WebArticle',
                },
                {
                  id: '20000000-0000-0000-0000-000000000003',
                  name: 'Transform Flumph',
                  source: undefined,
                  source_id: '',
                  source_type: '',
                },
              ],
            };
            const expectedResponse = { json: { data: expectedData } };

            handleSuccess(next)({ dispatch, getState, response });

            expect(next).toHaveBeenCalledWith({ dispatch, getState, response: expectedResponse });
          });
        });

        describe('when the associations are present', () => {
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

    describe('options', () => {
      it('should return the options', () => {
        expect(middleware.options).toEqual(options);
      });
    });
  });

  describe('with a resources array with a polymorphic hasOne association', () => {
    const associationName = 'cover';
    const associationType = 'hasOne';
    const inverseName = 'printable';
    const resourceName = 'books';
    const options = {
      associationName,
      associationType,
      inverseName,
      polymorphic: true,
      resourceName,
    };
    const middleware = collectAssociations(options);

    describe('handleSuccess()', () => {
      const { handleSuccess } = middleware;

      it('should be a function', () => {
        expect(typeof handleSuccess).toEqual('function');
      });

      it('should return a function', () => {
        const next = jest.fn();

        expect(typeof handleSuccess(next)).toEqual('function');
      });

      describe('when the resources do not have associations', () => {
        const books = [
          {
            id: '00000000-0000-0000-0000-000000000000',
            name: "The Flumph Fancier's Handbook",
          },
          {
            id: '00000000-0000-0000-0000-000000000001',
            name: 'Flumphville: City Of The Flumphs',
          },
          {
            id: '00000000-0000-0000-0000-000000000002',
            name: 'Unearthed Arcana: The Flumph',
          },
        ];
        const data = { books };

        it('should modify the response', () => {
          const next = jest.fn();
          const dispatch = jest.fn();
          const getState = jest.fn();
          const response = { json: { data } };
          const expectedData = {
            books: [
              {
                id: '00000000-0000-0000-0000-000000000000',
                name: "The Flumph Fancier's Handbook",
                cover: undefined,
              },
              {
                id: '00000000-0000-0000-0000-000000000001',
                name: 'Flumphville: City Of The Flumphs',
                cover: undefined,
              },
              {
                id: '00000000-0000-0000-0000-000000000002',
                name: 'Unearthed Arcana: The Flumph',
                cover: undefined,
              },
            ],
          };

          const expectedResponse = { json: { data: expectedData } };

          handleSuccess(next)({ dispatch, getState, response });

          expect(next).toHaveBeenCalledWith({ dispatch, getState, response: expectedResponse });
        });
      });

      describe('when the resources have associations', () => {
        const books = [
          {
            id: '00000000-0000-0000-0000-000000000000',
            name: "The Flumph Fancier's Handbook",
          },
          {
            id: '00000000-0000-0000-0000-000000000001',
            name: 'Flumphville: City Of The Flumphs',
          },
          {
            id: '00000000-0000-0000-0000-000000000002',
            name: 'Unearthed Arcana: The Flumph',
          },
        ];
        const covers = [
          {
            id: '10000000-0000-0000-0000-000000000000',
            image_data: 'd6612304dd5fc3149435db6a4696b69b',
            printable_id: '00000000-0000-0000-0000-000000000000',
            printable_type: 'Book',
          },
          {
            id: '10000000-0000-0000-0000-000000000001',
            image_data: '30124bf6b8800440d8ae1f11dddeb1c2',
            printable_id: '00000000-0000-0000-0000-000000000002',
            printable_type: 'Book',
          },
        ];
        const data = { books, covers };

        it('should modify the response', () => {
          const next = jest.fn();
          const dispatch = jest.fn();
          const getState = jest.fn();
          const response = { json: { data } };
          const expectedData = {
            books: [
              {
                id: '00000000-0000-0000-0000-000000000000',
                name: "The Flumph Fancier's Handbook",
                cover: covers[0],
              },
              {
                id: '00000000-0000-0000-0000-000000000001',
                name: 'Flumphville: City Of The Flumphs',
                cover: undefined,
              },
              {
                id: '00000000-0000-0000-0000-000000000002',
                name: 'Unearthed Arcana: The Flumph',
                cover: covers[1],
              },
            ],
            covers,
          };

          const expectedResponse = { json: { data: expectedData } };

          handleSuccess(next)({ dispatch, getState, response });

          expect(next).toHaveBeenCalledWith({ dispatch, getState, response: expectedResponse });
        });
      });
    });

    describe('options', () => {
      it('should return the options', () => {
        expect(middleware.options).toEqual(options);
      });
    });
  });
});
