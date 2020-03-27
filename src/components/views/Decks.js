import React, { Component } from 'react';
import { Text, ScrollView, View, Alert, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Card, Title, Paragraph, Searchbar } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { _deleteDeck, _getDecks } from '../../api';
import { deleteDeck, getDecks } from '../../redux/actions';
class Decks extends Component {
  state = {
    firstQuery: '',
    searchResults: []
  };
  componentDidMount() {
    const { dispatch } = this.props;
    _getDecks().then(results => {
      dispatch(getDecks(results));
      this.setState({
        searchResults: Object.keys(results)
      });
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
  handleSearch = query => {
    const { decks } = this.props;
    this.setState({
      firstQuery: query,
      searchResults: query
        ? Object.keys(decks).filter(deck => deck.includes(query))
        : Object.keys(decks)
    });
  };

  render() {
    const { decks } = this.props;
    const { firstQuery, searchResults } = this.state;
    return (
      <ScrollView stickyHeaderIndices={[0]}>
        <Searchbar
          style={{ margin: 5 }}
          placeholder="Search"
          onChangeText={query => this.handleSearch(query)}
          value={firstQuery}
        />
        {searchResults.map(key => (
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
