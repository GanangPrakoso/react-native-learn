import { TouchableOpacity, View, FlatList, ActivityIndicator, Text } from "react-native";
import PostCard from "../../components/PostCard";
import HeaderHome from "./HeaderHome";
import { useQuery } from '@apollo/client';
import GET_POSTS from '../../queries/post';

export default function Home({ navigation }) {
  const { loading, error, data } = useQuery(GET_POSTS);

  const showSheet = () => {
    setShow(true);
  };
  if (loading) {
    return <View style={{ flex: 1 }}>
      <ActivityIndicator
        color={'tomato'}
        size={'xl'}
      />
    </View>;
  }

  if (error) {
    return <View style={{ flex: 1 }}>
      <Text style={{
        fontSize: 16
      }}>
        Something went wrong
      </Text>
    </View>;
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data.posts}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              // console.log(item._id);
              navigation.push("PostDetail", {
                _id: item._id,
              });
            }}
          >
            <PostCard post={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<HeaderHome showSheet={showSheet} />}
      />
    </View>
  );
}
