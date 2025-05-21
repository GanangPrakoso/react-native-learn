import { View, Text, TouchableHighlight } from "react-native";
import { globalStyle } from "../../constant/utilities";

export default function HeaderHome({ showSheet }) {
    return (
        <View
            style={{
                padding: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <View style={{ flexDirection: "row" }}>
                <Text>Hello: </Text>
                <Text style={{ fontWeight: "bold" }}>RMT 42</Text>
            </View>
            <TouchableHighlight
                onPress={() => showSheet()}
                style={globalStyle.primarySmButton}
            >
                <Text style={globalStyle.textButton}>Add Post</Text>
            </TouchableHighlight>
        </View>
    );
}
