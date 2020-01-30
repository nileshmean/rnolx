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


onClickLocation(data)
{
  var dataGeo = JSON.stringify(data)
  console.log("dataGeo", dataGeo)
  var dataGeo = JSON.parse(dataGeo)


  console.log("data",dataGeo.secondary_text)
}

  render() {
    return (
<SafeAreaView style={{flex: 1}}>
      <View style={styles.mainContaitner}>
      <GooglePlacesAutocomplete
      placeholder='Search'
      minLength={2} // minimum length of text to search
      autoFocus={false}
      returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
      keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
      listViewDisplayed='auto'    // true/false/undefined
      fetchDetails={true}
      renderDescription={row => row.description} // custom description render
      // onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
      // console.log( data);

      //   console.log( JSON.stringify(data).secondary_text);
      // }}
      onPress={(data, details = null) => this.onClickLocation(data)}

      //      onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
      // console.log( data);

      //   console.log( JSON.stringify(data).secondary_text);
      // }}
 
      getDefaultValue={() => ''}
 
      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: 'AIzaSyDIV3CQGCPSmQrBTS-1jDu1WXs43lyCtM0',
        language: 'en', // language of the results
       // types: '(geocode)' // default: 'geocode'
      }}
 
      styles={{
        textInputContainer: {
          width: '100%'
        },
        description: {
          fontWeight: 'bold'
        },
        predefinedPlacesDescription: {
          color: '#1faadb'
        }
      }}
 
      currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
      currentLocationLabel="Current location"
      nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      GoogleReverseGeocodingQuery={{
        // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
      }}
      GooglePlacesSearchQuery={{
        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
        rankby: 'distance',
        //type: 'cafe'
      }}
      
      GooglePlacesDetailsQuery={{
        // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
        fields: 'address_component,geometry',
       // fields: 'geometry',
        
      }}
 
      filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
      predefinedPlaces={[homePlace, workPlace]}
 
      debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      // renderLeftButton={()  => <Text>Custom text after the input</Text>}
      // renderRightButton={() => <Text>Custom text after the input</Text>}
    />


      </View>
      <TouchableOpacity style={styles.footer} onPress={() => this.onClickListener('sign_up')}>
     <Text style={styles.buttonNextText}>Next</Text>
 
   </TouchableOpacity>
      </SafeAreaView>
      

    );
  }
}
