// Image Upload
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
  Modal,
  PermissionsAndroid,
  //CameraRoll

} from 'react-native';
import constant from '../../data/constant';
import RNFetchBlob from 'rn-fetch-blob'


import styles from './styles';
import { recipes } from '../../data/dataArrays';
import MenuImage from '../../components/MenuImage/MenuImage';
import DrawerActions from 'react-navigation';
import { getCategoryName } from '../../data/MockDataAPI';
import SplashScreen from 'react-native-splash-screen';
import { Button, Avatar,Card, FormLabel,Input, FormInput, FormValidationMessage } from 'react-native-elements'; 
import Icon from 'react-native-vector-icons/FontAwesome';
//import CameraRollPicker from 'react-native-camera-roll-picker';
//import CameraRoll from 'react-native-cameraroll';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ceil } from 'react-native-reanimated';
import BackButton from '../../components/BackButton/BackButton';
import { Directions } from 'react-native-gesture-handler';
//const [currency, setCurrency] = useState('US Dollar');
import ImagePicker from 'react-native-image-crop-picker';
export default class PostFormScreen4 extends React.Component {

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
      modalVisible: false,
      avatarSource: null,

    };
    this.offset = 1;
    this.page = 1;
    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
  }

  componentDidMount()
  {
    SplashScreen.hide();
    this.loadMoreData();


  }


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


  onClickListener = (viewId) => {
    // Alert.alert(this.state.Usrname+" "+this.state.email+" "+this.state.password , "View_id "+viewId);

    let lsAd_object = {
      lsAdTitle:this.state.AdTitle,
      lsAdDescription:this.state.AdDescription,
    };

    // You only need to define what will be added or updated
    AsyncStorage.setItem('ADid1', JSON.stringify(lsAd_object), () => {
     
      });

      AsyncStorage.getItem('ADid1', (err, result) => {
        console.log(result);
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

setModalVisible(visible) {
  this.setState({modalVisible: visible});
}

selectPhotoTapped() {


  var options = {
    title: 'Select Image',
    storageOptions: {
     skipBackup: true,
     path: 'images'
    }
 };

  ImagePicker.openPicker({
    width: 200,
    height: 200, compressImageMaxHeight: 400,
    compressImageMaxWidth: 400, cropping: true, multiple: true
  })
    .then(response => {
      let tempArray = []
      console.log("responseimage-------" + response)
      this.setState({ ImageSource: response })
      console.log("responseimagearray" + this.state.ImageSource)
      response.forEach((item) => {
        let image = {
          uri: item.path,
          // width: item.width,
          // height: item.height,
        }
        console.log("imagpath==========qqqq" , image.uri)
        this.setState({ imagepath: image.uri })

        image =   { name : 'avatar', filename : 'avatar.png', data: RNFetchBlob.wrap(image.uri)},


        tempArray.push(image)
        this.setState({ ImageSourceviewarray: tempArray })
         console.log('savedimageuri=====',item.path);

        console.log("imagpath==========" , image)

      })
      this.uploadImageToServer();
    }
    
  )};


selectCameraTapped() {


  var options = {
    title: 'Select Image',
    storageOptions: {
     skipBackup: true,
     path: 'images'
    }
 };

  ImagePicker.openCamera({
    width: 200,
    height: 200, compressImageMaxHeight: 400,
    compressImageMaxWidth: 400, cropping: false, multiple: true
  })
    .then(response => {
      let tempArray = []
      console.log("responseimage-------" , response.path)
      this.setState({ ImageSource: response })
      console.log("responseimagearray" + this.state.ImageSource)
      var image =   { name : 'avatar', filename : 'avatar.png', data: RNFetchBlob.wrap(response.path)};
      this.setState({ ImageSource: image })

       tempArray.push(image)
       this.setState({ ImageSourceviewarray: tempArray })


      // response.forEach((item) => {
      //   let image = {
      //     uri: item.path,
      //     // width: item.width,
      //     // height: item.height,
      //   }
      //   console.log("imagpath==========qqqq" , image.uri)
      //   this.setState({ imagepath: image.uri })

      //   image =   { name : 'avatar', filename : 'avatar.png', data: RNFetchBlob.wrap(image.uri)},


      //   tempArray.push(image)
      //   this.setState({ ImageSourceviewarray: tempArray })
      //    console.log('savedimageuri=====',item.path);

      //   console.log("imagpath==========" , image)

      // })
      this.uploadImageToServer();
    }
    
  )};
  uploadImageToServer = () => {
    console.log("responseimagearray ssssssssssssss" , this.state.ImageSource)
    var dataimg = this.state.ImageSource;
    const data = new FormData();

    var url = constant.APIURL+'n-multiple-image';
    console.log(this.state.ImageSourceviewarray);

    RNFetchBlob.fetch('POST', 'http://192.168.1.56:4225/n-multiple-image', {
      Authorization : "Bearer access-token",
      otherHeader : "foo",
      'Content-Type' : 'multipart/form-data',
    }, this.state.ImageSourceviewarray
    // [
    //   // element with property `filename` will be transformed into `file` in form data
    //   //{ name : 'avatar', filename : 'avatar.png', data: RNFetchBlob.wrap(this.state.imagepath)},
    //   // custom content type
    //  // { name : 'avatar-png', filename : 'avatar-png.png', type:'image/png', data: binaryDataInBase64},
    // ]

      ).uploadProgress((written, total) => {
        console.log('uploaded', written / total)
    })
      .then((resp) => {
        console.log("happy");
      // ...
    }).catch((err) => {
      console.log("said");

      // ...
    })
  }

  renderItems = ({ item }) => (

    <TouchableHighlight  onPress={() => this.onPressRecipe(item)}>
      <View style={styles.container}>
      <Image
        source={{ uri: item.thumbnailUrl }} 
        style={styles.photo}
        PlaceholderContent={<ActivityIndicator />}
     />
            <Icon style={styles.iconDelete} raised name='trash' type='font-awesome' /> 
      
      </View>
    </TouchableHighlight>
  );


  onPressRecipe (id){

    let lsAd_object = {
      lsAdCatId:id,
    };
     AsyncStorage.setItem('ADid1', JSON.stringify(lsAd_object), () => {
    });
    this.props.navigation.navigate('PostFormScreen5');

  };



  render() {
    return (
<SafeAreaView style={{flex: 1}}>

      <View style={styles.mainContaitner}>
        <View style={styles.photoContaitner}> 
        <View style={styles.photoContaitnerText}> 
        <Text style={styles.photoText}>Choose to upload photo/images or capture using camera..</Text>
        </View>
       
        <View style={styles.GalleryButtonContainer}> 
        
        <TouchableOpacity style={styles.GalleryPickerLeft} onPress={() => this.selectPhotoTapped()}>
              <Icon  style={styles.iconPhoto} raised name='image' type='font-awesome' /> 
              <Text  style={styles.GalleryButton}>Gallery</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.GalleryPickerRight} onPress={() => this.selectCameraTapped()}>

            <Icon style={styles.iconPhoto} raised name='camera' type='font-awesome' /> 
            <Text>Camera</Text>
       </TouchableOpacity>
       </View>

       <View style={styles.photoContaitnerText2}> 
        <Text style={styles.photoText}>Choose to upload photo/images or capture using camera..</Text>
        
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

        </View>

      <TouchableOpacity style={styles.footer}   onPress={() => this.onPressRecipe()}>
      <Text style={styles.buttonNextText}>Next</Text>
  
    </TouchableOpacity>
 


      </View>
      </SafeAreaView>
      

    );
  }
}
