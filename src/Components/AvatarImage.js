import * as React from 'react';
import {
    Image,
    StyleSheet,
    View,
} from 'react-native';
import { Colors } from '../../constants/theme';
import { appIcons } from '../../constants/icons';

const defaultSize = 64;

const AvatarImage = ({   size = defaultSize,   source,   style,   ...rest}) => {

    const { backgroundColor = Colors.primary } = StyleSheet.flatten(style) || {};

    return (
        <View
            style={[
                {
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    backgroundColor,
                },
                style,
            ]}
            {...rest}
        >
            
                <Image
                    source={ source ? {uri : source  } : appIcons.user}
                    style={{ width: size, height: size, borderRadius: size / 2 }}
                    onError={(e)=>console.log('error : ' , e)}
                />
        </View>
    );
};


export default AvatarImage