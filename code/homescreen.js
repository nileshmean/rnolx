import React from 'react';
import { 
  FlatList, 
  ActivityIndicator, 
  Text, 
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Card,
  TextInput,
  SafeAreaView,
  Button,
  TouchableHighlight,
  
  
 } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Image,Badge,Divider,
  Avatar,
  SearchBar } from 'react-native-elements';
  //import Detail from './detailscreen'
   

import Icon from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation';

//import { createAppContainer } from 'react-navigation';

const numColumns = 2; 
const { height, width } = Dimensions.get('window')

export default class Home extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      search: '',

      loading: false,
      isListEnd: false,
      showImageloading: true,
      //Loading state used while loading the data for the first time
      serverData: [],
      dataSource:[],
      //Data Source for the FlatList
      fetching_from_server: false,
      //Loading state used while loading more data
    };
    this.offset = 1;
    this.page =1;

    //Index of the offset to load from web API

  }

  

  componentDidMount(){
    SplashScreen.hide()
    //this.loadata()
    this.loadMoreData();

   
  }
  updateSearch = search => {
    this.setState({ search });
  }

  imageLoadEnd=()=> {
    console.log('..imageLoad finish..')
    this.setState({showImageloading:false})
  }
  press(){
    console.log("ressss")
  }

  loadMoreData = () => {
    if (!this.state.fetching_from_server && !this.state.isListEnd) {
      //On click of Load More button We will call the web API again
      this.setState({ fetching_from_server: true }, () => {
        fetch('https://jsonplaceholder.typicode.com/photos?_limit=10&_page=' + this.offset)
          //Sending the currect offset with get request
          .then(response => response.json())
          .then(responseJson => {
            if (responseJson !='') {
              //Successful response from the API Call
              this.offset = this.offset + 1;
              //After the response increasing the offset for the next API call.
              this.setState({
                serverData: [...this.state.serverData, ...responseJson],
                //adding the new data with old one available
                fetching_from_server: false,
                //updating the loading state to false
              });
            } else {
              this.setState({
                fetching_from_server: false,
                isListEnd: true,
              });
            }
          })
          .catch(error => {
            console.error(error);
          });
      });
    }
  };
  renderFooter() {
    return (
      <View style={styles.footer}>
        {this.state.fetching_from_server ? (
          <ActivityIndicator color="black" style={{ margin: 15 }} />
        ) : null}
      </View>
    );
  }



  render() {
    const { search } = this.state;
    const {navigate} = this.props.navigation;

    return (
      <View>
        <Text>test</Text>
        </View>
      

    );
  }
}
