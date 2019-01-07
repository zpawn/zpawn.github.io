import _isArray from "lodash/isArray";

import { Firebase, parseResponseItems } from "../../core/Firebase";
import { TranslationsService } from "../translations";

////

class WordsService {
  /**
   * @return {Promise<Array | never>}
   */
  static async findAll() {
    try {
      return Firebase.collection("words")
        .get()
        .then(res => parseResponseItems(res));
    } catch (e) {
      throw new Error("Fetched words fail");
    }
  }

  /**
   * @param {String} newWord
   * @param {Array} newTranslations
   * @return {Promise<{word: {String}, translate: {Array}}>}
   */
  static async save(newWord, newTranslations) {
    if (!_isArray(newTranslations)) {
      return Promise.reject("Empty translations");
    }

    try {
      const createdWord = await Firebase.collection("words")
        .add({
          name: newWord,
          createdAt: Date.now(),
          updatedAt: Date.now()
        })
        .catch(() => new Error("Could not create word"));

      const createdTranslations = await TranslationsService.saveAll(
        createdWord.id,
        newTranslations
      );

      return Promise.resolve({
        word: {
          id: createdWord.id,
          name: newWord
        },
        translations: parseResponseItems(createdTranslations)
      });
    } catch (e) {
      throw new Error("Could not create translation/word");
    }
  }
}

export { WordsService };
