// @flow
import AsyncStorage from '@react-native-community/async-storage';
import * as StorageAPI from '../storage';
import StorageConstant from '../../constants/Storage';

describe('saveDeckTitle', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  test('save first and second decks with success', async () => {
    const deckTitle1 = 'name1';
    const deckTitle2 = 'name2';
    const response1 = {
      [deckTitle1]: {
        title: deckTitle1,
        questions: [],
      },
    };
    const response2 = {
      [deckTitle1]: {
        title: deckTitle1,
        questions: [],
      },
      [deckTitle2]: {
        title: deckTitle2,
        questions: [],
      },
    };

    await expect(StorageAPI.saveDeckTitle(deckTitle1)).resolves.toEqual(response1);
    await expect(StorageAPI.saveDeckTitle(deckTitle2)).resolves.toEqual(response2);
  });

  test('throws if title is invalid', async () => {
    const deckTitle = '';
    await expect(StorageAPI.saveDeckTitle(deckTitle)).rejects.toThrow('invalid title');
  });

  test('checks if AsyncStorage.setItem is used', async () => {
    const deckTitle = 'name';

    await StorageAPI.saveDeckTitle(deckTitle);
    expect(AsyncStorage.setItem).toHaveBeenCalled();
  });

  test('checks if AsyncStorage.setItem receives Flashcard constant key as 1st arg', async () => {
    const deckTitle = 'name';

    await StorageAPI.saveDeckTitle(deckTitle);

    expect(AsyncStorage.setItem.mock.calls[0][0]).toBe(StorageConstant.key);
  });
});
