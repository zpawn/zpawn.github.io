import _isArray from "lodash/isArray";

import { Firebase, parseResponseItems } from "../../core/Firebase";
import { TranslateService } from "../translate";

////

export class WordService {
  /**
   * @param {String} newWord
   * @param {Array} newTranslates
   * @return {Promise<{word: {String}, translate: {Array}}>}
   */
  static async create(newWord, newTranslates) {
    if (!_isArray(newTranslates)) {
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

      const createdTranslate = await TranslateService.createMultiple(
        createdWord.id,
        newTranslates
      );

      return Promise.resolve({
        word: {
          id: createdWord.id,
          name: newWord
        },
        translations: parseResponseItems(createdTranslate)
      });
    } catch (e) {
      throw new Error("Could not create translate/word");
    }
  }
}
