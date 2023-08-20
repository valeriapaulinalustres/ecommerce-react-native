import {createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { realtime_database_url } from "../Database/firebaseConfig"

export const shopApi = createApi({
    reducerPath: 'shopApi',
    baseQuery: fetchBaseQuery({baseUrl: realtime_database_url}),
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => `categories.json` //This is the endpoint and must have the same name as the key in Firebase
        }),
        getProducts: builder.query({
            query: () => `products.json` //This is the endpoint and must have the same name as the key in Firebase
        }),
        getOrders: builder.query({
            query: ()=> `orders.json`
        }),
        getProductsByCategory: builder.query({
            query: (category) => `products.json?orderBy="category"&equalTo="${category}"`,
            transformResponse: (response) => { //transformeResponse is used to transform the data into array of objects
                const productsTransformed = Object.values(response)
                return (productsTransformed)
            }
        }),
        getProductById: builder.query({
            query: (productId) => `products.json?orderBy="id"&equalTo=${productId}`,
            transformResponse: (response) => {
                const productTransformed = Object.values(response).pop()
                return (productTransformed)
            }
        }),
        postCart: builder.mutation({
            query: (order) => ({
                url: `orders.json`,
                method: `POST`,
                body: order
            })
        }),
        getProfileImage: builder.query({
            query: (localId) => `profileImages/${localId}.json`,
        }),
        //PUT is used to not generate a new key
        postProfileImage: builder.mutation({
            query: ({image, localId}) => ({
                url: `profileImages/${localId}.json`,
                method: "PUT",
                body: {
                    image: image
                },
            }),
        }),
        getUserLocation: builder.query({
            query: (localId) => `locations/${localId}.json`,
        }),
        postUserLocation: builder.mutation({
            query: ({location, localId}) => ({
                url: `locations/${localId}.json`,
                method: "PUT",
                body: {
                    latitude: location.latitude,
                    longitude: location.longitude,
                    address: location.address
                }
            })
        }),
    })
})

export const {
    useGetCategoriesQuery, 
    useGetProductsQuery, 
    useGetOrdersQuery,
    useGetProductsByCategoryQuery,
    useGetProductByIdQuery,
    usePostCartMutation,
    useGetProfileImageQuery,
    usePostProfileImageMutation,
    useGetUserLocationQuery,
    usePostUserLocationMutation
} = shopApi