# flash-cards

React Native/Redux project "flash-cards" for Udacity React Developer NanoDegree Program

# FrontEnd

Description of the front end of the application

#### Local setup instructions

```sh
$ git clone https://github.com/niomwungeri-fabrice/flash-cards.git
$ cd flash-cards
$ yarn
$ yarn start
```

#### API

To simplify your development process we have been provided with several 6 APIs

### `_addDeck`

Method Signature:

```js
_addDeck(deck);
```

- Returns a Promise which resolves to a JSON object containing a deck object.

### `_addCard`

Method Signature:

```js
_addCard(qid, question, answer, deck);
```

- qid: question Id.
- question : Question.
- answer: Answer to the question.
- deck: Deck where the question belong.
- Returns a Promise which resolves to a JSON object containing a collection of cards objects.

### `_deleteDeck`

Method Signature:

```js
_deleteDeck(deck);
```

- deck: Deck title
- Returns a Promise which resolves to a JSON object containing the response without deleted deck

### `_answerQuestion`

Method Signature:

```js
_answerQuestion(qid, title, isAnswered, isCorrect);
```

- qid : an auto generated unique Id for the question.
- title : deck title.
- isAnswered : a boolean value indicating if the question has been answered.
- isCorrect: a boolean value indicating if the question is correct or incorrect.
- Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `_resetQuiz`

Method Signature:

```js
_resetQuiz(title);
```

- title: Deck title
- Returns a Promise which resolves to a JSON object containing the response with a reset value on is Correct and is Answered

### `_getDecks`

Method Signature:

```js
_getDecks();
```

- Returns a Promise which resolves to a JSON object containing a collection of decks objects.

## Tested on:

- `Iphone 7, ios V. 13.3.1`
- `Pixel 5, android V. 6.0`

## Built with:

- [React Native](https://reactnative.dev/)
- [React/Redux](https://redux.js.org/)
- [React Native Paper](https://reactnativepaper.com/)
