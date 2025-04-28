import useDimensions from "../../hooks/useDimensions";
import { Image, View, Text } from "react-native";
import { utilities } from "../../constant/utilities";

export default function Content({ post }) {
  const { width, height } = useDimensions();
  return (
    <View>
      <View
        style={{
          paddingHorizontal: utilities.padding.md,
        }}
      >
        <Text
          variant="bodyLarge"
          style={{
            color: utilities.fontColor.gray800,
            lineHeight: utilities.lineHeight.sm,
            marginBottom: utilities.margin.sm,
          }}
        >
          {post.body}
        </Text>
      </View>
      {/* <Image
        source={{
          uri: post.img,
        }}
        style={{
          width,
          height: height * 0.4,
        }}
      /> */}
    </View>
  );
}
