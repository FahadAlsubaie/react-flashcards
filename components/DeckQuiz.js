import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { withNavigation } from "react-navigation";
import { clearNotification, setNotification } from "../utils/api";

class DeckQuiz extends React.Component {
  state = {
    solved: 0,
    currentCard: 0,
    answerVisible: false
  };

  render() {
    const { navigation } = this.props;
    const { deck } = navigation.state.params;
    const { questions } = deck;
    const { solved, currentCard, answerVisible } = this.state;

    if (questions.length === 0) {
      return (
        <View style={styles.box}>
          <Text style={styles.textHeader}>
            this deck is empty go and add a card first
          </Text>
        </View>
      );
    }
    if (currentCard === questions.length) {
      clearNotification().then(setNotification());
    }

    return questions.length !== currentCard ? (
      <View style={styles.box}>
        <Text style={styles.textHeader}>
          {currentCard + 1}-{questions.length}
        </Text>
        {answerVisible ? (
          <Text style={styles.textHeader}>{questions[currentCard].answer}</Text>
        ) : (
          <Text style={styles.textHeader}>
            {questions[currentCard].question}
          </Text>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.setState({
              answerVisible: !answerVisible
            });
          }}
        >
          <Text>{answerVisible ? "The Question" : "The Answer"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.setState({
              currentCard: this.state.currentCard + 1,
              solved: this.state.solved + 1
            });
          }}
        >
          <Text>Correct</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.setState({
              currentCard: this.state.currentCard + 1
            });
          }}
        >
          <Text>Incorrect</Text>
        </TouchableOpacity>
      </View>
    ) : (
      <View style={styles.box}>
        <Text style={styles.textHeader}>
          You got {solved} out of {questions.length} Questions!!
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.setState({
              solved: 0,
              currentCard: 0,
              answerVisible: false
            });
          }}
        >
          <Text>Restart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text>Back</Text>
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

export default withNavigation(DeckQuiz);
