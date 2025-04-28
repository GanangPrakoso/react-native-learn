import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyle, utilities } from "../constant/utilities";
import Logo from "../components/Logo";
import { useContext, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import * as SecureStore from 'expo-secure-store';
import AuthContext from '../context/auth';

const LOGIN = gql`
  mutation LOGIN($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
    }
  }
`;

export default function Login({ navigation }) {
  const [email, setEmail] = useState("Sincere@april.biz");
  const [password, setPassword] = useState("test123");
  const authContext = useContext(AuthContext);

  const [loginFunction, {
    data, loading, error
  }] = useMutation(LOGIN, {
    onCompleted: async (result) => {
      await SecureStore.setItemAsync('accessToken', result.login.accessToken);
      authContext.setIsSignedIn(true);
    }
  });

  // console.log(data, loading, error);
  // 1. ke server cek validitas email password
  // 2. dapat token
  // 3. token simpan ke localStorage
  // 4. pindah halaman

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: utilities.padding.xl,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Logo />
        <TextInput
          placeholder="Email or username"
          style={globalStyle.textInput}
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={globalStyle.textInput}
          onChangeText={(text) => {
            setPassword(text);
          }}
          value={password}
        />
        <TouchableOpacity
          style={globalStyle.primaryButton}
          onPress={() => {
            console.log("ini mau login");
            loginFunction({
              variables: {
                email,
                password
              }
            });

            // navigation.replace("Home");
          }}
        >
          <Text variant="titleLarge" style={globalStyle.textButton}>
            LOGIN
          </Text>
        </TouchableOpacity>
        <Text
          variant="titleMedium"
          style={{
            fontFamily: utilities.fontFamily.firaMedium,
            marginBottom: utilities.margin.md,
          }}
        >
          or
        </Text>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            variant="titleLarge"
            style={{
              fontFamily: utilities.fontFamily.firaMedium,
              color: utilities.color.primary,
            }}
          >
            Create new account
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
