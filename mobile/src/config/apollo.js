import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import * as SecureStore from "expo-secure-store";

import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
    uri: "https://f5da-103-136-57-78.ngrok-free.app",
});

const authLink = setContext(async (_, { headers }) => {
    const token = await SecureStore.getItemAsync("token");

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default client;
