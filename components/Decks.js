import React from "react";
import { StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
import { getDecks } from "../utils/api";
import Deck from "./Deck";
import { connect } from "react-redux";
import { receiveDecks } from "../actions";

class Decks extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    getDecks().then(decks => dispatch(receiveDecks(decks)));
  }

  render() {
    const { decks } = this.props;
    return (
      <ScrollView style={{ flex: 1, backgroundColor: "#fff", margin: 20 }}>
        {Object.keys(decks).map(id => (
          <Deck key={id} deck={decks[id]} />
        ))}
      </ScrollView>
    );
  }
}

function mapStateToProps(decks) {
  return {
    decks
  };
}

export default connect(mapStateToProps)(Decks);
