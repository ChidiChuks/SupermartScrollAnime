/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StatusBar,
  StyleSheet,
  FlatList,
  Image,
  View,
  Dimensions,
  Text,
  Animated,
} from 'react-native';

const {width, height} = Dimensions.get('screen');

import faker from 'faker';

faker.seed(20);

const DATA = [...Array(30).keys()].map((_, i) => {
  return {
    key: faker.random.uuid(),
    image: `https://randomuser.me/api/portraits/${faker.helpers.randomize([
      'women',
      'men',
    ])}/${faker.random.number(100)}.jpg`,
    name: faker.name.findName(),
    jobTitle: faker.name.jobTitle(),
    email: faker.internet.email(),
  };
});

// credits to
const BG_IMG =
  'https://images.pexels.com/photos/1214258/pexels-photo-1214258.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260';

const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 4;

export default () => {
  const scrollY = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Image
        source={{uri: BG_IMG}}
        style={StyleSheet.absoluteFillObject}
        blurRadius={80}
      />
      <Animated.FlatList
        data={DATA}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        keyExtractor={(item) => item.key}
        contentContainerStyle={{
          padding: SPACING,
          paddingTop: StatusBar.currentHeight || 42,
        }}
        renderItem={({item, index}) => {
          const inputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 2),
          ];

          const opacityInputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 1),
          ];

          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });

          const opacity = scrollY.interpolate({
            inputRange: opacityInputRange,
            outputRange: [1, 1, 1, 0],
          });

          return (
            <Animated.View
              style={{
                flexDirection: 'row',
                padding: SPACING,
                marginBottom: SPACING,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderRadius: 12,
                shadowOffset: {width: 0, height: 10},
                shadowColor: 'black',
                shadowOpacity: 0.3,
                elevation: 3,
                // background color must be set
                // backgroundColor : "rgba(255, 255, 255, 0.8)", // invisible color
                shadowRadius: 20,

                opacity,

                transform: [{scale}],
              }}>
              <Image
                source={{uri: item.image}}
                style={{
                  width: AVATAR_SIZE,
                  height: AVATAR_SIZE,
                  borderRadius: AVATAR_SIZE,
                  marginRight: SPACING / 2,
                }}
              />

              <View>
                <Text style={{fontSize: 22, fontWeight: '700'}}>
                  {item.name}
                </Text>
                <Text style={{fontSize: 13, opacity: 0.7}}>
                  {item.jobTitle}
                </Text>
                <Text style={{fontSize: 14, opacity: 0.8, color: '#0099cc'}}>
                  {item.email}
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    opacity: 0.8,
                    color: '#0e0e0e',
                    fontWeight: 'bold',
                    paddingTop: 3,
                  }}>
                  Developed by Chidiebere Chukwuma
                </Text>
              </View>
            </Animated.View>
          );
        }}
      />
    </View>
  );
};
