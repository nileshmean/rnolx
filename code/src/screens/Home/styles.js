import { StyleSheet } from 'react-native';
import { RecipeCard } from '../../AppStyles';

const styles = StyleSheet.create({
  container: RecipeCard.container,
  photo: RecipeCard.photo,
  photoCategory: RecipeCard.photoCategory,
  title: RecipeCard.title,
  category: RecipeCard.category,

  TextCategory:{
    alignItems:"center",
    justifyContent:"center",
  },

  categoryContainer:{
    alignItems:"center",
    justifyContent:"center",
  },

  iconHeaderSearch:{
    marginRight:10,
    fontSize:22,
    color:"#9b9b9b",
  },
  categoryMainContainer:{
    flex:1, 
    flexDirection:"column", 
    height:130, 
    padding:5,
    alignItems:"center"

  }
});

export default styles;
