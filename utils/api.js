import { AsyncStorage } from "react-native";
import { generateID } from "./helpers";

const STORAGE_KEY = "STORAGE_KEY";

export function data() {
  const data = {
    xx2l6w2xbfk0d2aapfru: {
      title: "Deck 1",
      id: "xx2l6w2xbfk0d2aapfru",
      questions: [
        {
          question: "Who am i?",
          answer: "None of your business"
        },
        {
          question: "who are you ?",
          answer: "I am the essence of magic"
        }
      ]
    },
    pyemsyv17zhvr1slgz3ton: {
      title: "Deck 2",
      id: "xx2l6w2xbfk0d2aapfru",
      questions: [
        {
          question: "who will raise ?",
          answer: "A hundred kings will rise again"
        }
      ]
    }
  };
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return data;
}

export async function getDecks() {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEY);
    if (value !== null) {
      const data = JSON.parse(value);
      return data;
    } else {
      return data();
    }
  } catch (e) {
    console.error("AsyncStorage#getDecks error: " + error.message);
  }
}

export async function createDeck(title) {
  const id = generateID();
  const newDeck = {
    [id]: {
      title: title,
      id: id,
      questions: []
    }
  };
  await AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(newDeck));
  return newDeck;
}

export async function addCard(id, card) {
  const jsonAllDecks = await AsyncStorage.getItem(STORAGE_KEY);
  if (jsonAllDecks !== null) {
    const allDecks = JSON.parse(jsonAllDecks);
    allDecks[id].questions.push({ card });
    const newDecks = {
      [id]: {
        questions: allDecks[id].questions
      }
    };
    const json = JSON.stringify(newDecks);
    await AsyncStorage.mergeItem(STORAGE_KEY, json);
  }
}
