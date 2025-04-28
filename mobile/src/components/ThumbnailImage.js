import { Image, View } from "react-native";
import { utilities } from "../constant/utilities";
import useDimensions from "../hooks/useDimensions";

export default function ThumbnailImage({ uri }) {
    const { width, height } = useDimensions();

    return (
        <View
            style={{
                flex: 2,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Image
                source={{
                    uri,
                }}
                style={{
                    height: width / 7,
                    width: width / 7,
                    borderRadius: width / 14,
                    borderColor: utilities.color.lightGray,
                    borderWidth: 0.8,
                }}
            />
        </View>
    );
}
