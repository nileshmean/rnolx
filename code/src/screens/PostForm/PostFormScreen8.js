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
  Switch,


} from 'react-native';
import styles from './styles';
import { recipes } from '../../data/dataArrays';
import MenuImage from '../../components/MenuImage/MenuImage';
import constant from '../../data/constant';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

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

const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};
 
export default class PostFormScreen8 extends React.Component {

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



    };
    this.offset = 1;
    this.page = 1;
  }

  componentDidMount()
  {
    SplashScreen.hide();


   }



  static navigationOptions = ({ navigation }) => ({
    title: 'Location',
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


      this.registerCall();

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
     <Text>Your add is posted</Text>


      </View>
      <TouchableOpacity style={styles.footer} onPress={() => this.onClickListener('sign_up')}>
     <Text style={styles.buttonNextText}>Next</Text>
 
   </TouchableOpacity>
      </SafeAreaView>
      

    );
  }
}
