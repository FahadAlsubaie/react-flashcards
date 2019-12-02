import { AsyncStorage } from "react-native";
import { generateID } from "./helpers";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

const STORAGE_KEY = "STORAGE_KEY";
const NOTFICATIONS_KEY = "NOTFICATIONS_KEY";

//Storage for flashcards
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

//notificaiton for flashcards

function newNotification() {
  return {
    title: "New quiz",
    body: "It's your daily Quiz!",
    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true
    }
  };
}

export function setNotification() {
  AsyncStorage.getItem(NOTIFICATIONS_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === "granted") {
            Notifications.cancelAllScheduledNotificationsAsync();

            let time = new Date();
            time.setDate(time.getDate() + 1);
            time.setHours(18);
            time.setMinutes(0);

            Notifications.scheduleLocalNotificationAsync(newNotification(), {
              time,
              repeat: "day"
            });

            AsyncStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(true));
          }
        });
      }
    });
}

export function clearNotification() {
  return AsyncStorage.removeItem(NOTIFICATIONS_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}
