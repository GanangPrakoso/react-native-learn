import { StyleSheet } from "react-native";
import MainStack from "./src/navigators/MainStack";
import {
    useFonts,
    FiraSans_400Regular,
    FiraSans_700Bold,
    FiraSans_200ExtraLight,
    FiraSans_300Light,
    FiraSans_500Medium,
} from "@expo-google-fonts/fira-sans";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LoginProvider } from "./src/context/LoginContext";

import { ApolloProvider } from "@apollo/client";
import client from "./src/config/apollo";

export default function App() {
    const [fontsLoaded] = useFonts({
        FiraSans_400Regular,
        FiraSans_200ExtraLight,
        FiraSans_300Light,
        FiraSans_500Medium,
        FiraSans_700Bold,
    });
    if (!fontsLoaded) {
        return null;
    }

    return (
        <ApolloProvider client={client}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <LoginProvider>
                    <MainStack />
                </LoginProvider>
            </GestureHandlerRootView>
        </ApolloProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
