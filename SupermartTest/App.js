import React from 'react';
import {
  SafeAreaView,
  SafeAreaViewBase,
  Easing,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  FlatList,
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
      contentContainerStyle={{ padding: SPACING, paddingTop: StatusBar.currentHeight || 42 }}
      renderItem={({item, index}) => {
        return <View style={{
          flexDirection: 'row', 
          padding: SPACING, 
          marginBottom: SPACING, 
          backgroundColor: 'rgba(255, 255, 255, 0.9)', 
          borderRadius: 12, 
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 1,
          shadowRadius: 20
        }}>

          <Image 
            source={{uri: item.image}}
            style={{width: AVATAR_SIZE, height: AVATAR_SIZE, borderRadius: AVATAR_SIZE, marginRight: SPACING / 2 }}
          />

          <View>
            <Text style={{ fontSize: 22, fontWeight: '700'}}>{item.name}</Text>
            <Text style={{ fontSize: 13, opacity: 0.7}}>{item.jobTitle}</Text>
            <Text style={{ fontSize: 14, opacity: 0.8, color: '#0099cc'}}>{item.email}</Text>
          </View>

        </View>
      }}
    />
  </View>
};
