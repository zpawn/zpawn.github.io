import type { CSSProperties } from "react";
import type { ParamKeyValuePair } from "react-router-dom";

/** Request types */
export type ApiRequestMethod = "GET" | "POST" | "PUT" | "DELETE";

export type RequestParams = {
    url: string,
    method?: ApiRequestMethod,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any,
    headers?: Dict<string>,
    queryParams?: string|Dict<string>|ParamKeyValuePair[],
};

export type Request = <T = void>(params: RequestParams) => Promise<T>;

/** Common types */
export type Maybe<T> = T | undefined | null;

export type Dict<T> = Record<string, T>;

export type PropsWithStylish<P extends object = {}> = P & {
  className?: string;
  style?: CSSProperties;
};

/**
 * An ISO-8601 encoded UTC date time string. Example value: `""2019-09-07T15:50:00Z"`.
 */
export type DateTime = string;

export type Size = "xs"|"sm"|"md"|"lg"|"xl"|"2xl";

export type IconSize = 14 | 15 | 16 | 18 | 20 | 22 | 24 | 26 | 28 | 32 | 34 | 40 | 48 | 56 | 72 | 100 | 120;
