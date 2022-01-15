import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as Provider,
  useQuery,
  gql
} from "@apollo/client";


const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});

const ApolloProvider = (props) => {
  return (
    <Provider client={client} {...props} />
  )
}

export default ApolloProvider
