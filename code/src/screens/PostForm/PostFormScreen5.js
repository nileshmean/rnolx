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
      PosterFN:'',
      PosterLN:'',
      PosterEmail:'',
      PosterPhone:'',
      PosterPassword:'',

      errMsgPosterFN:'',
      errMsgPosterLN:'',
      errMsgPosterEmail:'',
      errMsgPosterPhone:'',
      errMsgPosterPassword:'',

   
      AdCatId:'',
      AdSubCatId:'',
      ShowPhoneState:false,
      ShowEmailState:false,

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


    if(this.state.PosterFN || this.state.PosterLN != " "|| this.state.PosterEmail != " "|| this.state.PosterPhone != " "|| this.state.PosterPassword != " "){
     if(this.state.PosterFN){

      if(this.state.PosterLN){

        if(this.state.PosterEmail){

          if(this.state.PosterPhone){

            if(this.state.PosterPassword){
          
              this.registerCall();
           }else{
          this.setState({
            errMsgPosterPassword: true,
          });
         }
          
         }else{
        this.setState({
          errMsgPosterPhone: true,
        });
       }
          
       }else{
      this.setState({
        errMsgPosterEmail: true,
      });
     }
       }else{
      this.setState({
        errMsgPosterLN: true,
      });
     }
     }else{
      
      this.setState({

        errMsgPosterFN: true,
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

togglePhoneSwitch = (value) => {
  this.setState({ShowPhoneState: value})

}

toggleEmailSwitch = (value) => {
  this.setState({ShowEmailState: value})

}

  render() {
    return (
<SafeAreaView style={{flex: 1}}>
      <View style={styles.mainContaitner}>
      <ScrollView>

       <View style={styles.formContaitnerScroll}>
       <View style={styles.fieldContaitner}>

        <Text style={styles.fieldText}>First Name *</Text>
              <Input
          placeholder='First Name'
          onChangeText={(PosterFN) => this.setState({PosterFN})}
          errorStyle={{ color: 'red' }}
          errorMessage={this.state.errMsgPosterFN ? 'Please enter First Name': null}
        />
        
        </View> 
        
        <View style={styles.fieldContaitner}>

              <Text style={styles.fieldText}>Last Name *</Text>
              <Input
              placeholder='Last Name'
              onChangeText={(PosterLN) => this.setState({PosterLN})}
              errorStyle={{ color: 'red' }}
              errorMessage={this.state.errMsgPosterLN ? 'Please enter Last Name': null}
              />

        </View> 

        <View style={styles.fieldContaitner}>

              <Text style={styles.fieldText}>Email Address *</Text>
              <Input
              placeholder='Email Address'
              onChangeText={(PosterEmail) => this.setState({PosterEmail})}
              errorStyle={{ color: 'red' }}
              errorMessage={this.state.errMsgPosterEmail ? 'Please enter Email Address': null}
              />

      </View>        

                  <View style={styles.fieldContaitner}>

            <Text style={styles.fieldText}>Phone Number *</Text>
            <Input
            placeholder='Phone Number'
            onChangeText={(PosterPhone) => this.setState({PosterPhone})}
            errorStyle={{ color: 'red' }}
            errorMessage={this.state.errMsgPosterPhone ? 'Please enter Phone Number': null}
            />


            </View> 

            <View style={styles.fieldContaitner}>

<Text style={styles.fieldText}>Password *</Text>
<Input
placeholder='Password'
onChangeText={(PosterPassword) => this.setState({PosterPassword})}
errorStyle={{ color: 'red' }}
errorMessage={this.state.errMsgPosterPassword ? 'Please enter Password': null}
/>


</View> 



    <View style={styles.fieldContaitnerSwitch}>

                <Text style={styles.SwitchText}>Show my phone number on my ads *</Text>
                <Switch style={styles.SwitchButton}   onValueChange = {this.togglePhoneSwitch}  value = {this.state.ShowPhoneState}/>

    </View>      

 

      <View style={styles.fieldContaitnerSwitch}>

                <Text style={styles.SwitchText}>Show my email address on my ads *</Text>


                <Switch  style={styles.SwitchButton}   onValueChange = {this.toggleEmailSwitch}  value = {this.state.ShowEmailState}/>

      </View>     
        

</View>

</ScrollView>

      </View>
      <TouchableOpacity style={styles.footer} onPress={() => this.onClickListener('sign_up')}>
     <Text style={styles.buttonNextText}>Next</Text>
 
   </TouchableOpacity>
      </SafeAreaView>
      

    );
  }
}
