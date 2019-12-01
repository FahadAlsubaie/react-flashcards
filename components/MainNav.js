import React from "react";
import { Text, View } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Decks from "./Decks";
import AddDeck from "./AddDeck";
import DeckView from "./DeckView";
import AddCard from "./AddCard";
import DeckQuiz from "./DeckQuiz";

const MainStack = createBottomTabNavigator({
  Decks: {
    screen: Decks
  },
  "New Deck": {
    screen: AddDeck
  }
});

const TabsNav = createAppContainer(MainStack);

const AppNav = createStackNavigator({
  Tabs: {
    screen: TabsNav
  },
  DeckView: {
    screen: DeckView
  },
  AddCard: {
    screen: AddCard
  },
  DeckQuiz: {
    screen: DeckQuiz
  }
});

const StackRoot = createAppContainer(AppNav);
export default StackRoot;
