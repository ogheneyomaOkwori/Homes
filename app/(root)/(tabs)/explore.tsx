import { Card } from "@/components/cards";
import Filters from "@/components/filters";
import NoResults from "@/components/noResults";
import Search from "@/components/search";
import icons from "@/constants/icons";
import { getProperties } from "@/lib/appwrite";
import { useAppwrite } from "@/lib/useAppwrite";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const Explore = () => {

  const params = useLocalSearchParams<{ query?: string, filter?: string; }>();

  const { data: properties, loading: isLoadingProperties, refetch: refetchProperties } = useAppwrite(
    {
      fn: getProperties,
      params: {
        filter: params.filter,
        query: params.query,
        limit: 20
      },
      skip: true
    }
  );

  const loader = isLoadingProperties;

  const handleCardPress = (id: string) => {
    router.push(`/properties/${id}`)
  }

  useEffect(() => {
    refetchProperties({
      filter: params.filter,
      query: params.query,
      limit: 20

    })
  }, [params.filter, params.query]);

  return (
    <SafeAreaView className="bg-white h-full">
      {/* <Button title="Seed Database" onPress={seed} /> */}
      <FlatList
        data={properties ?? []}
        // data={[]}
        renderItem={
          ({ item }) =>
            <Card
              item={item}
              onPress={() => handleCardPress(item.$id)}
            />
        }
        keyExtractor={(item) => item?.$id.toString()}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="px-5">
            <View className="flex flex-row justify-between items-center mt-5">
              <TouchableOpacity
                className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
                onPress={() => router.back()}>
                <Image
                  source={icons.backArrow}
                  className="size-5"
                />
              </TouchableOpacity>
              <Text className="text-base mr-2 text-center font-rubik-medium text-black-300">Search for your ideal home</Text>
              <Image source={icons.bell} className="w-6 h-6" />
            </View>

            <Search />
            <View className="mt-5">
              <Filters />
              <Text className="text-xl font-rubik-bold text-black-300 mt-5">
                Found {properties?.length} properties
              </Text>
            </View>
          </View>
        }
        ListEmptyComponent={
          loader ? (
            <ActivityIndicator
              size="large"
              color="#3B82F6"
              className="mt-10"
            />
          ) : (
            <NoResults />
          )
        }
      />

    </SafeAreaView>
  );
}

export default Explore