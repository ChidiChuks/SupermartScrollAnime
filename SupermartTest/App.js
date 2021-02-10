import React from 'react';
import {
  SafeAreaView,
  SafeAreaViewBase,
  Easing,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  Dimensions,
  Text,
  AppRegistry,
} from 'react-native';

const { width, height } = Dimensions.get('screen');

import faker from 'faker';

faker.seed(10);

const DATA = [...Array(30).keys()].map((_, i) => {
  return {
    key: faker.random.uuid(),
    image: `https://randomuser.me/api/portraits/${faker.helpers.randomize(['women', 'men'])}/${faker.random.number(60)}.jpg`,
    name: faker.name.findName(),
    jobTitle: faker.name.jobTitle(),
    email: faker.internet.email(),
  };
});

// credits to 
const BG_IMG = 'https://images.pexels.com/photos/1231265/pexels-photo-123.jpeg?auto=compress$cs=tinysrgb&dpr=2&w=500';

const SPACING = 20;
const AVATAR_SIZE = 70;

export default () => {
  return <View style={{flex: 1, backgroundColor: '#fff'}}>
    <FlatList 
      data={DATA}
      keyExtractor={item => item.key}
      renderItem={({Item, index}) => {
        return <View>
          <Image 
            source={{uri: item.image}}
            style={{width: AVATAR_SIZE, height: AVATAR_SIZE, }}
          />
        </View>
      }}
    />
  </View>
};
