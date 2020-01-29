import React from 'react';
import { FlatList, ScrollView, Text, View, TouchableHighlight, Image, 
  ActivityIndicator, 
  SafeAreaView,
  Animated,
  AsyncStorage
} from 'react-native';
import styles from './styles';
import { recipes } from '../../data/dataArrays';
import MenuImage from '../../components/MenuImage/MenuImage';
import DrawerActions from 'react-navigation';
import { getCategoryName } from '../../data/MockDataAPI';
import SplashScreen from 'react-native-splash-screen';
import { Button, Avatar,Card } from 'react-native-elements'; 
import Icon from 'react-native-vector-icons/FontAwesome';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ceil } from 'react-native-reanimated';

export default class PostFormScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      search: '',
      loading: false,
      isListEnd: false,
      showImageloading: true,
      serverData: [],
      dataSource:[],
      fetching_from_server: false,
      isHidden: true,
      animation: new Animated.Value(0),
      id:''


    };
    this.offset = 1;
    this.page = 1;
  }

  componentDidMount()
  {
    SplashScreen.hide();
    this.loadMoreData();
  }

  updateSearch = search => {
    this.setState({ search });
  }

  imageLoadEnd=()=> {
    console.log('..imageLoad finish..')
    this.setState({showImageloading:false})
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

  static navigationOptions = ({ navigation }) => ({
    title: 'Post',
    // headerLeft: (
    //   <MenuImage
    //   onPress={() => onPressSearch()}
    //   />
    // ),
    headerRight: () => (
      <Icon  style={styles.iconHeaderSearch} raised name='search' type='font-awesome' onPress={() => navigation.navigate('Search')} /> 

      ),
  }
  );

  onPressRecipe (id){

    let lsAd_object = {
      lsAdCatId:id,
    };
     AsyncStorage.setItem('ADid1', JSON.stringify(lsAd_object), () => {
    });
    this.props.navigation.navigate('PostFormScreen2');

  };


  

  renderItems = ({ item }) => (

    // <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => this.onPressRecipe(item.id)}>
    //   <View style={styles.container}>
    //   <Image
    //     source={{ uri: item.thumbnailUrl }} 
    //     style={styles.photo}
    //     PlaceholderContent={<ActivityIndicator />}
    //  />
    //     {/* <Image style={styles.photo} source={{ uri: item.photo_url }} /> */}
    //     <Text style={styles.title}>{item.title}</Text>
    //     {/* <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text> */}
    //   </View>
    // </TouchableHighlight>

        <TouchableHighlight  onPress={() => this.onPressRecipe(item.id)}>
        <View style={styles.container2}>

          <Text style={styles.titlePost2}>{item.title}</Text>
        </View>
        </TouchableHighlight>

  );



  render() {
    return (
<SafeAreaView style={{flex: 1}}>

      <View style={styles.mainContaitner}>


         {/* List Post*/}

        <FlatList
        
          vertical
          showsVerticalScrollIndicator={false} 
          numColumns={1}
          data={this.state.serverData}
          renderItem={this.renderItems}
          keyExtractor={item => `${item.id}`}
          onEndReached={() => this.loadMoreData()}
          onEndReachedThreshold={5}
          ListFooterComponent={this.renderFooter.bind(this)}
        />
      </View>
      </SafeAreaView>
      

    );
  }
}
