import React, { Component } from 'react';
import { Text, ScrollView, View, Alert, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Card, Title, Paragraph } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { _deleteDeck, _getDecks } from '../../api';
import { deleteDeck, getDecks } from '../../redux/actions';
class Decks extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    _getDecks().then(results => {
      dispatch(getDecks(results));
    });
  }

  handleDelete = deckKey => {
    const { dispatch } = this.props;
    return Alert.alert(
      'Are you sure you want to delete this deck?',
      'This action is not reversible',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Yes, I am sure',
          onPress: () => {
            return _deleteDeck(deckKey).then(() => {
              dispatch(deleteDeck(deckKey));
            });
          }
        }
      ],
      { cancelable: false }
    );
  };

  render() {
    const { decks } = this.props;
    return (
      <ScrollView stickyHeaderIndices={[0]}>
        {Object.keys(decks).map(key => (
          <Card
            onPress={() =>
              this.props.navigation.navigate('Deck', { deckKey: key })
            }
            style={{ margin: 5 }}
            key={key}
          >
            <Card.Content style={styles.cardContainer}>
              <View>
                <Title>{decks[key].title}</Title>
                <Paragraph>
                  {decks[key].questions && decks[key].questions.length}
                  {` Card${
                    decks[key].questions && decks[key].questions.length <= 1
                      ? ''
                      : 's'
                  }`}
                </Paragraph>
              </View>
              <View
                style={{
                  alignContent: 'center',
                  justifyContent: 'center'
                }}
              >
                <Text onPress={() => this.handleDelete(key)}>
                  <MaterialIcons size={35} name="delete-forever" color="red" />
                </Text>
              </View>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

const mapStateToProps = state => {
  return {
    decks: state
  };
};

export default connect(mapStateToProps)(Decks);
