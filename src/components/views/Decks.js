import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Card, Title, Paragraph } from 'react-native-paper';

class Decks extends Component {
  render() {
    const { decks, loading } = this.props;
    if (loading === true) {
      return <Text>loading...</Text>;
    }
    return (
      <ScrollView>
        {Object.keys(decks).map(key => (
          <Card
            onPress={() =>
              this.props.navigation.navigate('Deck', { deckKey: key })
            }
            style={{ margin: 5 }}
            key={key}
          >
            <Card.Content>
              <Title>{decks[key].title}</Title>
              <Paragraph>
                {decks[key].questions && decks[key].questions.length}
                {` Card${
                  decks[key].questions && decks[key].questions.length <= 1
                    ? ''
                    : 's'
                }`}
              </Paragraph>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    );
  }
}
const mapStateToProps = state => {
  return {
    decks: state,
    loading: state === undefined
  };
};

export default connect(mapStateToProps)(Decks);
