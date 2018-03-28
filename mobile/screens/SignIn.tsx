import * as React from 'react';
import {Actions} from 'react-native-router-flux';
import {
    Text,
    View,
    TextInput,
    Button,
    StyleSheet,
    AsyncStorage
} from 'react-native';
import {graphql, compose, ChildProps, MutationFunc} from 'react-apollo';
import gql from 'graphql-tag';
import {Mutation, LoginMutationArgs, SignupMutationArgs} from '../../common';
import {Loader} from '../components';
import {getGqlError} from '../utils';

type SignInProps = ChildProps<
    {
        login: MutationFunc<{login: Mutation['login']}, LoginMutationArgs>;
        signup: MutationFunc<{signup: Mutation['signup']}, SignupMutationArgs>;
    },
    Pick<Mutation, 'login' | 'signup'>
>;

interface SignInState {
    email: string;
    password: string;
    message: string;
    signed: boolean;
}

class SignInScreen extends React.Component<SignInProps, SignInState> {
    state = {
        email: '',
        password: '',
        message: '',
        signed: false
    };

    handleFieldChange = (field: keyof SignInState) => (text: string) =>
        this.setState({[field as any]: text});

    handleSignUpPress = async () => {
        const {email, password} = this.state;

        if (this.isCredsValid()) {
            try {
                await this.props.signup({variables: {email, password}});
                this.setState({signed: true}, this.login);
            } catch (error) {
                this.setState({message: getGqlError(error), signed: true});
            }
        }
    };

    handleLoginPress = () => this.isCredsValid() && this.login();

    login = async () => {
        const {email, password} = this.state;

        try {
            const {data: {login}} = await this.props.login({variables: {email, password}})
            login && AsyncStorage.setItem('token', login, () => Actions.push('home'));
        } catch (error) {
            this.setState({message: getGqlError(error)});
        }
    };

    isCredsValid() {
        return this.state.email.length && this.state.password.length;
    }

    renderForm() {
        return (
            <View>
                <Text>Email</Text>
                <TextInput
                    value={this.state.email}
                    onChangeText={this.handleFieldChange('email')}
                />
                <Text>Password</Text>
                <TextInput
                    value={this.state.password}
                    onChangeText={this.handleFieldChange('password')}
                    secureTextEntry
                />
            </View>
        );
    }

    renderButtons() {
        return (
            <View>
                <Button
                    title="SignUp"
                    onPress={this.handleSignUpPress}
                    disabled={this.state.signed || !this.isCredsValid()}
                />
                <Button
                    title="Login"
                    onPress={this.handleLoginPress}
                    disabled={!this.isCredsValid()}
                />
            </View>
        );
    }

    renderContent() {
        return (
            <View>
                {this.renderForm()}
                {this.renderButtons()}
                <Text>{this.state.message}</Text>
            </View>
        );
    }

    render() {
        const {data} = this.props;

        return (
            <View style={styles.container}>
                {data && data.loading ? <Loader /> : this.renderContent()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password)
    }
`;

const SIGNUP = gql`
    mutation signup($email: String!, $password: String!) {
        signup(email: $email, password: $password) {
            id
            role
            email
            password
            created_at
        }
    }
`;

export const SignIn = compose(
    graphql<Pick<Mutation, 'login'>, LoginMutationArgs>(LOGIN, {
        name: 'login'
    }),
    graphql<Pick<Mutation, 'signup'>, SignupMutationArgs>(SIGNUP, {
        name: 'signup'
    })
)(SignInScreen);
