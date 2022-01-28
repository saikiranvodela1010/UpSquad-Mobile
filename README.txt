// few changes in node modules to get Perfect UI
    ////////TYPE SCRIPT/////////////////
total changes are required 2: 

 node_modules/react-native-floating-label-input/src/styles.tsx 

 note 1. 
 replace container styles like this:

 container: {
    flexDirection: 'row',
    color: '#49658c',
    borderColor: '#49658c',
    borderWidth: 0,
    borderRadius: 12,
    paddingHorizontal: 11,
    backgroundColor: '#00000000',
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft:6,
    marginTop:10,
    marginRight:10,
    alignContent: 'center',
    justifyContent: 'center',
  },

 note 2.
  node_modules/react-native-floating-label-input/src/index.tsx 

  line 377 : toValue: -20,  place like this

  line 210 :  fontSizeFocused: 15,
  line 211 :  fontSizeBlurred: 16,


//say good bye to await async fro getting userInfo => follow /res/GetUserInfo.js
