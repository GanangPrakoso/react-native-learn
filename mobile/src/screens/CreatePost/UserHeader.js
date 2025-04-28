import { View } from 'react-native';
import { utilities } from '../../constant/utilities';
import ThumbnailImage from '../../components/ThumbnailImage';
import { Text } from 'react-native-paper';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
export default function UserHeader({ user }) {
  return (
    <View style={{
      flex: 1,
      flexDirection: "row",
      width: "100%",
      paddingVertical: utilities.padding.md,
      backgroundColor: "white",
      paddingRight: utilities.padding.md,
    }}>
      <ThumbnailImage
        uri={user.avatar}
      />
      <View style={{
        flex: 8,
        flexDirection: "row",
      }}>
        <View style={{
          flex: 1,
          justifyContent: 'center',
        }}>
          <View style={{
            borderColor: utilities.color.lightGray,
            // marginBottom: utilities.margin.xs
          }}>
            <Text variant='titleLarge' style={{
              color: utilities.fontColor.gray900,
              fontFamily: utilities.fontFamily.firaBold
            }}>
              {user.username}
            </Text>
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <View style={{
              backgroundColor: utilities.color.lightBlue,
              padding: utilities.padding.xs,
              borderRadius: 12,
              flexDirection: "row"
            }}>
              <FontAwesome name="globe" size={utilities.iconSize.sm} color={utilities.color.primary} style={{ marginRight: utilities.margin.xs }} />
              <Text variant='titleSmall' style={{
                fontFamily: utilities.fontFamily.firaRegular,
                color: utilities.color.primary
              }} >
                Public
              </Text>
            </View>
            <View style={{
              backgroundColor: utilities.color.lightBlue,
              padding: utilities.padding.xs,
              borderRadius: 12,
              flexDirection: "row"
            }}>
              <Ionicons name="image-outline" size={utilities.iconSize.sm} color={"#43C55F"} style={{ marginRight: utilities.margin.xs }} />
              <Text variant='titleSmall' style={{
                fontFamily: utilities.fontFamily.firaRegular,
                color: utilities.color.primary
              }} >
                Add Image
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}