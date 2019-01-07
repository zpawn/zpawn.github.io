import { Firebase, parseResponseItems } from "../../core/Firebase";

////

class TranslationsService {
  /**
   * @return {Promise<Array | never>}
   */
  static async findAll() {
    try {
      return Firebase.collection("translations")
        .get()
        .then(res => parseResponseItems(res));
    } catch (e) {
      throw new Error("Fetched translates fail");
    }
  }

  /**
   * @param {String} wordId
   * @param {String} newTranslate
   * @return {Promise<firebase.firestore.DocumentReference | Error>}
   */
  static async save(wordId, newTranslate) {
    return Firebase.collection("translations")
      .add({
        wordId: wordId,
        translations: newTranslate,
        labelId: ""
      })
      .catch(() => new Error("Could not create translation"));
  }

  static async saveAll(wordId, newTranslates) {
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

export { TranslationsService };
