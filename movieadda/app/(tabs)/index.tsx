import SearchBar from "@/components/searchbar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Link, useRouter } from "expo-router";
import { ActivityIndicator, ActivityIndicatorBase, ActivityIndicatorComponent, FlatList, Image, ScrollView, Text, View } from "react-native";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/movieCard";
export default function Index() {

  const router=useRouter()


  const {data:movies,
        error:movieError,
        loading:movideLoading
  }= useFetch(()=>fetchMovies({
    query:""
  }))

  console.log('MOVIES' , movies)



  return (
    <View
      className="flex-1 bg-primary  "
    >
      <Image source={images.bg} className="absolute   z-0"/>
      <ScrollView className="flex-1  px-5 w-full" showsVerticalScrollIndicator={false} contentContainerStyle={{
        minHeight:'100%',
        paddingBottom:10 
      }}>
        
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto "/>

       

        {
        movideLoading ? <ActivityIndicator
          size='large'
          color="0000ff"
          className="mt-10 self-center"
        /> : movieError ? <Text className="text-white">Error: ${movieError?.message}</Text> :

        <View className="flex-1 mt-5">
          <SearchBar
          onPress={()=>router.push('./search')}
          placeHolder='Search for a movie'
          />


          <>
            <Text className="text-lg text-white font-bold mt-5 bt-3 ">Latest Movies</Text>


              <FlatList
                data={movies}
                renderItem={({item})=>(
                  // <Text className="text-white text-sm">{item.title}</Text>
                  <MovieCard 
                    {...item}
                  />
                )
                
                }
                keyExtractor={(item)=>item.id.toString()}
                numColumns={3}
                
                columnWrapperStyle={{
                  justifyContent:'center',
                  gap:20,
                  paddingRight:5,
                  marginBottom:10
                }}
                className="mb-32 mt-2"
                scrollEnabled={false}
              />
           
              

          </>


        </View>
 
        }


      </ScrollView>
    </View>
  );
}
