import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyle, utilities } from "../constant/utilities";
import Logo from "../components/Logo";
import { useContext, useState } from "react";
import { LoginContext } from "../context/LoginContext";

import { gql, useMutation } from "@apollo/client";

// const ADD_TODO = gql`
//   mutation AddTodo($type: String!) {
//     addTodo(type: $type) {
//       id
//       type
//     }
//   }
// `;

const LOGIN = gql`
    mutation Mutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            accessToken
        }
    }
`;

export default function Login({ navigation }) {
    const { loginAction } = useContext(LoginContext);
    const [input, setInput] = useState({
        email: "",
        password: "",
    });
    const [login, { data, error, loading }] = useMutation(LOGIN);

    const handleChange = (name, text) => {
        setInput({
            ...input,
            [name]: text,
        });
    };

    const handleLogin = async () => {
        try {
            if (loading) return;
            await login({
                variables: { email: input.email, password: input.password },
            });
            await loginAction("token", data.login.accessToken);
        } catch (err) {
            console.log(err);
        }
    };

    console.log(data, error, loading);

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
                    value={input.email}
                    onChangeText={(text) => handleChange("email", text)}
                />
                <TextInput
                    placeholder="Password"
                    secureTextEntry
                    style={globalStyle.textInput}
                    value={input.password}
                    onChangeText={(text) => handleChange("password", text)}
                />
                <TouchableOpacity
                    style={globalStyle.primaryButton}
                    onPress={handleLogin}
                >
                    {loading ? (
                        <ActivityIndicator />
                    ) : (
                        <Text
                            variant="titleLarge"
                            style={globalStyle.textButton}
                        >
                            LOGIN
                        </Text>
                    )}
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
