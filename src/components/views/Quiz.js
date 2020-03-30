import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Button, Card, Title, ProgressBar, Colors } from 'react-native-paper';
import { _answerQuestion, _resetQuiz } from '../../api';
import { answerQuestion, resetQuiz } from '../../redux/actions';

class Quiz extends Component {
  state = {
    isAnswer: false,
    index: null
  };
  handleAnswerQuestion = (qid, title, isAnswered, isCorrect) => {
    const { dispatch } = this.props;
    _answerQuestion(qid, title, isAnswered, isCorrect).then(() => {
      dispatch(answerQuestion(qid, title, isAnswered, isCorrect));
    });
  };

  handleResetQuiz = title => {
    const { dispatch } = this.props;
    _resetQuiz(title).then(() => {
      dispatch(resetQuiz(title));
    });
  };
  render() {
    const {
      deck,
      deckKey,
      totalQuestions,
      correct,
      answered,
      allAnswered
    } = this.props;
    if (totalQuestions === 0) {
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
      <ScrollView stickyHeaderIndices={[0]}>
        <Card
          style={{
            margin: 5
          }}
        >
          <Card.Content>
            <Text
              style={{
                marginBottom: 5,

                textAlign: 'center'
              }}
            >
              {answered}/{totalQuestions}{' '}
              {answered === totalQuestions ? 'quiz completed 👏🏿' : 'remaining'}
            </Text>
            <Text>
              <ProgressBar
                style={{
                  marginTop: 5,
                  marginBottom: 5,
                  marginLeft: 1,
                  marginRight: 1
                }}
                progress={correct / totalQuestions}
                color={'black'}
              />
            </Text>
            <Text
              style={{
                textAlign: 'center'
              }}
            >
              {Math.round((correct / totalQuestions) * 100)} %
            </Text>

            {allAnswered && (
              <Button
                onPress={() => this.handleResetQuiz(deckKey)}
                style={{
                  marginTop: 5
                }}
                mode="outlined"
              >
                Reset Quiz
              </Button>
            )}
          </Card.Content>
        </Card>
        {deck.questions.map((question, index) => (
          <Card
            style={{
              margin: 5
            }}
            key={index}
          >
            <Card.Content>
              <Title
                style={{
                  textAlign: 'center'
                }}
              >
                {this.state.isAnswer && this.state.index === index
                  ? question.answer
                  : question.question}
              </Title>
              <Text
                onPress={() =>
                  this.setState({ isAnswer: !this.state.isAnswer, index })
                }
                style={{
                  color: 'red',
                  textAlign: 'center',
                  marginTop: 10,
                  marginBottom: 15
                }}
              >
                {this.state.isAnswer && this.state.index === index
                  ? ' Show Question'
                  : ' Show Answer'}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around'
                }}
              >
                <Button
                  disabled={question.isAnswered ? true : false}
                  style={styles.correctBtn}
                  mode="contained"
                  onPress={() =>
                    this.handleAnswerQuestion(question.qid, deckKey, true, true)
                  }
                >
                  Correct
                </Button>
                <Button
                  disabled={question.isAnswered ? true : false}
                  style={styles.incorrectBtn}
                  mode="contained"
                  onPress={() =>
                    this.handleAnswerQuestion(
                      question.qid,
                      deckKey,
                      true,
                      false
                    )
                  }
                >
                  Incorrect
                </Button>
              </View>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
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
    flex: 1
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
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
    deck: state[deckKey],
    correct: state[deckKey].questions.filter(
      question => question.isCorrect === true
    ).length,

    answered: state[deckKey].questions.filter(
      question => question.isAnswered === true
    ).length,

    allAnswered:
      state[deckKey].questions.filter(question => question.isAnswered === true)
        .length !== 0,
    totalQuestions: state[deckKey].questions.length
  };
};

export default connect(mapStateToProps)(Quiz);
