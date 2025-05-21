import PostCard from "../components/PostCard";
import { ScrollView } from "react-native";

export default function PostDetail() {
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
            <PostCard post={DETAIL} />
        </ScrollView>
    );
}
