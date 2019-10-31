import React, { Component } from 'react';
import { View, Text} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';
import IconTwo from 'react-native-vector-icons/Feather';
import * as Progress from 'react-native-progress';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { prog:0.00, defaultIncrement:0.01, incrementBoolian: false }
    this.incrementProgress = this.incrementProgress.bind(this);
    this.incrementStop = this.incrementStop.bind(this);
  }
  incrementProgress = async () => {
    this.setState({ incrementBoolian: true });
    console.log(this.state.incrementBoolian);
    let promise = new Promise((resolve, reject) => {
      while(this.state.incrementBoolian == true)
      {
        setTimeout(
          function() {
            this.setState({prog: this.state.prog + this.state.defaultIncrement})
            resolve("result");
          }
          .bind(this),
          300
        );
      }
    });
    await promise
    .then(
      result => {
        alert("Fulfilled: " + result);
      },
      error => {
        alert("Rejected: " + error);
      }
    );
  }
  incrementStop(){
    this.setState({incrementBoolian: false});
    console.log(this.state.incrementBoolian);
  }
  render() { 
    return ( 
    <View>
      <View>
        <Progress.Bar ref='PrBar' progress={this.state.prog} width={200} style={{marginLeft:'25%', marginTop:'5%'}} height={20} color='grey'/>
      </View>
      <View>
        <Button
          onPress={this.incrementProgress}
          containerStyle={{backgroundColor: 'grey', marginLeft:'40%', marginTop:'5%', width:100}}
          titleStyle={{color:'white'}}
          type="outline"
          icon={<Icon
            name='controller-jump-to-start'
            size={24}
            color='white'
          />}
          title="Start"
        />
        <Button
          onPress={this.incrementStop}
          containerStyle={{backgroundColor: 'grey', marginLeft:'40%', marginTop:'5%', width:100}}
          titleStyle={{color:'white'}}
          type="outline"
          icon={<IconTwo
            name='pause-circle'
            size={24}
            color='white'
          />}
          title=" Stop"
        />
      </View>
    </View> );
  }
}