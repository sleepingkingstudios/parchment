import endpoint from './index';
import { buildLanguage } from '../../entities';

describe('ShowFindLanguage store', () => {
  const { options, type } = endpoint;

  it('should return the options', () => {
    expect(options).toEqual({
      data: { language: buildLanguage() },
      namespace: 'reference/languages/showFindLanguage',
      resourceName: 'language',
    });
  });

  it('should return the type', () => {
    expect(type).toEqual('api/resources/show');
  });
});
