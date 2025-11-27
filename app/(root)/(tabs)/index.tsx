import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="my-4 font-rubik font-rubik-bold text-xl">Welcome</Text>
      <Link href={"/sign-in"} className="text-blue-500 font-bold text-xl font-rubik text-3xl">Sign In</Link>
      <Link href={"/explore"} className="text-blue-500 font-bold text-xl font-rubik text-3xl">Explore</Link>
      <Link href={"/(root)/(tabs)/profile"} className="text-blue-500 font-bold text-xl font-rubik text-3xl">Profile</Link>
      <Link href={"/(root)/properties/[propertyId]"} className="text-blue-500 font-bold text-xl font-rubik text-3xl">Properties</Link>
    </View>
  );
}
