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

  static async createMultiple(wordId, newTranslates) {
    try {
      const batch = Firebase.batch();

      newTranslates.forEach(t => {
        batch.set(Firebase.collection("translation").doc(), {
          wordId: wordId,
          translation: t,
          labelId: ""
        });
      });

      return batch.commit().then(() =>
        Firebase.collection("translation")
          .where("wordId", "==", wordId)
          .get()
      );
    } catch (e) {
      throw new Error("Could not create translations");
    }
  }
}
