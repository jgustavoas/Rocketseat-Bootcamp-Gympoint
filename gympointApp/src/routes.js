import React from 'react'; // Todo arquivo que usa JSX precisa importar o React
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { Image } from 'react-native';
import logo from '~/assets/logo_mini.png';

import SignIn from './pages/SignIn';
import SignOut from './pages/SignOut';
import Checkins from './pages/Checkins';

import HelpOrders from './pages/HelpOrders';
import AskHelp from './pages/HelpOrders/askHelp';
import ReadAnswer from './pages/HelpOrders/readAnswer';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
        }),
        App: createBottomTabNavigator(
          {
            Checkins: {
              screen: createStackNavigator(
                {
                  Checkins,
                },
                {
                  defaultNavigationOptions: {
                    headerTitle: (
                      <Image
                        style={{
                          width: 150,
                          height: 50,
                          resizeMode: 'contain',
                          alignSelf: 'center',
                        }}
                        source={logo}
                      />
                    ),
                    headerTransparent: false,
                    headerTintColor: '#333',
                    headerTitleContainerStyle: {
                      display: 'flex',
                      justifyContent: 'center',
                    },
                  },
                }
              ),
              navigationOptions: {
                tabBarVisible: true, // Esconder a aba quando se estiver navegando dentro das páginas do grupo "New", ao clicar em "Agendar"
                tabBarLabel: 'Checkins',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="check" size={20} color={tintColor} /> // React Native não reconheceu o ícone "where-to-vote" (fora da lista na mensagem de erro)
                ),
              },
            },
            HelpOrders: {
              screen: createStackNavigator(
                {
                  HelpOrders,
                  AskHelp,
                  ReadAnswer,
                },
                {
                  defaultNavigationOptions: {
                    headerTitle: (
                      <Image
                        style={{
                          width: 150,
                          height: 50,
                          resizeMode: 'contain',
                        }}
                        source={logo}
                      />
                    ),
                    headerTransparent: false,
                    headerTintColor: '#333',
                    headerTitleContainerStyle: {
                      display: 'flex',
                      justifyContent: 'center',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                    },
                  },
                }
              ),
              navigationOptions: {
                tabBarVisible: true,
                tabBarLabel: 'Pedir Ajuda',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="live-help" size={20} color={tintColor} />
                ),
              },
            },
            Sair: {
              screen: createStackNavigator(
                { SignOut },
                {
                  defaultNavigationOptions: {
                    headerTitle: (
                      <Image
                        style={{
                          width: 150,
                          height: 50,
                          resizeMode: 'contain',
                        }}
                        source={logo}
                      />
                    ),
                    headerTransparent: false,
                    headerTintColor: '#333',
                    headerTitleContainerStyle: {
                      display: 'flex',
                      justifyContent: 'center',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                    },
                  },
                }
              ),
              navigationOptions: {
                tabBarVisible: true,
                tabBarLabel: 'Sair',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="exit-to-app" size={20} color={tintColor} />
                ),
              },
            },
          },
          {
            resetOnBlur: true,
            tabBarOptions: {
              keyboardHidesTabBar: false,
              activeTintColor: '#e84d62',
              inactiveTintColor: '#ccc',
              style: {
                backgroundColor: '#FFF',
                paddingBottom: 20,
                paddingTop: 20,
                height: 80,
              },
              labelStyle: {
                fontSize: 16,
              },
            },
          }
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      }
    )
  );
