import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import React from 'react';
import { TouchableOpacity , Image , Text } from 'react-native';
// import auth from '@react-native-firebase/auth';
import { Colors } from '../../constants/theme';
import { authIcons } from '../../constants/icons';


async function SignIn() {

  }
  
  
  
  
  async function LogIn() {
   // Attempt login with permissions
  const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

  console.log('RES : ' , result)

  if (result.isCancelled) {
    throw 'User cancelled the login process';
  }

  // Once signed in, get the users AccessToken
  const data = await AccessToken.getCurrentAccessToken();
  console.log('DATA : ' , data)

  if (!data) {
    throw 'Something went wrong obtaining access token';
  }

  // Create a Firebase credential with the AccessToken
  const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(facebookCredential);
  }




function FacebookButton({type}) {
    return (
      <TouchableOpacity
                          onPress={() => type == 'LogIn' ? 
      LogIn()
                          :
                          SignIn()
                          }
                          style={{
                              flex: 1,
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexDirection: 'row',
                              height: 52,
                              borderWidth: 1,
                              borderColor: Colors.grey,
                              marginRight: 4,
                              borderRadius: 10
                          }}
                      >
                          <Image
                              source={authIcons.facebook}
                              style={{
                                  height: 36,
                                  width: 36,
                                  marginRight: 8
                              }}
                              resizeMode='contain'
                          />
  
                          <Text style={{color:'#000'}}>Facebook</Text>
                      </TouchableOpacity>
    );
  }
  
  export {FacebookButton}