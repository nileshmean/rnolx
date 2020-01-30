import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import HomeScreen from '../screens/Home/HomeScreen';
import DetailScreen from '../screens/Detail/DetailScreen';
import RecipeScreen from '../screens/Recipe/RecipeScreen';
import SearchScreen from '../screens/Search/SearchScreen';


// import HomeScreen from '../screens/Home/HomeScreen';
 import PostFormScreen from '../screens/PostForm/PostFormScreen';
 import PostFormScreen2 from '../screens/PostForm/PostFormScreen2';
 import PostFormScreen3 from '../screens/PostForm/PostFormScreen3';
 import PostFormScreen4 from '../screens/PostForm/PostFormScreen4';
 import PostFormScreen5 from '../screens/PostForm/PostFormScreen5';
 import PostFormScreen6 from '../screens/PostForm/PostFormScreen6';
 import PostFormScreen7 from '../screens/PostForm/PostFormScreen7';
 import PostFormScreen8 from '../screens/PostForm/PostFormScreen8';
// import RecipeScreen from '../screens/Recipe/RecipeScreen';
// import RecipesListScreen from '../screens/RecipesList/RecipesListScreen';
 import DrawerContainer from '../screens/DrawerContainer/DrawerContainer';
// import IngredientScreen from '../screens/Ingredient/IngredientScreen';
// import SearchScreen from '../screens/Search/SearchScreen';
// import IngredientsDetailsScreen from '../screens/IngredientsDetails/IngredientsDetailsScreen';

const MainNavigator = createStackNavigator(
  {
    Home: HomeScreen,
   // Home: PostFormScreen4,

    Detail: DetailScreen,
    Recipe: RecipeScreen,
    Search:SearchScreen,
    Post: PostFormScreen,
    // PostFormScreen2:PostFormScreen2,
    // PostFormScreen3:PostFormScreen3,
    // PostFormScreen4:PostFormScreen4,
    // Recipe: RecipeScreen,
    // RecipesList: RecipesListScreen,
    // Ingredient: IngredientScreen,
    // Search: SearchScreen,
    // IngredientsDetails: IngredientsDetailsScreen
  },
  // {
  //   initialRouteName: 'Home',
  //   // headerMode: 'float',
  //   defaulfNavigationOptions: ({ navigation }) => ({
  //     headerTitleStyle: {
  //       fontWeight: 'bold',
  //       textAlign: 'center',
  //       alignSelf: 'center',
  //       flex: 1,
  //       fontFamily: 'FallingSkyCond'
  //     }
  //   })
  // }
);

const PostNavigator = createStackNavigator(
  {
    Post: PostFormScreen,
    PostFormScreen2:PostFormScreen2,
    PostFormScreen3:PostFormScreen3,
    PostFormScreen4:PostFormScreen4,
    Search:SearchScreen,
    PostFormScreen5:PostFormScreen5,
    PostFormScreen6:PostFormScreen6,
    PostFormScreen7:PostFormScreen7,
    PostFormScreen8:PostFormScreen8,
  },

);


const TabNavigator = createBottomTabNavigator({
  Home: PostFormScreen8,
  Post: PostFormScreen4,
  Post: PostNavigator,
  //Recipe: RecipeScreen


});

MainNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

PostNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const DrawerStack = createDrawerNavigator(
  {
    Main: MainNavigator,
    Post: PostFormScreen,

  },
  {
    drawerPosition: 'left',
    initialRouteName: 'Main',
   drawerWidth: 250,
   contentComponent: DrawerContainer
  },
  

);
 
export default AppContainer = createAppContainer(TabNavigator);

console.disableYellowBox = true;