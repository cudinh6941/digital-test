import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const HomeScreen = ({navigation}) => (
  <View style={styles.container}>
    <Image
      source={require('./src/assets/home-background.png')}
      style={styles.background}
    />
    <View style={styles.content}>
      <Text style={styles.title}>TRICKY CUPS</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Gameplay')}
        style={styles.button}>
        <Text style={styles.buttonText}>TAP TO PLAY</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const GameplayScreen = ({navigation}) => {
  const [ballPosition, setBallPosition] = useState(
    Math.floor(Math.random() * 3),
  );
  const [selectedCup, setSelectedCup] = useState(null);

  const handleCupSelect = cupIndex => {
    setSelectedCup(cupIndex);
    if (cupIndex === ballPosition) {
      navigation.navigate('Result', {won: true});
    } else {
      navigation.navigate('Result', {won: false});
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./src/assets/background.png')}
        style={styles.background}
      />
      <View style={styles.cupsContainer}>
        {[0, 1, 2].map(index => (
          <TouchableOpacity key={index} onPress={() => handleCupSelect(index)}>
            <Image
              source={require('./src/assets/plastic-cup.png')}
              style={styles.cup}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const ResultScreen = ({route, navigation}) => {
  const {won} = route.params;

  return (
    <View style={styles.container}>
      <Image
        source={require('./src/assets/background.png')}
        style={styles.background}
      />
      <Text style={[styles.resultText, won ? styles.winText : styles.loseText]}>
        {won ? 'YOU WIN' : 'YOU LOSE'}
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Gameplay')}
        style={styles.button}>
        <Text style={styles.buttonText}>TAP TO RESTART</Text>
      </TouchableOpacity>
    </View>
  );
};

const App = () => (
  <NavigationContainer>
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Gameplay" component={GameplayScreen} />
      <Stack.Screen name="Result" component={ResultScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#D85A6E',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cupsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
  },
  cup: {
    width: 100,
    height: 150,
    resizeMode: 'contain',
  },
  resultText: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  winText: {
    color: '#4CAF50',
  },
  loseText: {
    color: '#D85A6E',
  },
});

export default App;
