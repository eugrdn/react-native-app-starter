import * as React from 'react';
import {AsyncStorage} from 'react-native';
import {ApolloProvider} from 'react-apollo';
import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {HttpLink} from 'apollo-link-http';
import {concat} from 'apollo-link';
import {setContext} from 'apollo-link-context';
import {config} from '../../common/config';

const httpLink = new HttpLink({uri: config.graphql});

const authMiddleware = setContext(async operation => {
    const token = await AsyncStorage.getItem('token');

    return {
        headers: {
            authorization: token || null
        }
    };
});

const client = new ApolloClient({
    link: concat(authMiddleware, httpLink),
    cache: new InMemoryCache()
});

export const withApollo = (
    WrappedComponent: React.ComponentClass<any> | React.SFC<any>
) =>
    class WithApollo extends React.Component<any, any> {
        render() {
            return (
                <ApolloProvider client={client}>
                    <WrappedComponent />
                </ApolloProvider>
            );
        }
    };
