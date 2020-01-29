import { RecipeCard } from '../../AppStyles';
import { StyleSheet, Dimensions } from 'react-native';

// screen sizing
const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const recipeNumColums = 2;
// item size
const RECIPE_ITEM_HEIGHT = 150;
const RECIPE_ITEM_MARGIN = 8;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    //marginRight:RECIPE_ITEM_MARGIN,
    marginTop:5,
    width: (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) / recipeNumColums,

    height: RECIPE_ITEM_HEIGHT ,
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 3
  },
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

  },
  mainContaitner:{
    backgroundColor:"#FFF",
    flexDirection:"column", 
    flex:1,
  },

  formContaitner:{
    backgroundColor:"#FFF",
    flexDirection:"column", 
    flex:1,
  },

  formContaitnerScroll:{
    backgroundColor:"#FFF",
    flexDirection:"column", 
    flex:1,
    marginBottom:50,
  },


  photo: {
    width: (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) / recipeNumColums,
    height: RECIPE_ITEM_HEIGHT,
    borderRadius: 3,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
    //alignItems: 'center',
    //marginLeft: 15,
    marginTop: 20,
    paddingBottom: 20,
    
    width: "100%" ,
    //height:50,
    borderColor: '#cccccc',
    borderBottomWidth: 0.5,
    borderRadius: 3
  },
  titlePost2:{
    backgroundColor:"#FFF",
    fontSize:20,
    color:"#4f4f4f",
    marginLeft: 15,

  },
  footer:{
    width: '100%',
    height: 50,
    backgroundColor: '#2d5ff3',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
    flex: 1,
    flexDirection: 'row',
  },


  buttonNextText:{
    fontSize:18,
    fontFamily: 'sans-serif-thin',
    color:"#FFFFFF",
    fontWeight:"bold"

  },
fieldContaitner:{
  marginTop:10
},

  fieldText:{
    marginLeft:10,
    fontSize:16
  },
  fieldHintText:{
    marginLeft:10,
    color:"#9b9b9b",
    marginTop:5,
  },

  photoContaitner: {
    flex: 1,
    marginTop: 20,
    paddingBottom: 20,
    margin:5,
    width: "100%" ,

  },

  GalleryPicker:{

    color:"#9b9b9b",
    margin:5,
    backgroundColor:"red"
  },

  GalleryPickerText:{
    fontSize:18,
    fontFamily: 'sans-serif-thin',
    color:"#FFFFFF",
    fontWeight:"bold",
    flexDirection:"row",

    

  },
  iconPhoto:{
    fontSize:18,
    fontFamily: 'sans-serif-thin',
    color:"#000",
    fontWeight:"bold"
  },
  GalleryPickerLeft:{
   // flexDirection:"row",
   width:"48.5%",
   alignItems:"center",
   borderWidth:1,
   borderRightWidth:.5,

   borderColor: '#cccccc',
   //margin:5,
   padding:0,
   paddingBottom:25,
   paddingTop:25,
   justifyContent: 'flex-end'

  },
  photoContaitnerText:{
    marginBottom:20,
    marginRight:8,

  },
  photoContaitnerText2:{
    marginTop:20,
    marginRight:8,

  },
  photoText:{   
     fontSize:18,
    fontFamily: 'sans-serif-thin',
    color:"#000",
    fontWeight:"bold"
  },

  GalleryPickerRight:{
   // flexDirection:"row",
   justifyContent: 'flex-end',

   width:"48.5%",
   alignItems:"center",
   borderWidth:1,
   borderLeftWidth:.5,
   borderColor: '#cccccc',
  // margin:5,
   padding:0,
   paddingBottom:25,
   paddingTop:25


  },

  GalleryButtonContainer:{
    flexDirection:"row",
    width:"100%",
    alignItems:"center",

  },
  iconPhoto:{ 
    fontSize:50,
    fontFamily: 'sans-serif-thin',
    color:"#cccccc",
    fontWeight:"bold"},

    iconDelete:{
      position:"absolute",
      fontSize:20,
      color:"red",
      right:2,
      top:2,
    },

    fieldContaitnerSwitch:{
      marginTop:20,
      flex:1,
      flexDirection:"row",
      justifyContent:"flex-start",
      marginLeft:10,
      // borderColor: '#cccccc',
      // borderWidth: 0.5,
      // padding:10,

    },

    SwitchText:{
      //alignItems:"right"
      flex:2,
    },
    SwitchButton:
    {
      //alignItems:"right"

      
    },

});


export default styles;
