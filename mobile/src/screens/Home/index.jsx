import { TouchableOpacity, View, FlatList } from "react-native";
import PostCard from "../../components/PostCard";
import HeaderHome from "./HeaderHome";
import AddPostSheet from "./AddPostSheet";
import { useEffect, useState } from "react";

import { gql, useQuery } from "@apollo/client";
import { GET_POSTS } from "../../queries/posts";

export default function Home({ navigation }) {
    const { data, loading, error } = useQuery(GET_POSTS);

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (data) {
            let newPosts = data.posts.map((el) => {
                let obj = {
                    id: el._id,
                    content: el.body,
                    img: `https://source.unsplash.com/random/300x200?sig=${el._id}`,
                    author: {
                        id: 1,
                        username: "Ralph Wiggum",
                        avatar: "https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2012/9/19/1348050411799/Ralph-Wiggum-003.jpg?width=700&quality=85&auto=format&fit=max&s=e0b63e3485a4a02f3697520f744e0a30",
                    },
                    createdAt: new Date(),
                };
                return obj;
            });
            setPosts(newPosts);
        }
    }, [data]);

    const [show, setShow] = useState(false);

    const showSheet = () => {
        setShow(true);
    };

    return (
        <View style={{}}>
            <FlatList
                data={posts}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => {
                            // navigation.navigate("PostDetail", {
                            //     id: item.id,
                            // });
                        }}
                    >
                        <PostCard post={item} />
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={<HeaderHome showSheet={showSheet} />}
            />
            <AddPostSheet show={show} setShow={setShow} />
        </View>
    );
}
