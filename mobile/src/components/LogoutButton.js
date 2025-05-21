import { Text, TouchableOpacity } from "react-native";
import { utilities } from "../constant/utilities";
import { useContext } from "react";
import { LoginContext } from "../context/LoginContext";

export default function LogoutButton() {
    const { logoutAction } = useContext(LoginContext);

    return (
        <TouchableOpacity onPress={() => logoutAction("token")}>
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
