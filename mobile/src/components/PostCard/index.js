import { View } from "react-native";
import useDimensions from "../../hooks/useDimensions";
import Header from "./Header";
import Content from "./Content";
import Reaction from "./Reaction";
import { useState } from "react";

export default function PostCard({ post }) {
    const { width, height } = useDimensions();

    return (
        <View
            style={{
                width,
                backgroundColor: "white",
                marginBottom: 8,
            }}
        >
            <Header post={post} />
            <Content post={post} />
            <Reaction />
        </View>
    );
}
