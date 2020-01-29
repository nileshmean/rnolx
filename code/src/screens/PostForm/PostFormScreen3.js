// Form Ads
import React from 'react';
import { FlatList, ScrollView, Text, View, TouchableHighlight, Image, 
  ActivityIndicator, 
  SafeAreaView,
  Animated,
  ListView,
  TextInput,
  Picker,
  TouchableOpacity,
  Alert,
  AsyncStorage,

} from 'react-native';
import styles from './styles';
import { recipes } from '../../data/dataArrays';
import MenuImage from '../../components/MenuImage/MenuImage';
import constant from '../../data/constant';

import DrawerActions from 'react-navigation';
import { getCategoryName } from '../../data/MockDataAPI';
import SplashScreen from 'react-native-splash-screen';
import { Button, Avatar,Card, FormLabel,Input, FormInput, FormValidationMessage } from 'react-native-elements'; 
import Icon from 'react-native-vector-icons/FontAwesome';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ceil } from 'react-native-reanimated';
import BackButton from '../../components/BackButton/BackButton';
import { Directions } from 'react-native-gesture-handler';
import { Header } from 'react-native/Libraries/NewAppScreen';
//const [currency, setCurrency] = useState('US Dollar');


export default class PostFormScreen3 extends React.Component {

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
      AdTitle:'',
      AdDescription:'',
      errMsgAdTitle:false,
      errMsgAdDescription:false,
      AdCatId:'',
      AdSubCatId:''

    };
    this.offset = 1;
    this.page = 1;
  }

  componentDidMount()
  {
    SplashScreen.hide();
    this.loadMoreData();

    // get category from last
    AsyncStorage.getItem('ADid1', (err, result) => {
          var lsData = JSON.parse(result);
          this.setState({
          AdCatId:lsData.lsAdCatId,
          AdSubCatId:lsData.lsAdSubCatId
          })
      });

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



  static navigationOptions = ({ navigation }) => ({
    title: 'Post',
    headerLeft: (
      <BackButton
        onPress={() => {
          navigation.goBack();
        }}
      />
   
    ),
   
  }
  
  );


  onClickListener = (viewId) => {
    // Alert.alert(this.state.Usrname+" "+this.state.email+" "+this.state.password , "View_id "+viewId);

    let lsAd_object = {
      lsAdTitle:this.state.AdTitle,
      lsAdDescription:this.state.AdDescription,
    };

    // You only need to define what will be added or updated
    AsyncStorage.mergeItem('ADid1', JSON.stringify(lsAd_object), () => {
     
      });

    if(this.state.AdTitle || this.state.AdDescription != " "){
     if(this.state.AdTitle){
      if(this.state.AdDescription){
          this.registerCall();
       }else{
      this.setState({
        errMsgAdDescription: true,
      });
     }
     }else{
      
      this.setState({

        errMsgAdTitle: true,
      });

    }
    }else{
  Alert.alert("Please fill all fields");
  }
}


registerCall(){
  
  this.props.navigation.navigate('PostFormScreen4');
  

  
  var that = this;
  var url = constant.APIURL+'add-post';

  // var postData =JSON.stringify({
  //   "title": this.state.AdTitle,
  //   "description": this.state.AdDescription,
  //   "category":this.state.AdCatId,
  //   "subCategory":this.state.AdSubCatId)};

  // console.log("url",postData);


var dataForm = {title:this.state.AdTitle,
                description: this.state.AdDescription,
                category:this.state.AdCatId,
                subCategory:this.state.AdSubCatId
               }


  fetch(url,{

        method: 'POST',
        body: JSON.stringify(dataForm),
        headers: new Headers({
          'Content-Type':'application/json'
        })
        }).then(function (response) {

          return response.json();
        }).then(function (result) { 
           console.log(result);
          if(!result.error){
           that.setState({ status: result.error,
                           wholeResult: result,
                        });
           Alert.alert("User register successfully \n userId: "+that.state.wholeResult);
           console.log(that.state.wholeResult);
       }else{
        Alert.alert(result.error_msg);
        console.log(result);
  }
}).catch(function (error) {
  console.log("-------- error ------- "+error);
  alert("result:"+error)
});
}


  render() {
    return (
<SafeAreaView style={{flex: 1}}>

      <View style={styles.mainContaitner}>
       <View style={styles.formContaitner}>
       <View style={styles.fieldContaitner}>

        <Text style={styles.fieldText}>Ad Title *</Text>
      <Input
  placeholder='Title'
  onChangeText={(AdTitle) => this.setState({AdTitle})}
  errorStyle={{ color: 'red' }}
  errorMessage={this.state.errMsgAdTitle ? 'Please enter AdTitle': null}
/>
<Text style={styles.fieldHintText}>Include the key, name, title of what you selling.</Text>

</View>
<View style={styles.fieldContaitner}>

<Text style={styles.fieldText}>Ad Description * </Text>

<Input
  placeholder='Description'
  onChangeText={(AdDescription) => this.setState({AdDescription})}
  errorStyle={{ color: 'red' }}
  errorMessage={this.state.errMsgAdDescription ? 'Please enter AdDescription': null}
  
/>
<Text style={styles.fieldHintText}>Include condition, features, reason, ad description.</Text>

</View>

</View>
<TouchableOpacity style={styles.footer} onPress={() => this.onClickListener('sign_up')}>
     <Text style={styles.buttonNextText}>Next</Text>
 
   </TouchableOpacity>

      </View>
      </SafeAreaView>
      

    );
  }
}
