import { isEmpty, isString, isPlainObject } from "lodash";
import { isForm } from "./isForm";
import type { RequestParams } from "../types";

const getRequestBody = (body: RequestParams["data"]) => {
  if (isPlainObject(body) && !isEmpty(body)) {
    return JSON.stringify(body);
  }

  if (isString(body) && !isEmpty(body)) {
    return body;
  }

  if (isForm(body)) {
    return body;
  }

  return;
};

export { getRequestBody };
