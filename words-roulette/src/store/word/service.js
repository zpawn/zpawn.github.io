import { Firebase } from "../../core/Firebase";
import { TranslateService } from "../translate";

////

export class WordService {
  /**
   * @param {String} newWord
   * @param {String} newTranslate
   * @return {Promise<{word: *, translate: *}>}
   */
  static async create(newWord, newTranslate) {
    try {
      const createdWord = await Firebase.collection("words")
        .add({
          name: newWord,
          createdAt: Date.now(),
          updatedAt: Date.now()
        })
        .catch(() => new Error("Could not create word"));

      const createdTranslate = await TranslateService.create(
        createdWord.id,
        newTranslate
      );

      return {
        word: createdWord.id,
        translate: createdTranslate.id
      };
    } catch (e) {
      throw new Error("Could not create translate/word");
    }
  }
}
