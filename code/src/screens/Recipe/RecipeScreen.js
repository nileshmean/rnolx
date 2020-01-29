import React from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  TouchableHighlight,
  StyleSheet,
  
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { getIngredientName, getCategoryName, getCategoryById } from '../../data/MockDataAPI';
import BackButton from '../../components/BackButton/BackButton';
import ViewIngredientsButton from '../../components/ViewIngredientsButton/ViewIngredientsButton';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Button, Avatar } from 'react-native-elements';

const { width: viewportWidth } = Dimensions.get('window');
var {width, height} = Dimensions.get('window');

const photosArray= [
  'https://www.texanerin.com/content/uploads/2019/06/nobake-chocolate-cookies-1-650x975.jpg',
  "https://namelymarly.com/wp-content/uploads/2018/04/20180415_Beet_Lasagna_10.jpg",
  'https://advancelocal-adapter-image-uploads.s3.amazonaws.com/image.al.com/home/bama-media/width600/img/news_impact/photo/burger-fijpg-57e7e5907630c2ad.jpg',
  'https://img.thedailybeast.com/image/upload/c_crop,d_placeholder_euli9k,h_1439,w_2560,x_0,y_0/dpr_1.5/c_limit,w_1044/fl_lossy,q_auto/v1492718105/articles/2013/09/24/burger-king-s-new-french-fries-took-ten-years-to-develop/130923-gross-burger-tease_izz59e',
  'https://aht.seriouseats.com/images/2012/02/20120221-193971-fast-food-fries-Burger-King-fries-2.jpg'
];

export default class RecipeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTransparent: 'true',
      headerLeft: (
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
      serverData: [],

    };
  }

  componentDidMount(){

    this.loadMoreData();
  }
  renderImage = ({ item }) => (
    <TouchableHighlight>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item }} />
      </View>
    </TouchableHighlight>
  );

  onPressIngredient = item => {
    var name = getIngredientName(item);
    let ingredient = item;
    this.props.navigation.navigate('Ingredient', { ingredient, name });
  };

  loadMoreData = () => {
    if (!this.state.fetching_from_server && !this.state.isListEnd) {
      //On click of Load More button We will call the web API again
      this.setState({ fetching_from_server: true }, () => {
        fetch('https://jsonplaceholder.typicode.com/posts/1')
          //Sending the currect offset with get request
          .then(response => response.json())
          .then(responseJson => {
            if (responseJson !='') {

              //Successful response from the API Call
              this.offset = this.offset + 1;
              //After the response increasing the offset for the next API call.
              this.setState({
                serverData: {...this.state.serverData, ...responseJson},
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
  render() {
    const { activeSlide,serverData } = this.state;
    const { navigation } = this.props;
    const item = navigation.getParam('item');
    // const category = getCategoryById(item.categoryId);
    // const title = getCategoryName(category.id);
     //const title = getCategoryName(category.id);

    return (

      <View style={styles.container}>

      <ScrollView style={styles.container}>
        <View style={styles.carouselContainer}>
          <View style={styles.carousel}>
            <Carousel
              ref={c => {
                this.slider1Ref = c;
              }}
              data={photosArray}
              renderItem={this.renderImage}
              sliderWidth={viewportWidth}
              itemWidth={viewportWidth}
              inactiveSlideScale={1}
              inactiveSlideOpacity={1}
              firstItem={0}
              loop={false}
              autoplay={false}
              autoplayDelay={500}
              autoplayInterval={3000}
              onSnapToItem={index => this.setState({ activeSlide: index })}
            />
            <Pagination
              dotsLength={photosArray.length}
              activeDotIndex={activeSlide}
              containerStyle={styles.paginationContainer}
              dotColor="rgba(255, 255, 255, 0.92)"
              dotStyle={styles.paginationDot}
              inactiveDotColor="white"
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
              carouselRef={this.slider1Ref}
              tappableDots={!!this.slider1Ref}
            />
          </View>
        </View>
        <View style={styles.infoRecipeContainer}>
              <View style={styles.flexsrowPrice}>

                  <View style={styles.flexsRight}>
                        <Text style={styles.infoRecipePrice }>14000</Text>
                  </View>

                      <View style={styles.flexsLeft}>
                            <Icon  style={styles.iconFavorite} raised name='gratipay' type='font-awesome' /> 
                      </View>


                 </View>
          
      
              <View style={styles.flexsrowTitle}>

                  <View style={styles.flexsRight}>
                        <Text style={styles.infoRecipePrice }>{serverData.title}</Text>
                  </View>

                 </View>
          
       



                 <View style={styles.flexsrowAddress}>

                  <View style={styles.flexsRight}>
                  <Text style={styles.address }>
                  <Icon  style={styles.iconMap} raised name='map-marker' type='font-awesome' /> 
                  <Text>{"  "}</Text>
                  address</Text>
                  </View>

                


                  </View>

                  <View style={styles.flexsrowCategory}>

                      <View style={styles.flexsRight}>
                      <Text style={styles.category }>CATEGORY</Text>
                      </View>

                          <View style={styles.flexsLeft}>
                          <Text style={styles.category }>20 Jan,20</Text>
                          </View>


                  </View>
          
       </View>



          <View style={styles.ContainterSeprator}/>


          {/* Description*/}
          <View style={styles.infoRecipeContainer3}>
          <Text style={styles.infoHeading}>Description</Text>
          <Text style={styles.infoDescriptionRecipe}>{serverData.title}</Text>

          <View style={styles.infoContainer}>
          <View style={styles.flexsRight}>
              </View>
          </View>

          <View style={styles.infoContainer}>
          </View>
         
          </View>

          <View style={styles.ContainterSeprator}/>

          {/* Detail*/}
          <View style={styles.infoRecipeContainer3}>
          <Text style={styles.infoHeading}>Detail</Text>


              <View style={styles.flexsrowCategory}>

              <View style={styles.flexsRight}>
              <Text style={styles.DetailListHeading }>BRAND</Text>
              </View>

              <View style={styles.flexsLeft}>
              <Text style={styles.DetailListText }>20 Jan,20</Text>
              </View>

              </View>

              <View style={styles.flexsrowCategory}>

              <View style={styles.flexsRight}>
              <Text style={styles.DetailListHeading }>MODEL</Text>
              </View>

              <View style={styles.flexsLeft}>
              <Text style={styles.DetailListText }>20 Jan,20</Text>
              </View>

              </View>
         
          </View>

          <View style={styles.ContainterSeprator}/>

          {/* */}

          {/* services*/}
          <View style={styles.infoRecipeContainer3}>
          <Text style={styles.infoHeading}>Services</Text>



              <Text style={styles.DetailServiceLabel }>
                <Icon  style={styles.iconCheck} raised name='check-square' type='font-awesome' /> {" "}
                  BRAND</Text>
                  <Text style={styles.DetailServiceLabel }>
                <Icon  style={styles.iconCheck} raised name='check-square' type='font-awesome' /> {" "}
                  BRAND</Text>
                  <Text style={styles.DetailServiceLabel }>
                <Icon  style={styles.iconCheck} raised name='check-square' type='font-awesome' /> {" "}
                  BRAND</Text>
                  <Text style={styles.DetailServiceLabel }>
                <Icon  style={styles.iconCheck} raised name='check-square' type='font-awesome' /> {" "}
                  BRAND</Text>
                  <Text style={styles.DetailServiceLabel }>
                <Icon  style={styles.iconCheck} raised name='check-square' type='font-awesome' /> {" "}
                  BRAND</Text>
                  <Text style={styles.DetailServiceLabel }>
                <Icon  style={styles.iconCheck} raised name='check-square' type='font-awesome' /> {" "}
                  BRAND</Text>
            
         
          </View>

          <View style={styles.ContainterSeprator}/>

          {/* */}

          <View style={stylesss.container} pointerEvents="none">

     <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps

      style={stylesss.map}
       initialRegion={{
        latitude: -29.1482491,
        longitude: -51.1559028,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
       minZoomLevel={13}
       zoomEnabled ={false}
       maxZoomLevel={13}   
   >
      <MapView.Circle
        center={{
          latitude: -29.1471337,
          longitude: -51.148951,
        }}
        radius={20}
        strokeWidth={20}
        strokeColor="green"
        fillColor="red"
      />
  </MapView>


     </View>

               {/* Detail*/}
               <View style={styles.ContainterSeprator}/>

               <View style={styles.infoRecipeContainer3}>
                  <Text style={styles.infoHeading}>AD ID</Text>


              <View style={styles.flexsrowCategory}>

              <View style={styles.flexsRight}>
              <Text style={styles.DetailListHeading}>4546456AWS</Text>
              </View>

              <View style={styles.flexsLeft}>
              <Text style={styles.DetailListTextReport }>REPORT AD</Text>
              </View>

              </View>
         
          </View>

          <View style={styles.ContainterSeprator}/>

          {/* */}
                   {/* USer Detail*/}
                   <View style={styles.infoRecipeContainer3}>
          <Text style={styles.infoHeading}>Posted By</Text>

          <View style={styles.flexContainerPostBy}>
         <View style={styles.PostByAvatar}>
           
         <Avatar size="medium" rounded source={{
            uri:
              'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
          }}/>
           {/* <Avatar size="medium" rounded title="MD" /> */}
           </View>  
         <View style={styles.PostByText}>
           <Text style={styles.PostByTextName}>Nilesh Badgi</Text>
           <Text style={styles.PostByTextMemeber}>Member Since: Jan 2014</Text>
           </View>
           <View style={styles.PostByButton}>
           <FontAwesome5 style={styles.PostByAngle} name={'angle-right'} light />

           </View>
       </View>
         
          </View>

          <View style={styles.ContainterSeprator}/>

          {/* */}
          { /* */}

          <View style={styles.ContainterSepratorLast}/>
          { /* */}

          { /* */}

      </ScrollView> 

    <View style={styles.footer}>
          <View style={styles.button1}>
          <Text style={styles.button1Text}>
          <Icon  style={styles.button1Icon} raised name='comment' type='font-awesome' />   CHAT </Text>
    </View>
        <View style={styles.button2}>
            <Text style={styles.button1Text}> 
            <Icon  style={styles.button1Icon} raised name='phone' type='font-awesome' color='#f50'/>   CALL </Text>
        </View>
    </View>
    </View>
    );
  }
}

/*cooking steps
<View style={styles.infoContainer}>
  <Image style={styles.infoPhoto} source={require('../../../assets/icons/info.png')} />
  <Text style={styles.infoRecipe}>Cooking Steps</Text>
</View>
<Text style={styles.infoDescriptionRecipe}>{item.description}</Text>
*/


const stylesss = StyleSheet.create({
  container: {
   // ...StyleSheet.absoluteFillObject,
    height: 200,
   // width: 400,
    margin:10,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
 });
 