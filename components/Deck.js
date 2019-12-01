import React from "react";
import { connect } from "react-redux";
import { Text, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";

class Deck extends React.Component {
  onPressHandler = () => {
    const { deck, navigation } = this.props;
    navigation.navigate("DeckView", { deck });
  };
  render() {
    const { deck } = this.props;

    return (
      <TouchableOpacity onPress={this.onPressHandler}>
        <Text
          style={{
            fontSize: 20,
            color: "black",
            lineHeight: 24,
            textAlign: "center",
            margin: 20
          }}
        >
          {deck.title} - {deck.questions.length} cards
        </Text>
      </TouchableOpacity>
    );
  }
}

export default withNavigation(connect()(Deck));
