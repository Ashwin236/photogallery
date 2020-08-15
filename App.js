import React, {Component} from 'react';

import {FlatList, Image, Dimensions,View} from 'react-native';
import * as Animatable from 'react-native-animatable';

import {Header} from "react-native-elements";
let users = require('./userList.json');
let {width: screenWidth} = Dimensions.get('window');

class AnimatedImages extends Component {
  render() {
    return (
      <Animatable.View
        style={{flex: 1, alignItems: 'center'}}
        animation="fadeInUpBig"
        delay={this.props.imageIndex * 100}
        useNativeDriver={true}>
        {this.props.children}
      </Animatable.View>
    );
  }
}
export default class App extends Component {
  renderImages = item => {
    return (
      <AnimatedImages imageIndex={item.index}>
        <Image
          source={{uri: item.item.image}}
          style={{
            height: screenWidth / 4,
            width: screenWidth / 4,
          }}
        />
      </AnimatedImages>
    );
  };
  render() {
    return (
 <View style={{flex:1}}>
   <Header centerComponent={{text:"Header"}}/>
          <FlatList
            horizontal={false}
            numColumns={4}
            data={users}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderImages}
          />
          </View>
     
    );
  }
}