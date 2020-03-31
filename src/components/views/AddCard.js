import React, { Component } from 'react';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { addCard } from '../../redux/actions';
import { _addCard } from '../../api';
import { connect } from 'react-redux';
import { generateUID } from '../../utils/helpers';

class AddCard extends Component {
  state = {
    question: '',
    answer: '',
    isDisabled: true
  };
  handleAddCard = () => {
    const { question, answer } = this.state;
    const { dispatch, deck } = this.props;
    const questionId = generateUID();
    _addCard(questionId, question, answer, deck).then(() => {
      dispatch(addCard(questionId, question, answer, deck));
    });
    this.setState({ question: '', answer: '' });
    this.props.navigation.navigate('Deck');
  };
  render() {
    const { isDisabled, question, answer } = this.state;
    return (
      <KeyboardAvoidingView style={styles.formContainer} behavior="padding">
        <TextInput
          style={styles.space}
          label="Question"
          value={question}
          name="question"
          onChangeText={question =>
            this.setState({
              question,
              isDisabled: question && answer ? false : true
            })
          }
        />
        <TextInput
          style={styles.space}
          label="Answer"
          value={answer}
          name="answer"
          onChangeText={answer =>
            this.setState({
              answer,
              isDisabled: question && answer ? false : true
            })
          }
        />
        <Button
          style={styles.space}
          mode="contained"
          disabled={isDisabled}
          onPress={this.handleAddCard}
        >
          Add Card
        </Button>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    marginTop: 15
  },
  space: {
    margin: 5
  }
});
const mapStateToProps = (state, { route }) => {
  const { deckKey } = route.params;
  return {
    deck: state[deckKey]
  };
};
export default connect(mapStateToProps)(AddCard);
