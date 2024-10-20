import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";

import { HomeScreen } from "./HomeScreen";
import { CountryListScreen } from "./CountryListScreen";
import { CountryDetailScreen } from "./CountryDetailScreen";

const StackNavigator = stackNavigatorFactory();

export const MainStack = () => (
    <BaseNavigationContainer>
        <StackNavigator.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#65adf1",
                },
                headerTintColor: "white",
                headerShown: true,
            }}
        >
            <StackNavigator.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: "Tarih Defteri" }}
            />
            <StackNavigator.Screen
                name="CountryList"
                component={CountryListScreen}
                options={{ title: "Ülkeler" }}
            />
            <StackNavigator.Screen
                name="CountryDetail"
                component={CountryDetailScreen}
                options={({ route }) => ({ title: route.params.countryId })}
            />
        </StackNavigator.Navigator>
    </BaseNavigationContainer>
);