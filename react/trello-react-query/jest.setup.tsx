import "regenerator-runtime/runtime";
import "@testing-library/jest-dom";
import "intersection-observer";
import ResizeObserver from "resize-observer-polyfill";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { TextDecoder, TextEncoder } from "util";
import * as React from "react";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
global.TextEncoder = TextEncoder;
//for some reason the types are wrong, but this works
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
global.TextDecoder = TextDecoder;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
global.React = React;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
global.ResizeObserver = ResizeObserver;
