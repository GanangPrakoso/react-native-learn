import { AntDesign, Octicons, Feather, EvilIcons } from "@expo/vector-icons";
import { utilities } from "../../constant/utilities";
import { View, Text } from "react-native";

export default function Reaction() {
    return (
        <View>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderColor: utilities.color.lightGray,
                    borderWidth: 1,
                    justifyContent: "space-between",
                    padding: utilities.padding.md,
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <View
                        style={{
                            borderRadius: 18,
                            width: 36,
                            height: 36,
                            backgroundColor: utilities.color.primary,
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: utilities.margin.sm,
                        }}
                    >
                        <AntDesign
                            name="like2"
                            size={utilities.iconSize.md}
                            color="white"
                        />
                    </View>
                    <Text
                        variant="labelLarge"
                        style={{
                            marginRight: utilities.margin.sm,
                            color: utilities.fontColor.gray700,
                            fontFamily: utilities.fontFamily.firaRegular,
                        }}
                    >
                        10
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <Text
                        variant="labelLarge"
                        style={{
                            marginRight: utilities.margin.sm,
                            fontFamily: utilities.fontFamily.firaRegular,
                            color: utilities.fontColor.gray700,
                        }}
                    >
                        4 comments
                    </Text>
                    <Text
                        variant="labelLarge"
                        style={{
                            fontFamily: utilities.fontFamily.firaRegular,
                            marginRight: utilities.margin.sm,
                        }}
                    >
                        .
                    </Text>
                    <Text
                        variant="labelLarge"
                        style={{
                            fontFamily: utilities.fontFamily.firaRegular,
                            color: utilities.fontColor.gray700,
                        }}
                    >
                        3 shares
                    </Text>
                </View>
            </View>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <View
                    style={{
                        justifyContent: "center",
                        flexDirection: "row",
                        alignItems: "center",
                        padding: utilities.padding.md,
                    }}
                >
                    <AntDesign
                        name="like2"
                        size={24}
                        color={utilities.fontColor.gray700}
                        style={{ marginRight: utilities.margin.sm }}
                    />
                    <Text
                        variant="bodyLarge"
                        style={{
                            color: utilities.fontColor.gray700,
                        }}
                    >
                        Like
                    </Text>
                </View>
                <View
                    style={{
                        justifyContent: "center",
                        flexDirection: "row",
                        alignItems: "center",
                        padding: utilities.padding.md,
                    }}
                >
                    <Octicons
                        name="comment"
                        size={24}
                        color={utilities.fontColor.gray600}
                        style={{ marginRight: utilities.margin.sm }}
                    />
                    <Text
                        variant="bodyLarge"
                        style={{
                            color: utilities.fontColor.gray700,
                        }}
                    >
                        Comment
                    </Text>
                </View>
                <View
                    style={{
                        justifyContent: "center",
                        flexDirection: "row",
                        alignItems: "center",
                        padding: utilities.padding.md,
                    }}
                >
                    <Feather
                        name="send"
                        size={24}
                        color={utilities.fontColor.gray600}
                        style={{ marginRight: utilities.margin.sm }}
                    />
                    <Text
                        variant="bodyLarge"
                        style={{
                            color: utilities.fontColor.gray700,
                        }}
                    >
                        Send
                    </Text>
                </View>
            </View>
        </View>
    );
}
