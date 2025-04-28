import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Home from "../screens/Home";
import Logo from "../components/Logo";
import PostDetail from "../screens/PostDetail";
import LogoutButton from "../components/LogoutButton";
import CreatePost from "../screens/CreatePost";
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import AuthContext from '../context/auth';

const Stack = createNativeStackNavigator();

export default function MainStack() {
  const [isSignedIn, setIsSignedIn] = useState(null);

  useEffect(() => {
    SecureStore.getItemAsync('accessToken')
      .then(token => {
        if (token) {
          setIsSignedIn(true);
        }
      });
  }, []);

  return (
    <AuthContext.Provider value={{
      isSignedIn,
      setIsSignedIn
    }}>
      <NavigationContainer>
        <Stack.Navigator>
          {
            isSignedIn ? <>
              <Stack.Screen
                name="Home"
                options={{
                  headerTitle: () => <Logo size={"sm"} />,
                  headerRight: () => <LogoutButton />,
                }}
                component={Home}
              />
              <Stack.Screen
                name="CreatePost"
                options={{ headerTitle: () => <Logo size={"sm"} /> }}
                component={CreatePost}
              />
              <Stack.Screen
                name="PostDetail"
                options={{ headerTitle: () => <Logo size={"sm"} /> }}
                component={PostDetail}
              />
            </> : <>
              <Stack.Screen
                name="Login"
                options={{
                  headerShown: false,
                }}
                component={Login}
              />
            </>
          }
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
