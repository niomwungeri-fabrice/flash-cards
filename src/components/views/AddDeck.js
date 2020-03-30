import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { addDeck } from '../../redux/actions/index';
import { connect } from 'react-redux';
import { CommonActions } from '@react-navigation/native';
import { _addDeck } from '../../api';
class AddDeck extends Component {
  state = {
    text: '',
    isDisabled: true
  };
  handleCreateDeck = () => {
    const { dispatch } = this.props;
    const { text } = this.state;
    _addDeck(text).then(() => {
      dispatch(addDeck(text));
    });
    this.toHome();
    this.setState({ text: '' });
  };
  toHome = () => {
    const { navigation } = this.props;
    return navigation.dispatch(CommonActions.navigate({ name: 'Decks' }));
  };
  render() {
    const { isDisabled, text } = this.state;
    return (
      <View style={styles.formContainer}>
        <TextInput
          style={styles.space}
          label="Name of the Deck"
          value={text}
          onChangeText={text =>
            this.setState({ text, isDisabled: text ? false : true })
          }
        />
        <Button
          style={styles.space}
          mode="contained"
          disabled={isDisabled}
          onPress={this.handleCreateDeck}
        >
          Create Deck
        </Button>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  space: {
    margin: 5
  }
});

export default connect()(AddDeck);
