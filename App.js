import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Easing } from 'react-native';

import 'react-native-reanimated';

import OnBordingScreen from './screens/OnBordingScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignupScreen'
import HomeScreen from './screens/HomeScreen';
import OtpScreen from './screens/OtpScreen';
import PhOtpScreen from './screens/PhOtpScreen';
import Profile from './screens/Profile';
import MainMenuScreen from './screens/MainMenuScreen';
import PhoneSignIn from './screens/PhoneSignIn';
import TestScreen from './screens/TestScreen';
import EditPhone from './screens/EditPhone';
import GroupView from './screens/GroupView';
import AddCoupon from './screens/AddCoupon';
import Groupinfo from './screens/Groupinfo';
import NewGroup from './screens/NewGroup';
import NewGroupDetails from './screens/NewGroupDetails';
import GroupMembers from './screens/GroupMembers';
import AddNewMembers from './screens/AddNewMembers';
import PendingApprovals from './screens/PendingApprovals';
import LoginEmail from './screens/LoginEmail';
import NotificationsScreen from './screens/NotificationsScreen';
import CreateGroupScreen from './screens/CreateGroupScreen';
import EditGroup from './screens/EditGroup';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
      screenOptions={{ headerShown: false }} //Code to add Basic-Animation 
      //  screenOptions={{               
      //   headerShown: false,
      //   cardStyleInterpolator: ({ current, next, layouts }) => {
      //     return {
      //       cardStyle: {
      //         opacity: current.progress.interpolate({
      //           inputRange: [0, 1],
      //           outputRange: [0, 1],
      //         }),
      //         transform: [
      //           {
      //             translateX: current.progress.interpolate({
      //               inputRange: [0, 1],
      //               outputRange: [layouts.screen.width, 0], // Slide effect
      //             }),
      //           },
      //         ],
      //       },
      //     };
      //   },
      // }}
      >

        <Stack.Screen
          name="OnBordingScreen"
          component={OnBordingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="LoginEmail" component={LoginEmail} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="OtpScreen" component={OtpScreen} />
        <Stack.Screen name="PhOtpScreen" component={PhOtpScreen} />
        <Stack.Screen name="PhoneSignIn" component={PhoneSignIn} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="EditPhone" component={EditPhone} />
        <Stack.Screen name="MainMenuScreen" component={MainMenuScreen} />
        <Stack.Screen name="TestScreen" component={TestScreen} />
        <Stack.Screen name="GroupView" component={GroupView} />
        <Stack.Screen name="Groupinfo" component={Groupinfo} />
        <Stack.Screen name="AddNewMembers" component={AddNewMembers} />
        <Stack.Screen name="NewGroup" component={NewGroup} />
        <Stack.Screen name="NewGroupDetails" component={NewGroupDetails} />
        <Stack.Screen name="GroupMembers" component={GroupMembers} />
        <Stack.Screen name="PendingApprovals" component={PendingApprovals} />
        <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} />
        <Stack.Screen name="CreateGroupScreen" component={CreateGroupScreen} />
        <Stack.Screen name="AddCoupon" component={AddCoupon} options={{ presentation: 'modal' }} />
        <Stack.Screen name="EditGroup" component={EditGroup} options={{ presentation: 'modal' }} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}
