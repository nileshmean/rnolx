import React from 'react';
import { FlatList, ScrollView, Text, View, TouchableHighlight, Image } from 'react-native';
import styles2 from './styles';
import { recipes } from '../../data/dataArrays';
import MenuImage from '../../components/MenuImage/MenuImage';
import DrawerActions from 'react-navigation';
import { getCategoryName } from '../../data/MockDataAPI';
import SplashScreen from 'react-native-splash-screen';
import styles, { colors } from './index.style';

//

import Carousel, { Pagination } from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from './SliderEntry.style';
import SliderEntry from './SliderEntry';
import { ENTRIES1, ENTRIES2 } from './static/entries';
const SLIDER_1_FIRST_ITEM = 1;
//

export default class DetailScreen extends React.Component {

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
    headermode: false,
    // headerLeft: (
    //   <MenuImage
    //     onPress={() => {
    //       navigation.openDrawer();
    //     }}
    //   />
    // )
  });


  // onPressRecipe = item => {
  //   this.props.navigation.navigate('Recipe', { item });
  // };

  renderRecipes = ({ item }) => (
    <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => this.onPressRecipe(item)}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.photo_url }} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>
      </View>
    </TouchableHighlight>
  );


  _renderItem ({item, index}) {
    return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
}
  
_renderItemWithParallax ({item, index}, parallaxProps) {
return (
    <SliderEntry
      data={item}
      even={(index + 1) % 2 === 0}
      parallax={true}
      parallaxProps={parallaxProps}
    />
);
}

renderImage = ({ item }) => (
  <TouchableHighlight>
    <View style={styles.imageContainer}>
      <Image style={styles.image} source={{ uri: item.thumbnailUrl }}
 />
    </View>
  </TouchableHighlight>
);
  mainExample (number, title) {
    const { slider1ActiveSlide ,serverData } = this.state;
    return (

        <View style={styles.exampleContainer}>
            <Carousel
              ref={c => this._slider1Ref = c}
              data={serverData}
              renderItem={this._renderItemWithParallax}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth} 
              hasParallaxImages={true}
              firstItem={SLIDER_1_FIRST_ITEM}
              inactiveSlideScale={0.94}
              inactiveSlideOpacity={0.7}
              // inactiveSlideShift={20}
              containerCustomStyle={styles.slider}
              contentContainerCustomStyle={styles.sliderContentContainer}
              loop={true}
              loopClonesPerSide={2}
              autoplay={false}
              autoplayDelay={500}
              autoplayInterval={3000}
              onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
            />
            <Pagination
              dotsLength={ENTRIES1.length}
              activeDotIndex={slider1ActiveSlide}
              containerStyle={styles.paginationContainer}
              dotColor={'rgba(255, 255, 255, 0.92)'}
              dotStyle={styles.paginationDot}
              inactiveDotColor={colors.black}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
              carouselRef={this._slider1Ref}
              tappableDots={!!this._slider1Ref}
            />
        </View>
       
    );
}


  render() {
    const example1 = this.mainExample(1, 'Default layout | Loop | Autoplay | Parallax | Scale | Opacity | Pagination with tappable dots');
    const { serverData1 } = this.state;

    return (
      <View style={styles.container}>
      <ScrollView>
      <View style={styles2.carouselContainer}>
        <View style={styles2.carousel}>
        { example1 }
        {/* <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={recipes}
          renderItem={this.renderRecipes}
          keyExtractor={item => `${item.recipeId}`}
        /> */}
        
                <Text>test detail</Text>

                </View></View></ScrollView>
                </View>
    );
  }
}
