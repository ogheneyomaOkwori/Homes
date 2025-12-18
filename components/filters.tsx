import { categories } from '@/constants/data';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';

const Filters = () => {
  const params = useLocalSearchParams<{ filter?: string }>();
  const [selectedCategory, setSelectedCategory] = useState(params.filter || 'All');

  const handleCategorySelect = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory('All');
      router.setParams({ filter: 'All' })
    }

    setSelectedCategory(category);
    router.setParams({ filter: category });
    return;
  }



  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className='mt-3 mb-2'
    >
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          className={`flex flex-col items-start mr-4 px-4 py-2 rounded-full 
          ${selectedCategory === category.category ? 'bg-primary-300' : 'bg-primary-200 border border-primary-200'}
          `}
          onPress={() => handleCategorySelect(category.category)}
        >
          <Text className={`text-xs ${selectedCategory === category.category ? 'text-white font-rubik-bold mt-0.5' : 'text-black-300 font-rubik'}`}>{category.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

export default Filters