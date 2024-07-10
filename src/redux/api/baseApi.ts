import { BaseQueryApi, BaseQueryFn, createApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../features/store";
import { logout, setUser } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
  credentials: "include",

  //proti request er sathe backend e access token pass
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

//custom base qery
 
const baseQueryWithRefreshToken:BaseQueryFn<FetchArgs,BaseQueryApi,DefinitionType> = async (args, api, extraOptions):Promise<any>  => {
  let result = await baseQuery(args, api, extraOptions);

  //if error the send refresh token
  if (result.error?.status === 401) {
    //get from backend
    const res = await fetch("http://localhost:5000/api/v1/auth/refresh-token", {
      method: "POST",
      credentials: "include", //pass cookie to backend
    });

    const data = await res.json();

    //if refresh token expired the logout
    if(data?.data?.accessToken){
      const user = (api.getState() as RootState).auth.user; //api theke user ber hosse

      //setuser and new token
      api.dispatch(
        setUser({
          user,
          token: data?.data?.accessToken,
        })
      );
      result = await baseQuery(args, api, extraOptions); //again call the query which is failed in above
    }else{
      api.dispatch(logout());

    }

    
   
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
});
