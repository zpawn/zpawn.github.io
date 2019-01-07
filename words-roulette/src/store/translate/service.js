import { Firebase } from "../../core/Firebase";

////

export class TranslateService {
  /**
   * @param {String} wordId
   * @param {String} newTranslate
   * @return {Promise<firebase.firestore.DocumentReference | Error>}
   */
  static async create(wordId, newTranslate) {
    return Firebase.collection("translations")
      .add({
        wordId: wordId,
        translations: newTranslate,
        labelId: ""
      })
      .catch(() => new Error("Could not create translation"));
  }

  static async createMultiple(wordId, newTranslates) {
    try {
      const batch = Firebase.batch();

      newTranslates.forEach(t => {
        batch.set(Firebase.collection("translations").doc(), {
          wordId: wordId,
          translation: t,
          labelId: ""
        });
      });

      return batch.commit().then(() =>
        Firebase.collection("translations")
          .where("wordId", "==", wordId)
          .get()
      );
    } catch (e) {
      throw new Error("Could not create translations");
    }
  }
}
