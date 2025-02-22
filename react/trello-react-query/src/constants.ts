/** Common */
export const UNKNOWN_ERROR = "An error occurred";

export const APP_PREFIX = "trello";

export const TRELLO_ENTITY = 'linkedTrelloCards';

export const status = {
  BAD_REQUEST: 400,
  UNAUTH: 401,
} as const;

/** Proxy */
export const PROXY_URL = "https://trelloproxy-afcf04b55bff.herokuapp.com";

/** Trello */
export const BASE_URL = "https://api.trello.com/1";

export const API_KEY = import.meta.env.VITE_API_KEY;

/** App */
export const ROUTE_CARD = "/card";

export const routes = {
  HOME: "/home",
  LOGIN: "/login",
  LOGOUT: "/logout",
  CARD: ROUTE_CARD,
  LINK_CARD: `${ROUTE_CARD}/link`,
  CREATE_CARD: `${ROUTE_CARD}/create`,
  VIEW_CARD: `${ROUTE_CARD}/:cardId`,
  EDIT_CARD: `${ROUTE_CARD}/:cardId/edit`,
  ADD_COMMENT: `${ROUTE_CARD}/:cardId/comment/create`,
} as const;

export const nav = [
  { route: routes.HOME, name: "Home" },
  { route: routes.LINK_CARD, name: "Link Card" },
  { route: routes.LOGOUT, name: "Logout" },
] as const;
