import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Button, Badge } from 'react-native-paper';

class Quiz extends Component {
  render() {
    const { decks } = this.props;
    if (decks && decks['Fresh'].questions.length === 0) {
      return (
        <View
          style={{
            flex: 1,
            alignContent: 'center',
            justifyContent: 'center',
            margin: 10
          }}
        >
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 22,
              textAlign: 'center',
              marginBottom: 10
            }}
          >
            Sorry, you can not take quiz your deck is empty. click bellow to add
            cards
          </Text>
          <Button
            mode="contained"
            onPress={() => this.props.navigation.navigate('Deck')}
          >
            Add Cards
          </Button>
        </View>
      );
    }
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center'
        }}
      >
        <Badge>{decks['Fresh'].questions.length}</Badge>
        <Button
          style={{
            backgroundColor: 'green',
            margin: 5
          }}
          mode="contained"
          onPress={() => alert('Correct')}
        >
          Correct
        </Button>
        <Button
          style={{
            backgroundColor: 'red',
            margin: 5
          }}
          mode="contained"
          onPress={() => alert('Incorrect')}
        >
          Incorrect
        </Button>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    decks: state
  };
};

export default connect(mapStateToProps)(Quiz);
