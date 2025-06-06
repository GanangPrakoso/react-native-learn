import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { globalStyle, utilities } from "../../constant/utilities";
import { useNavigation } from "@react-navigation/native";

import { gql, useMutation } from "@apollo/client";
import { GET_POSTS } from "../../queries/posts";

const ADD_POST = gql`
    mutation AddPost($post: newPost) {
        addPost(post: $post)
    }
`;

export default function AddPostSheet({ show, setShow }) {
    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ["70%", "100%"], []);
    const navigation = useNavigation();

    const [addPost, { data, loading, error }] = useMutation(ADD_POST, {
        refetchQueries: [GET_POSTS],
    });

    const [body, setBody] = useState("");
    const handleSheetChanges = useCallback((index) => {
        if (index == -1) {
            setShow(false);
        }
    }, []);

    const handlePost = async () => {
        try {
            console.log({ body, title: "new post here" });
            await addPost({
                variables: {
                    post: {
                        body: body,
                        tags: ["graphql"],
                        title: "new post here",
                    },
                },
            });
            setBody("");
            handleClose();
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (show) {
            handleOpen();
        }
    }, [show]);

    const handleOpen = () => bottomSheetRef.current.expand();
    const handleClose = () => bottomSheetRef.current.close();
    return (
        <View style={styles.container}>
            <BottomSheet
                ref={bottomSheetRef}
                index={0.5}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                enablePanDownToClose
            >
                <View style={styles.contentContainer}>
                    <View
                        style={{
                            flex: 1,
                            paddingHorizontal: utilities.padding.xl,
                        }}
                    >
                        <TextInput
                            placeholder="Whats up"
                            multiline={true}
                            numberOfLines={3}
                            style={[globalStyle.textInput]}
                            value={body}
                            onChangeText={(text) => setBody(text)}
                        />
                        <View style={{ flexDirection: "row", gap: 10 }}>
                            <TouchableOpacity
                                style={globalStyle.primaryButton}
                                onPress={handlePost}
                            >
                                <Text
                                    variant="titleLarge"
                                    style={globalStyle.textButton}
                                >
                                    Post
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={globalStyle.cancelButton}
                                onPress={() => {
                                    handleClose();
                                }}
                            >
                                <Text
                                    variant="titleLarge"
                                    style={{
                                        fontFamily:
                                            utilities.fontFamily.firaMedium,
                                        color: utilities.color.primary,
                                    }}
                                >
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </BottomSheet>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        justifyContent: "flex-start",
    },
    contentContainer: {
        flex: 1,
        justifyContent: "flex-start",
    },
});
