import * as React from 'react';
import {ActivityIndicator, ActivityIndicatorProperties} from 'react-native';
import {theme} from '../../common/styles'

export const Loader: React.SFC<ActivityIndicatorProperties> = ({
    size,
    color
}) => <ActivityIndicator size={size} color={color} />;

Loader.defaultProps = {
    size: 'large',
    color: theme.loaderColor,
};
