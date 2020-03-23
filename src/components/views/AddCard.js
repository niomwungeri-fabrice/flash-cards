import React, { Component } from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { addCard } from '../../redux/actions';
import { _addCard } from '../../api';
import { connect } from 'react-redux';

class AddCard extends Component {
  state = {
    question: '',
    answer: '',
    isDisabled: true
  };
  handleAddCard = () => {
    const { question, answer } = this.state;
    const { dispatch, deck } = this.props;
    _addCard(question, answer, deck).then(() => {
      dispatch(addCard(question, answer, deck));
    });
    this.setState({ question: '', answer: '' });
  };
  render() {
    const { isDisabled, question, answer } = this.state;
    return (
      <View style={styles.formContainer}>
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
      </View>
    );
  }
}
const styles = {
  formContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  space: {
    margin: 5
  }
};
const mapStateToProps = (state, { route }) => {
  const { deckKey } = route.params;
  return {
    deck: state[deckKey]
  };
};
export default connect(mapStateToProps)(AddCard);
