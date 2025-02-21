/** Common */
export const UNKNOWN_ERROR = "An error occurred";

export const APP_PREFIX = "trello";

export const TRELLO_ENTITY = 'linkedTrelloCards';

export const status = {
  UNAUTH: 401
} as const;

/** Proxy */
export const PROXY_URL = "https://trelloproxy-afcf04b55bff.herokuapp.com";

/** Trello */
export const BASE_URL = "https://api.trello.com/1";

export const API_KEY = import.meta.env.VITE_API_KEY;

/** App */
export const nav = [
  { route: "/home", name: "Home" },
  { route: "/link_card", name: "Link Card" },
  { route: "/unlink", name: "Unlink Card" },
  { route: "/logout", name: "Logout" },
];
