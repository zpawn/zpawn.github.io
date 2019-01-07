import { Firebase, parseResponseItems } from "../../core/Firebase";

////

class WordsService {
  /**
   * @return {Promise<Array | never>}
   */
  static async getAll() {
    try {
      return Firebase.collection("words")
        .get()
        .then(res => parseResponseItems(res));
    } catch (e) {
      throw new Error("Fetched words fail");
    }
  }
}

export { WordsService };
