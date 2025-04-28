import { SafeAreaView } from 'react-native';
import UserHeader from './UserHeader';
import NavigationHeader from './NavigationHeader';
import Content from './Content';

export default function CreatePost() {
  const DATA = {
    id: 2,
    username: "Moe Szyslak",
    avatar: "https://www.gyfted.me/_next/image?url=%2Fimg%2Fcharacters%2Fmoe-szyslak.png&w=640&q=75"
  };
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: "white"
    }}>
      <NavigationHeader />
      <UserHeader user={DATA} />
      <Content />
    </SafeAreaView>
  );
}