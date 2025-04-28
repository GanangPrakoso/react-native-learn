import { Text, TouchableOpacity } from "react-native";
import { utilities } from "../constant/utilities";
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import AuthContext from '../context/auth';

export default function LogoutButton() {
  const navigation = useNavigation();
  const authContext = useContext(AuthContext);

  return (
    <TouchableOpacity onPress={() => {
      SecureStore.deleteItemAsync('accessToken');
      authContext.setIsSignedIn(false);
    }}>
      <Text
        style={{
          color: utilities.color.primary,
          fontWeight: "bold",
        }}
      >
        Logout
      </Text>
    </TouchableOpacity>
  );
}
