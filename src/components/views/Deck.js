import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-paper';

class Deck extends Component {
  state = {
    deleted: false
  };

  handleStartQuiz = () => {
    alert('handle quiz');
    // this.props.navigation.navigate('Quiz', { screen: 'Deck' });
  };
  handleAddCard = () => {
    alert('handle add card');
    // this.props.navigation.navigate('AddCard');
  };

  render() {
    const { deck } = this.props;
    return (
      <View style={styles.cardContainer}>
        <Text style={{ fontSize: 44, textAlign: 'center' }}>{deck.title}</Text>
        <Text
          style={{
            fontSize: 22,
            textAlign: 'center',
            marginTop: 20,
            marginBottom: 20
          }}
        >
          {deck.questions.length} Cards
        </Text>
        <Button
          onPress={this.handleAddCard}
          style={styles.btn}
          mode="contained"
        >
          <Text style={{ fontWeight: 'bold' }}>Add Card</Text>
        </Button>
        <Button
          onPress={this.handleStartQuiz}
          style={styles.btn}
          mode="contained"
        >
          <Text style={{ fontWeight: 'bold' }}>Start Quiz</Text>
        </Button>
      </View>
    );
  }
}

const mapStateToProps = (decks, { route }) => {
  const { deckKey } = route.params;
  return {
    deckKey,
    deck: decks[deckKey]
  };
};

const styles = StyleSheet.create({
  cardContainer: { margin: 10, flex: 1, justifyContent: 'center' },
  btn: { marginTop: 10 }
});

export default connect(mapStateToProps)(Deck);
