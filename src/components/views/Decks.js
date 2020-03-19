import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, Title, Paragraph } from 'react-native-paper';

class Decks extends Component {
  handlePress = (e, key) => {
    alert('clicked!', key);
  };
  render() {
    const { decks, loading } = this.props;
    if (loading === true) {
      return <Text>loading...</Text>;
    }
    return (
      <View>
        {Object.keys(decks).map(key => (
          <Card
            onPress={(e, key) => this.handlePress(e, key)}
            style={{ margin: 5 }}
            key={key}
          >
            <Card.Content>
              <Title>{decks[key].title}</Title>
              <Paragraph>Cards {decks[key].questions.length}</Paragraph>
            </Card.Content>
          </Card>
        ))}
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    decks: state,
    loading: state === undefined
  };
};
const styles = {
  cardAction: {
    display: 'block',
    textAlign: 'initial'
  }
};

export default connect(mapStateToProps)(Decks);
