import { TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { utilities } from '../../constant/utilities';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { gql, useMutation } from '@apollo/client';
import GET_POSTS from '../../queries/post';

// Define mutation
const ADD_POST = gql`
  mutation Mutation($post: newPost) {
    addPost(post: $post)
  }
`;

export default function NavigationHeader() {
  const navigation = useNavigation();

  const [addPost, {
    data, loading, error
  }] = useMutation(ADD_POST, {
    refetchQueries: [
      GET_POSTS
    ],
    onCompleted: () => {
      navigation.goBack();
    }
  });

  console.log({
    data, loading, error
  });

  const body = {
    "title": "test",
    "tags": ["test", "coba"],
    "body": "tester"
  };

  return (
    <View style={{
      flex: 1,
      flexDirection: "row",
      padding: utilities.padding.md,
      justifyContent: "space-between",
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: utilities.fontColor.gray500
    }}>
      <View style={{
        flexDirection: "row",
        alignItems: "center"
      }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            marginRight: utilities.margin.md
          }}>
          <AntDesign name="arrowleft" size={24} color={utilities.fontColor.gray900} />
        </TouchableOpacity>
        <Text variant='titleLarge' style={{ color: utilities.fontColor.gray900, fontFamily: utilities.fontFamily.firaMedium }}>
          Create Post
        </Text>
      </View>
      <TouchableOpacity style={{
        backgroundColor: utilities.color.primary,
        borderRadius: 12,
        padding: utilities.padding.md
      }} onPress={() => {
        console.log("MASUKIN DATA KE DB");
        addPost({
          variables: {
            post: body
          }
        });
      }}>
        <Text style={{
          color: "white",
          fontFamily: utilities.fontFamily.firaMedium
        }}>
          POST
        </Text>
      </TouchableOpacity>
    </View>
  );
}