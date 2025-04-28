import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import MainStack from "./src/navigators/MainStack";
import {
  useFonts,
  FiraSans_400Regular,
  FiraSans_700Bold,
  FiraSans_200ExtraLight,
  FiraSans_300Light,
  FiraSans_500Medium,
} from "@expo-google-fonts/fira-sans";
import client from './src/config/apolloClient';
import { ApolloProvider } from '@apollo/client';

import { GestureHandlerRootView } from "react-native-gesture-handler";

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
        <MainStack />
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
