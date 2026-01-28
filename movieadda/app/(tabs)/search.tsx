import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '@/constants/images'
import { Image } from 'react-native'
import MovieCard from '@/components/movieCard'
import useFetch from '@/services/useFetch'
import { fetchMovies } from '@/services/api'
import { icons } from '@/constants/icons'
import SearchBar from '@/components/searchbar'
import { updateSearchCount } from '@/services/appwrite'

const Search = () => {


  const [query, setQuery]=useState('')

    const {data:movies,
        error:movieError,
        loading:movieLoading,
        refetch:loadMovies,
        reset
  }= useFetch(()=>fetchMovies({
    query:query
  }), true)





  useEffect(()=>{


    
    const func=async()=>{
     await updateSearchCount(query, movies[0]  as Movie)
      if(query.trim()){
        await loadMovies()
      }else{
        reset()
      }

    }

  const timeOut=  setTimeout(func , 500)




  return ()=>clearTimeout(timeOut)


},[query]) 


  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg}  className='flex-1 absolute w-full z-0 '
        resizeMode='cover'
      />
        <FlatList
          data={movies}
          renderItem={({item})=><MovieCard {...item}/>}
          keyExtractor={(item)=>item.id.toString()}
          className='px-5'
          numColumns={3}
          columnWrapperStyle={{
            justifyContent:'center',
            gap:16,
            marginVertical:16
          }}
          contentContainerStyle={{paddingBottom:100}}
          ListHeaderComponent={
            <>
              <View className='w-full flex-row justify-center mt-20 items-center '>
                  <Image source={icons.logo}  className='w-12 h-10 '   />
              </View>

              <View className='my-5'>
                  <SearchBar placeHolder='Search Movie...' 
                  onPress={()=>{}}
                    value={query}
                    onTextChange={(text:string)=>setQuery(text)}
                    
                    />
              </View>

              {movieLoading && (
                <ActivityIndicator size='large' color="#000ff" className='my-3'/>
              )}

               {movieError && (
                <Text>Error:{movieError.message}</Text>
               )}

               {!movieLoading && !movieError && query.trim() && movies?.length>0 && (
                <Text className='text-xl text-white font-bold'>
                  Search Result for{' '}
                  <Text className='text-purple-500' >{query}</Text>
                </Text>
               )}

               <View className='flex-1'>
                  <FlatList
                    data={movies}
                    renderItem={({item})=><MovieCard {...item}/>}
                    keyExtractor={(item)=>item.id.toString()}
                    className='px-5'
                    numColumns={3}
                    columnWrapperStyle={{
                      justifyContent:'center',
                      gap:16,
                      marginVertical:16
                    }}
                    contentContainerStyle={{paddingBottom:100}}
                    ListHeaderComponent={
                      <Text className='text-xl text-white font-bold'>
                        Recommended Movies
                      </Text>
                    }
                  />

               </View>

            </>
          }
        />
    </View>
  )
}

export default Search