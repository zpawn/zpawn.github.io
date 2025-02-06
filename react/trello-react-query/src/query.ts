import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true,
      refetchOnWindowFocus: false,
      retry: 1,
      retryDelay: 1500,
    },
  },
});

const QueryKey = {
  LINKED_CARDS: "linkedCards",
  CARD: "card",
  COMMENTS: "comments",
  ORGANIZATIONS: "organizations",
}

export { queryClient, QueryKey };
