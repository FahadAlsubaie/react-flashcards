import React from "react";
import { StyleSheet, Text, View } from "react-native";

import reducer from "./reducers";
import applyMiddleware from "./middleware";
import MainNav from "./components/MainNav";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { getDecks } from "./utils/api";
import { receiveDecks } from "./actions";

export default class App extends React.Component {
  render() {
    const store = createStore(reducer, applyMiddleware);
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNav />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between"
  }
});
