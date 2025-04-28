import { TextInput, View } from 'react-native';
import { utilities } from '../../constant/utilities';

export default function Content() {
  return (
    <View style={{
      flex: 12,
    }}>
      <View style={{
        flex: 1,
        padding: utilities.padding.md
      }}>
        <TextInput placeholder="What's on your mind?" style={{
          fontFamily: utilities.fontFamily.firaMedium,
          fontSize: utilities.fontSize.xl
        }} />
      </View>
    </View>
  );
}