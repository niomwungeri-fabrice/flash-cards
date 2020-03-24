import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Button, Badge } from 'react-native-paper';

class Quiz extends Component {
  render() {
    const { deck, deckKey } = this.props;
    if (deck.questions.length === 0) {
      return (
        <View style={styles.emptyDeckContainer}>
          <Text style={styles.emptyDeck}>
            Sorry, you can not take quiz your deck is empty. click bellow to add
            cards
          </Text>
          <Button
            mode="contained"
            onPress={() =>
              this.props.navigation.navigate('AddCard', { deckKey })
            }
          >
            Add Cards
          </Button>
        </View>
      );
    }
    return (
      <View style={styles.quizContainer}>
        <Badge
          style={{
            justifyContent: 'flex-start'
          }}
        >
          {deck.questions.length}
        </Badge>
        <Button
          style={styles.correctBtn}
          mode="contained"
          onPress={() => alert('Correct')}
        >
          Correct
        </Button>
        <Button
          style={styles.incorrectBtn}
          mode="contained"
          onPress={() => alert('Incorrect')}
        >
          Incorrect
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  emptyDeckContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    margin: 10
  },
  emptyDeck: {
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 10
  },
  quizContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  correctBtn: {
    backgroundColor: 'green',
    margin: 5
  },
  incorrectBtn: {
    backgroundColor: 'red',
    margin: 5
  }
});

const mapStateToProps = (state, { route }) => {
  const { deckKey } = route.params;
  return {
    deckKey,
    deck: state[deckKey]
  };
};

export default connect(mapStateToProps)(Quiz);
