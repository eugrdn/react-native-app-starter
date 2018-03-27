import * as React from 'react';
import {Router, Scene} from 'react-native-router-flux';
import {Home, SignIn} from './screens';

const RootScene = Scene as any;

export const Navigator = () => (
    <Router>
        <RootScene key="root">
            <Scene
                key="signin"
                component={SignIn}
                hideNavBar
                initial
            />
            <Scene
                key="home"
                component={Home}
            />
        </RootScene>
    </Router>
);
