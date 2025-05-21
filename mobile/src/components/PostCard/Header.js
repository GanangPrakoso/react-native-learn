import { View, Text } from "react-native";
import useDimensions from "../../hooks/useDimensions";
import ThumbnailImage from "../ThumbnailImage";
import { utilities } from "../../constant/utilities";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";

export default function Header({ post }) {
    const { width, height } = useDimensions();
    return (
        <View
            style={{
                flexDirection: "row",
                width,
                height: height * 0.1,
            }}
        >
            <ThumbnailImage uri={post.author.avatar} />
            <View
                style={{
                    flex: 8,
                    paddingVertical: utilities.padding.md,
                }}
            >
                <View
                    style={{
                        backgroundColor: "white",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingHorizontal: utilities.padding.md,
                    }}
                >
                    <Text
                        variant="titleLarge"
                        style={{
                            fontFamily: utilities.fontFamily.firaMedium,
                            color: utilities.fontColor.gray900,
                        }}
                    >
                        {post.author.username}
                    </Text>
                    <View
                        style={{
                            flexDirection: "row",
                        }}
                    >
                        <MaterialCommunityIcons
                            name="dots-horizontal"
                            size={24}
                            color={utilities.fontColor.gray600}
                            style={{ marginRight: utilities.margin.lg }}
                        />
                        <MaterialCommunityIcons
                            name="window-close"
                            size={24}
                            color={utilities.fontColor.gray600}
                        />
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingHorizontal: utilities.padding.md,
                    }}
                >
                    <Text
                        variant="labelLarge"
                        style={{
                            fontFamily: utilities.fontFamily.firaLight,
                            color: utilities.fontColor.gray800,
                            marginRight: utilities.margin.xs,
                        }}
                    >
                        46m
                    </Text>
                    <FontAwesome
                        name="globe"
                        size={utilities.iconSize.sm}
                        color={utilities.fontColor.gray500}
                    />
                </View>
            </View>
        </View>
    );
}
