import {Dimensions, Platform} from 'react-native';
import {colors} from './colors';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const platform = Platform.OS;
const platformStyle = 'default';

export const theme = {
    bg: colors.black,
    loaderColor: colors.grey,
    colors,
    deviceHeight,
    deviceWidth,
    platform,
    platformStyle
};
