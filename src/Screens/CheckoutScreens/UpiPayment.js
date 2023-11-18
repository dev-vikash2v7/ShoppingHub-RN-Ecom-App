import { Linking, View } from "react-native"
import CustomButton from "../../Components/CustomButton"
import { verticalScale } from "react-native-size-matters"

export default function UpiPayment({total}){
    
        return(
          <View style={{marginTop:verticalScale(10)}}>

            {/* <Text>Enter Upi Id : </Text>
            <TextInput
              placeholder='vikash@axl'
              value={upi}
              onChangeText={t=>setUpi(t)}
              style={{
                borderWidth:0.5 ,
                borderColor:'grey',
                fontSize:14,
                padding:4,
                borderRadius:10,
                paddingLeft:10,
                marginTop:6,
                fontWeight:'500'
              }}
            /> */}

             <CustomButton
            bg={'blue'}
            title={'Pay With UPI'}
            color={'#fff'}
           onClick={() => pay()   }
           width={'100%'}
          />
          </View>
        )
  
  }
  