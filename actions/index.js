import { createDeck, addCard } from "../utils/api";

export const RECEIVE_DECKS = "RECEIVE_DECKS";
export const ADD_CARD = "ADD_CARD";
export const ADD_DECK = "ADD_DECK";

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  };
}

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck
  };
}

function handleAddCard(deckId, card) {
  addCard(deckId, card);
  return {
    type: ADD_CARD,
    deckId,
    card
  };
}

export function addDeckFunction(title) {
  return dispatch => {
    return createDeck(title).then(newDeck => {
      dispatch(addDeck(newDeck));
    });
  };
}

export function addCardFunc(deckId, card) {
  return dispatch => {
    dispatch(handleAddCard(deckId, card));
    return addCard(deckId, card);
  };
}
