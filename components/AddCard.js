import React from "react";
import PropTypes from "prop-types";
import {
  TouchableOpacity,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet
} from "react-native";
import { addCardFunc } from "../actions";
import { connect } from "react-redux";

class AddCard extends React.Component {
  state = {
    question: "",
    answer: ""
  };
  handleQuestionChange = question => {
    this.setState({
      question
    });
  };

  handleAnswerChange = answer => {
    this.setState({
      answer
    });
  };

  handleAddCardSubmit = () => {
    const { dispatch, navigation } = this.props;
    const { deck } = navigation.state.params;
    const { question, answer } = this.state;
    const card = { question, answer };
    dispatch(addCardFunc(deck.id, card));
    navigation.navigate("Tabs");
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.box} behavior={"padding"}>
        <TextInput
          style={styles.input}
          placeholder="Question"
          value={this.state.question}
          onChangeText={this.handleQuestionChange}
        />
        <TextInput
          style={styles.input}
          placeholder="Answer"
          value={this.state.answer}
          onChangeText={this.handleAnswerChange}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={this.handleAddCardSubmit}
        >
          <Text>Add</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
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

export default connect()(AddCard);
