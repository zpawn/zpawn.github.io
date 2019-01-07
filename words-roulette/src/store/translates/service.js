import { Firebase, parseResponseItems } from "../../core/Firebase";

////

class TranslatesService {
  /**
   * @return {Promise<Array | never>}
   */
  static async getAll() {
    try {
      return Firebase.collection("translation")
        .get()
        .then(res => parseResponseItems(res));
    } catch (e) {
      throw new Error("Fetched translates fail");
    }
  }
}

export { TranslatesService };
