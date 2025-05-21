import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Home from "../screens/Home";
import Logo from "../components/Logo";
import PostDetail from "../screens/PostDetail";
import LogoutButton from "../components/LogoutButton";
import { useContext } from "react";
import { LoginContext } from "../context/LoginContext";

const Stack = createNativeStackNavigator();

export default function MainStack() {
    const { isLoggedIn } = useContext(LoginContext);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {isLoggedIn ? (
                    <>
                        <Stack.Screen
                            name="Home"
                            options={{
                                headerTitle: () => <Logo size={"sm"} />,
                                headerRight: () => <LogoutButton />,
                            }}
                            component={Home}
                        />
                        <Stack.Screen
                            name="PostDetail"
                            options={{
                                headerTitle: () => <Logo size={"sm"} />,
                            }}
                            component={PostDetail}
                        />
                    </>
                ) : (
                    <>
                        <Stack.Screen
                            name="Login"
                            options={{
                                headerShown: false,
                            }}
                            component={Login}
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
