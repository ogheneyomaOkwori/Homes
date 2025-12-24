import { Card, FeaturedCard } from "@/components/cards";
import Filters from "@/components/filters";
import NoResults from "@/components/noResults";
import Search from "@/components/search";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/globalProvider";
import { useAppwrite } from "@/lib/useAppwrite";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { user } = useGlobalContext();

  const params = useLocalSearchParams<{ query?: string, filter?: string; }>();
  const LIMIT = 8

  const { data: latestProperties, loading: isLoadingLatestProperties } = useAppwrite(
    {
      fn: getLatestProperties,
      params: {
        query: params.query,
        filter: params.filter
      }
    }
  );

  const { data: properties, loading: isLoadingProperties, refetch: refetchProperties } = useAppwrite(
    {
      fn: getProperties,
      params: {
        filter: params.filter,
        query: params.query,
        limit: LIMIT
      },
      skip: true
    }
  );

  const loader = isLoadingLatestProperties || isLoadingProperties;

  // console.log(latestProperties, 'latestProperties');
  // console.log(properties, 'properties');

  const handleCardPress = (id: string) => {
    // console.log(properties, 'properties');
    // console.log(latestProperties, 'latestProperties');
    router.push(`/properties/${id}`)

  }

  useEffect(() => {
    refetchProperties({
      filter: params.filter,
      query: params.query,
      limit: LIMIT

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
            <View
              className="flex flex-row items-center justify-between mt-5"
            >
              <View className="flex flex-row">
                <Image
                  source={{ uri: user?.avatar ?? images.profileIcon }}
                  // source={images.profileIcon}
                  className="size-12 rounded-full"
                />
                <View
                  className="flex flex-col items-start ml-2 justify-center"
                >
                  <Text className="text-xs font-rubik text-black-100">Good morning</Text>
                  <Text className="text-base fond-rubik-medium text-black-300">{user?.name}</Text>
                </View>
              </View>
              <Image source={icons.bell} className="size-6" />
            </View>
            <Search />
            <View className="my-5" >

              {isLoadingLatestProperties ? (
                <ActivityIndicator
                  size={"large"}
                  className="text-primary-300"
                />
              ) : (
                (!latestProperties || latestProperties.length === 0) ? (
                  <NoResults />
                ) : (
                  <View>
                    <View className="flex flex-row items-center justify-between">
                      <Text className="text-xl font-rubik-bold text-black-300">Featured</Text>
                      <TouchableOpacity>
                        <Text className="text-base font-rubik-bold text-primary-300">See All</Text>
                      </TouchableOpacity>
                    </View>
                    <FlatList
                      data={latestProperties ?? []}
                      // data={[]}
                      renderItem={
                        ({ item }) =>
                          <FeaturedCard
                            item={item}
                            onPress={() => handleCardPress(item.$id)}
                          />
                      }
                      keyExtractor={(item) => item?.$id.toString()}
                      horizontal
                      bounces={false}
                      showsHorizontalScrollIndicator={false}
                      contentContainerClassName="flex gap-5 mt-5"
                    />
                  </View>
                )
              )}
            </View>
            <View className="flex flex-row items-center justify-between">
              <Text className="text-xl font-rubik-bold text-black-300">Recommendations</Text>
              <TouchableOpacity>
                <Text className="text-base font-rubik-bold text-primary-300">See All</Text>
              </TouchableOpacity>
            </View>
            <Filters />
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
