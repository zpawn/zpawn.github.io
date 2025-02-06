import { Request } from "../types";
import { getQueryParams } from "./getQueryParams";
import { getRequestBody } from "./getRequestBody";

export type InitData = {
    status: number,
    data: TrelloAPIError,
};

class TrelloError extends Error {
    status: number;
    data: TrelloAPIError;

    constructor({ status, data }: InitData) {
        const message = "Trello Api Error";
        super(message);

        this.data = data;
        this.status = status;
    }
}

export type TrelloAPIError = {
  error: {
      code: number,
      status: string,
  }
};

const baseRequest: Request = async ({
    url,
    data,
    method = "GET",
    queryParams = {},
}) => {
  const body = getRequestBody(data);
  const requestUrl = `${url}/?${getQueryParams(queryParams)}`;
  const options = {
    method,
    body,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
  };

  const res = await fetch(requestUrl, options);

  if (res.status < 200 || res.status > 399) {
    let errorData;

    try {
      errorData = await res.json();
    } catch (e) {
      errorData = {};
    }

    throw new TrelloError({
      status: res.status,
      data: errorData,
    });
  }

  let result;

  try {
    result = await res.json();
  } catch (e) {
    return {};
  }

  return result;
};

export { baseRequest, TrelloError };
