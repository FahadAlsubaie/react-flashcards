import React from "react";
import {
  TouchableOpacity,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet
} from "react-native";

import { deleteAlldecks } from "../actions";
import { connect } from "react-redux";
import { addDeckFunction, receiveDecks } from "../actions";
import { withNavigation } from "react-navigation";

class ScreenAddDeck extends React.Component {
  state = {
    deckName: ""
  };
  handleChange = deckName => {
    this.setState({
      deckName
    });
  };

  addDeckHandler = () => {
    const { dispatch, navigation } = this.props;

    dispatch(addDeckFunction(this.state.deckName))
      .then(() => {
        this.setState({
          deckName: ""
        });
      })
      .then(navigation.goBack());
  };

  render() {
    const { deckName } = this.state;

    return (
      <KeyboardAvoidingView>
        <Text style={styles.textHeader}>
          what you like your deck name to be?
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Deck Name"
          value={this.state.deckName}
          onChangeText={this.handleChange}
        />
        <TouchableOpacity style={styles.button} onPress={this.addDeckHandler}>
          <Text>Add</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
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

function mapStateToProps(decks) {
  return {
    decks
  };
}

export default withNavigation(connect(mapStateToProps)(ScreenAddDeck));
