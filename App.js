import React, {Component} from 'react';

import {FlatList, Image, Dimensions,View,Modal,Text, TouchableOpacity,StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';

import {Header} from "react-native-elements";
var users = require('./userList.json');
var {width: screenWidth} = Dimensions.get('window');

class AnimatedImages extends Component {
  render() {
    return (
      <Animatable.View
        style={{flex: 1, alignItems: 'center'}}
        animation="zoomIn"
        delay={this.props.imageIndex * 100}
        useNativeDriver={true}>
        {this.props.children}
      </Animatable.View>
    );
  }
}
export default class App extends Component {
constructor(){
  super();
  this.state={
    modalVisible:false,
    modalImage:null
  }
}

setModalVisible(visible,image){
this.setState({modalVisible:visible,modalImage:image})
}
  renderImages =(item)=> {
console.log(item);
    return (
      <AnimatedImages imageIndex={item.index}>
        <TouchableOpacity key={item.index}onPress={()=>{this.setModalVisible(true,item.item.image)}}>
        <Image
          source={{uri: item.item.image}}
          style={{
            height: screenWidth / 4,
            width: screenWidth / 4,
          }}
        />
        </TouchableOpacity>
      </AnimatedImages>
    );
  };
  render() {
    
    return (
 <View style={{flex:1}}>
   <Header centerComponent={{text:"Photo Gallery",style:{fontSize:40,fontWeight:"bold",fontStyle:"italic",color:"blue"}}} backgroundColor="#eb3453"/>
          <FlatList
            horizontal={false}
            numColumns={4}
            data={users}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderImages}
          />

          <Modal style={styles.modal} animationType={"fade"}transparent={true}visible={this.state.modalVisible}>
           <View style={styles.modal}>
            <Text style={styles.text} onPress={()=>{this.setModalVisible(false)}}>close</Text>
            <View >
<Image source={{uri: this.state.modalImage}}
          style={{
            height: screenWidth ,
            width: screenWidth ,
          }}
        />
</View>
            </View>
          </Modal>
          </View>
     
    );
  }
}
const styles=StyleSheet.create({
  modal:{
    flex:1,
    padding:40,
    paddingLeft:0,
    backgroundColor:'rgba(0,0,0,0.9)'
  },
  text:{
    color:"#ffff",
    marginTop:200
    
  }
})