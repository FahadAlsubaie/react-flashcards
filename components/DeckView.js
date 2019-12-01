import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";

class DeckView extends React.Component {
  addCardHandler = () => {
    const { navigation } = this.props;
    const { deck } = navigation.state.params;
    navigation.push("AddCard", { deck });
  };
  startQuizHandler = () => {
    const { navigation } = this.props;
    const { deck } = navigation.state.params;
    navigation.push("DeckQuiz", { deck });
  };

  render() {
    const { deck } = this.props.navigation.state.params;
    return (
      <View style={styles.box}>
        <Text style={styles.textHeader}>{deck.title}</Text>
        <Text style={styles.textHeader}>{deck.questions.length} cards</Text>
        <TouchableOpacity style={styles.button} onPress={this.addCardHandler}>
          <Text>Add a new card</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.startQuizHandler}>
          <Text>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: { flex: 1, backgroundColor: "#fff", margin: 20 },
  button: {
    backgroundColor: "green",
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    margin: 40
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 2,
    margin: 60,
    marginTop: 20
  },
  textHeader: {
    fontSize: 20,
    color: "black",
    lineHeight: 24,
    textAlign: "center",
    marginTop: 40,
    margin: 20
  }
});

export default withNavigation(DeckView);
