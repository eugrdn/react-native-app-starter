import * as React from 'react';
import {Text, View} from 'react-native';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {Loader} from '../components';
import {Query} from '../../common';
import {getGqlError} from '../utils';

const ME_QUERY = gql`
    {
        me {
            firstName
            lastName
            created_at
            login {
                password
                mail
            }
        }
    }
`;

const withUsers = graphql<Pick<Query, 'me'>>(ME_QUERY);

export const Home = withUsers(props => {
    const data = props.data;

    if (!data) {
        return null;
    }

    const {me, loading} = data;

    return (
        <View>
            {me ? (
                <Text>{JSON.stringify(me, null, 4)}</Text>
            ) : loading ? (
                <Loader />
            ) : (
                <Text>{getGqlError(data)}</Text>
            )}
        </View>
    );
});
