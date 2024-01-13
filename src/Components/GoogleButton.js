import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import React, { useEffect } from 'react';
import { TouchableOpacity , Image , Text } from 'react-native';
import { Colors } from '../../constants/theme';
import { authIcons } from '../../constants/icons';
import { scale, verticalScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';
// import { setUser } from '../Redux/Slices/AuthSlice';


function GoogleButton({type}) {

  const navigation = useNavigation()
  // const dispatch = useDispatch()

  useEffect(()=>{
    GoogleSignin.configure({
      webClientId: '950826209833-pik3ai6qkge4k1o9grc01jrjjf5ft52v.apps.googleusercontent.com',
    });
  },[])


  async function LogIn() {
  
  
    try {
    
      await GoogleSignin.hasPlayServices();
      const {idToken  } = await GoogleSignin.signIn();

      // console.log('Google user : ' , user)

      // {"email": "vkashverma6@gmail.com", "familyName": "Verma", "givenName": "Vkash", "id": "116358630428499405390", "name": "Vkash Verma", "photo": "https://lh3.googleusercontent.com/a/ACg8ocLeFOFrfWvZfKHW3I9-pI1gJBdqox_xgkmCHpK2SVvV=s96-c"}
  
      // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    await auth().signInWithCredential(googleCredential)

    navigation.navigate('HomeTab')


    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        console.log('EEEE : ' , error)
        // some other error happened
      }
    }
  }
  





  return (
    <TouchableOpacity
                        onPress={() => LogIn()
                        }
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            height: verticalScale(52),
                            borderWidth: 1,
                            borderColor: Colors.grey,
                            marginRight: scale(4),
                            borderRadius: scale(10)
                        }}
                    >
                        <Image
                            source={authIcons.google}
                            style={{
                                height: scale(36),
                                width: scale(36),
                                marginRight: scale(8)
                            }}
                            resizeMode='contain'
                        />

                        <Text style={{color:'#000'}}>Google</Text>
                        
{/* // Google user :  {"email": "vikashvermacom92@gmail.com", "familyName": "Verma", "givenName": "Vikash", "id": "100618011480406057098", "name": "Vikash Verma", "photo": "https://lh3.googleusercontent.com/a/ACg8ocKE0QG6a2CN9I3uQSsACvJfKv3hw3WBUOMG2BflfyNwAl0=s96-c"}

//  LOG  Google firebase 
{ user :  {"additionalUserInfo": {"isNewUser": false, "profile": {"aud": "950826209833-pik3ai6qkge4k1o9grc01jrjjf5ft52v.apps.googleusercontent.com", "azp": "950826209833-sd2mh3b7uh10dvs7okeqkfgv36t55mon.apps.googleusercontent.com", "email": "vikashvermacom92@gmail.com", "email_verified": true, "exp": 1700312814, "family_name": "Verma", "given_name": "Vikash", "iat": 1700309214, "iss": "https://accounts.google.com", "locale": "en", "name": "Vikash Verma", "picture": "https://lh3.googleusercontent.com/a/ACg8ocKE0QG6a2CN9I3uQSsACvJfKv3hw3WBUOMG2BflfyNwAl0=s96-c", "sub": "100618011480406057098"}, "providerId": "google.com"}, "user": {"displayName": "Vikash Verma", "email": "vikashvermacom92@gmail.com", "emailVerified": true, "isAnonymous": false, "metadata": [Object], "multiFactor": [Object], "phoneNumber": null, "photoURL": "https://lh3.googleusercontent.com/a/ACg8ocKE0QG6a2CN9I3uQSsACvJfKv3hw3WBUOMG2BflfyNwAl0=s96-c", "providerData": [Array], "providerId": "firebase", "tenantId": null, "uid": "ZLUuXZFrSAPr3yp6TDNSBpbCrHN2"}}

//  LOG  App user :  {"displayName": "Vikash Verma", "email": "vikashvermacom92@gmail.com", "emailVerified": true, "isAnonymous": false, "metadata": {"creationTime": 1700291010623, "lastSignInTime": 1700311528053}, "multiFactor": {"enrolledFactors": [Array]}, "phoneNumber": null, "photoURL": "https://lh3.googleusercontent.com/a/ACg8ocKE0QG6a2CN9I3uQSsACvJfKv3hw3WBUOMG2BflfyNwAl0=s96-c", "providerData": [[Object]], "providerId": "firebase", "tenantId": null, "uid": "ZLUuXZFrSAPr3yp6TDNSBpbCrHN2"} */}

{/* App user :  {"displayName": null, "email": "vk23developer@gmail.com", "emailVerified": false, "isAnonymous": false, "metadata": {"creationTime": 1700293749142, "lastSignInTime": 1700311917536}, "multiFactor": {"enrolledFactors": [Array]}, "phoneNumber": null, "photoURL": null, "providerData": [[Object]], "providerId": "firebase", "tenantId": null, "uid": "RAS4dpiIMwNWZZkoHMz6bnMnNa42"} */}

                    </TouchableOpacity>
  );
}

export default GoogleButton;

