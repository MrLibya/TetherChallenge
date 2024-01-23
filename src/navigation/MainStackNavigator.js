import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';

const MainStackNavigator = () => {
    const MainStack = createStackNavigator();
    return (
        <MainStack.Navigator>
            <MainStack.Screen name="Home" component={HomeScreen} />

        </MainStack.Navigator>
    )

}

export default MainStackNavigator