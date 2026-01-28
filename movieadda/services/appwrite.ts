import {  APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID } from '@/app/env'
import {Client, Databases,Query} from 'react-native-appwrite'

const client=new Client()
.setEndpoint(APPWRITE_ENDPOINT) 
.setProject(APPWRITE_PROJECT_ID)


const database=new Databases(client)


export const updateSearchCount=async(query:string, movie:Movie)=>{

    const result=await database.listTransactions();

    console.log('result', result)




    //chck if the search term is in database or not
    //if a does not exist create a new one
    //if it does update the count of that search term to 1
}