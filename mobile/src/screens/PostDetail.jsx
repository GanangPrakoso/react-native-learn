import PostCard from "../components/PostCard";
import { ScrollView, Text } from "react-native";
import { useRoute } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import { GET_POST_DETAIL } from '../queries/post';

export default function PostDetail() {
  const route = useRoute();

  const { loading, data, error } = useQuery(GET_POST_DETAIL, {
    variables: {
      postId: route.params._id
    }
  });

  const DETAIL = {
    id: 1,
    content:
      "Tailwind CSS provides a wide range of text color utilities for varying shades of gray",
    img: "https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2012/9/19/1348050411799/Ralph-Wiggum-003.jpg?width=700&quality=85&auto=format&fit=max&s=e0b63e3485a4a02f3697520f744e0a30",
    author: {
      id: 1,
      username: "Ralph Wiggum",
      avatar: "https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2012/9/19/1348050411799/Ralph-Wiggum-003.jpg?width=700&quality=85&auto=format&fit=max&s=e0b63e3485a4a02f3697520f744e0a30",
    },
    createdAt: new Date(),
  };

  return (
    <ScrollView>
      <Text>{route.params._id}</Text>
      <PostCard post={DETAIL} />
    </ScrollView>
  );
}
