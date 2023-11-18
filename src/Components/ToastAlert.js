import React from 'react';
import { Text, View, Button } from 'react-native';

export default function ToastAlert({type}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

    {type == 'success'?
      <Button
        title="Success"
        onPress={() => {
          Toast.show({
            type: 'success',
            text1: 'Login Successful',
            text2: 'Welcome to your account!',
          });
        }}
      />
      :
      <Button
        title="Failure"
        onPress={() => {
          Toast.show({
            type: 'error',
            text1: 'Login Failed',
            text2: 'Please check your credentials and try again.',
          });
        }}
      />
    }
      <Toast ref={(ref) => Toast.setRef(ref)} />

    </View>
  );
}
