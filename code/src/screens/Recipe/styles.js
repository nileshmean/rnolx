import { StyleSheet, Dimensions } from 'react-native';

const { width: viewportWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  carouselContainer: {
    minHeight: 250
  },
  carousel: {},

  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: 250
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    width: viewportWidth,
    height: 250
  },
  paginationContainer: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'center',
    paddingVertical: 8,
    marginTop: 200
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 0
  },
  infoRecipeContainer: {
    flex: 1,
    marginLeft:15,
    marginRight:15,
    marginTop: 20,
    marginBottom:20,

  },

  infoRecipeContainer2: {
    flex: 1,
    margin: 0,
    marginTop: 0,

  },
  infoRecipeContainer3:{
    flex: 1,
    marginLeft:15,
    marginRight:15,
    marginTop: 8,
    marginBottom:8,

  },

  infoContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  infoPhoto: {
    height: 20,
    width: 20,
    marginRight: 0
  },
  infoRecipe: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'FallingSky',
    marginLeft: 5,
  },
  category: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'FallingSky',
    color: '#2cd18a'
  },

  address:{
    fontSize: 14,
    fontFamily: 'FallingSky',
  },

  infoHeading: {
    textAlign: 'left',
    fontSize: 16,
    fontWeight:"bold",
    fontFamily: 'FallingSky',
    justifyContent: 'flex-start',
    marginTop: 8,
    margin: 0
  },

  infoDescriptionRecipe: {
    textAlign: 'left',
    fontSize: 16,
    fontFamily: 'FallingSky',
    marginTop: 4,
   // margin: 15
  },
  infoRecipePrice:{
    fontSize: 20,
    fontFamily: 'FallingSky',
    fontWeight: 'bold',
    color: 'black',
    //textAlign: ''
  },
  infoRecipeName: {
    fontSize: 20,
    fontFamily: 'FallingSky',
    
    fontWeight: 'bold',
    color: 'black',
    //textAlign: ''
  },

  ContainterSeprator:{
    borderTopWidth:10,
    borderTopColor:"#eff0f1"
  },

  ContainterSepratorLast:{
    borderTopWidth:10,
    borderTopColor:"#eff0f1",
    marginBottom:40,
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

 button1:{
 width:"100%",
 flex: 1,
 alignItems: 'center',
 borderRightWidth:1,
 borderRightColor:"#FFF",
 height:50,
 justifyContent:"center"
  },
  button2:{
    width:"100%",
    flex: 1,
    alignItems: 'center',
    borderLeftWidth:0,
    borderLeftColor:"#FFF"
     },
  button1Text:{
    fontSize:18,
    fontFamily: 'sans-serif-thin',
    color:"#FFFFFF",
    fontWeight:"bold"

  },
  button1Icon:{
    fontSize:22,
    color:"#FFFFFF",

  },
  flexsRight:{
    flex:1,
    alignItems:"flex-start",
    width:50,
  },
  flexsLeft:{
    flex:1,
    alignItems:"flex-end"
  },
  flexsrowPrice:{
    flexDirection:"row", 
    marginBottom:5, 
    marginTop:5
  },

  flexsrowTitle:{
    flexDirection:"row", 
    marginBottom:5, 
    marginTop:0
  },

  flexsrowCategory:{
    flexDirection:"row", 
    marginBottom:5, 
    marginTop:5
  },

  flexsrowAddress:{
    flexDirection:"row",
    marginBottom:5, 
    marginTop:5
  },

  iconMap:{
    fontSize:20,

  },
  iconCheck:{
    fontSize:18,
    color:"green"

  },

  iconFavorite:{
    fontSize:28,
    color:"#9b9b9b"

  },
  flexsrow:{
    flexDirection:"row"
  },

  DetailServiceLabel:{
    margin:3
  },
  DetailListTextReport:{
    color:"#2cd18a",

  },


  flexContainerPostBy: { 
     width: "100%",
    flexDirection: 'row',
    marginBottom:5, 
    marginTop:10
},

PostByAvatar: { 
flex:1,
alignItems:"flex-start",
textAlignVertical:"center",
fontSize:28
},

PostByText: { 
  flex:2,
  },

  PostByButton: { 
    flex:1, 
    alignItems:"flex-end"
    },

    PostByAngle:{
      fontSize:32,
      color:"#9b9b9b"
    },

PostByTextName: {
  fontSize:20,

},
PostByTextMemeber: {
  fontSize:14,
  color:"#9b9b9b"


},
    

});

export default styles;
