import { Firebase } from "../../core/Firebase";

////

export class TranslateService {
  /**
   * @param {String} wordId
   * @param {String} newTranslate
   * @return {Promise<firebase.firestore.DocumentReference | Error>}
   */
  static async create(wordId, newTranslate) {
    return Firebase.collection("translation")
      .add({
        wordId: wordId,
        translation: newTranslate,
        labelId: ""
      })
      .catch(() => new Error("Could not create translation"));
  }
}
