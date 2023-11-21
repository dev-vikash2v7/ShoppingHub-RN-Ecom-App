import { Dimensions } from "react-native";
import { moderateScale, scale } from "react-native-size-matters";

const { width , height} = Dimensions.get('window');


const Colors = {
    white: "#FFFFFF",
    black: "#222222",

    secondary: "#007260", 
    secondary1: "#39B68D",
    primary: "#0786DAFD",

    grey: "#CCCCCC",

    tertiary: "#FF7754",
  
    lightWhite: "#FAFAFC",

    bg: '#FFFFFF',
    text: '#333333',
    accent: '#9C27B0',
    highlight : '#FF5722',
    success : '#4CAF50',
    error : '#FF5252',
    lightGreen:"rgba(0,197,105, 0.2)"
}

  
  
const fontSize = {
    small: ( height ) / 70,
    regular: ( height ) / 50,
    large: ( height ) / 40,
    extralarge:( height ) / 30
} 
// const fontSize = {
//     small: scale(12 , 0.3),
//     regular: scale(14),
//     large: scale(18 , 0.3),
//     extralarge: scale(29)
// } 
  
  const SHADOWS = {
    small: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2,
    },
    medium: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 5.84,
      elevation: 5,
    },
  };
  
export {Colors ,fontSize , height , width}

// export const appColors={
//   primary:'#00C569',
//   secondary:"#fff",
//   white:"#ffffff",
//   black:"#000",
//   yellow:"#FFC107",
//   redOrange:"#FF3D00",
//   red:"#E80057",
//   darkGray:"#929292",
//   lightGray:'#DDDDDD',
//   gray:"#BEBEBE",
//   lightGreen:"rgba(0,197,105, 0.2)"
// }
// export const shadow = {
//   shadowColor: "#000",
//   shadowOffset: {
//       width: 0,
//       height: 2,
//   },
//   //shadowOpacity: 0.25,
//   shadowRadius: 3.84,
//   elevation: 2,
// }

/*
MD5: 20:F4:61:48:B7:2D:8E:5E:5C:A2:3D:37:A4:F4:14:90
SHA1: 5E:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:25
SHA-256: FA:C6:17:45:DC:09:03:78:6F:B9:ED:E6:2A:96:2B:39:9F:73:48:F0:BB:6F:89:9B:83:32:66:75:91:03:3B:9C


*/