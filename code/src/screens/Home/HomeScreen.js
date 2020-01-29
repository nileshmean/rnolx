import React from 'react';
import { FlatList, ScrollView, Text, View, TouchableHighlight, Image, 
  ActivityIndicator, 
  SafeAreaView,
  Animated,
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

export default class HomeScreen extends React.Component {

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
      animation: new Animated.Value(0)


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
    title: 'Home',
    // headerLeft: (
    //   <MenuImage
    //     onPress={() => {
    //       navigation.openDrawer();
    //     }}
    //   />
    // ),
    headerRight: () => (
      <Icon  style={styles.iconHeaderSearch} raised name='search' type='font-awesome' onPress={() => navigation.navigate('Search')} /> 

    ),
  }
  
  );

  onPressRecipe (){
    this.props.navigation.navigate('Recipe');
    //this.props.navigation.navigate('PostFormScreen3');
    
  };

  onScolllist(e){
    if(e<10){
      this.setState({
      isHidden: true
      })

    }else{
      this.setState({
        isHidden: false
        })

    }
  }

  

  renderItems = ({ item }) => (

    <TouchableHighlight  onPress={() => this.onPressRecipe(item)}>
      <View style={styles.container}>
      <Image
        source={{ uri: item.thumbnailUrl }} 
        style={styles.photo}
        PlaceholderContent={<ActivityIndicator />}
     />
        {/* <Image style={styles.photo} source={{ uri: item.photo_url }} /> */}
        <Text style={styles.title}>{item.title}</Text>
        {/* <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text> */}
      </View>
    </TouchableHighlight>
  );

  renderCategory = ({ item }) => (

   // if(this.state.showTheThing)

 //this.state.isHidden ?


    <View  style = {styles.categoryMainContainer} onPress={() => this.onPressRecipe(item)}>
    <TouchableHighlight  onPress={() => this.onPressRecipe(item)}>
    <View style = {styles.categoryContainer}>

     <View>
      <Image style={styles.photoCategory} source = {{ uri: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg" }} />  
     </View>
     <View>
      <Text style={styles.TextCategory}>Category 10</Text>
     </View>
     </View>
     </TouchableHighlight>

   </View>
//: null
  );



  render() {
    return (
<SafeAreaView style={{flex: 1}}>

      <View style={{marginBottom:120}}>

      <FlatList      
          horizontal
          showsHorizontalScrollIndicator={false}
          data={this.state.serverData}
          renderItem={this.renderCategory}
          keyExtractor={item => `${item.id}`}
          //numColumns={4}

        />


         {/* List Post*/}

        <FlatList
         //onScrollEndDrag={() => console.log("end")}
       //  onScrollBeginDrag={() => console.log("start")}
         onScroll={(e) =>this.onScolllist(e.nativeEvent.contentOffset.y)}
          vertical
          showsVerticalScrollIndicator={false} 
          numColumns={2}
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
