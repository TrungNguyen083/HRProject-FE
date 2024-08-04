import { NgModule } from '@angular/core';
import {
  ApolloClientOptions,
  ApolloLink,
  DefaultOptions,
  InMemoryCache
} from '@apollo/client/core';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { setContext } from '@apollo/client/link/context';

const uri = 'http://localhost:8080/graphql';

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

// export function createApollo(httpLink: HttpLink): ApolloClientOptions<unknown> {
//   return {
//     link: httpLink.create({ uri, withCredentials: true }),
//     cache: new InMemoryCache({
//       addTypename: false
//     }),
//     defaultOptions: defaultOptions,
//   };
// }

export function createApollo(httpLink: HttpLink): ApolloClientOptions<unknown> {
  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : "",
      }
    };
  });

  const http = httpLink.create({ uri, withCredentials: true });

  return {
    link: ApolloLink.from([authLink, http]),
    cache: new InMemoryCache({
      addTypename: false
    }),
    defaultOptions: defaultOptions,
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
