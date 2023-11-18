import { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
// import * as Device from 'expo-device';
import { useSelector } from 'react-redux';
// import * as Notifications from 'expo-notifications';
import { Colors, fontSize } from '../../constants/theme';
import AuthScreen from '../Screens/AuthScreens/AuthScreen';
import Container from '../Components/Container';
import { ScaledSheet } from 'react-native-size-matters';


const NotificationScreen = ({navigation}) => {

  const user = useSelector( state => state.auth.user) 
  // const [expoPushToken, setExpoPushToken] = useState('');
  // const [notification, setNotification] = useState(false);
  // const notificationListener = useRef();
  // const responseListener = useRef();



  // useEffect(() => {
  //   registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

  //   notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
  //     setNotification(notification);
  //   });

  //   responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
  //     console.log(response);
  //   });

  //   return () => {
  //     Notifications.removeNotificationSubscription(notificationListener.current);
  //     Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // }, []);


  const notifications = [
    {
      id: 1,
      title: 'Your order has been shipped!',
      message: 'Track your order to see the delivery status.',
      time: 'Today, 10:00 AM',
    },
    {
      id: 2,
      title: 'New deals available!',
      message: 'Check out our latest offers and discounts.',
      time: 'Yesterday, 3:30 PM',
    },
    // Add more notifications as needed
  ];
    
 

    // if(!user) return(
    //         <AuthScreen />
    // )

    // else 
    return (
        <Container >
        {/* <Text>Your expo push token: {expoPushToken}</Text> */}
        {/* <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text>Title: {notification && notification.request.content.title} </Text>
          <Text>Body: {notification && notification.request.content.body}</Text>
          <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
        </View>
        <Button
          title="Press to schedule a notification"
          onPress={async () => {
            await schedulePushNotification();
          }}
        /> */}

        <ScrollView style={styles.container}>
      {notifications.map(notification => (
        <View key={notification.id} style={styles.notification}>
          <Text style={styles.title}>{notification.title}</Text>
          <Text style={styles.message}>{notification.message}</Text>
          <Text style={styles.time}>{notification.time}</Text>
        </View>
      ))}
    </ScrollView>

      </Container>
    );
};

const styles = ScaledSheet.create({
  notification: {
    marginBottom: '20@vs',
    padding: '15@ms',
    borderRadius: '8@ms',
    borderWidth: '1@ms',
    borderColor: '#CCCCCC',
  },
  title: {
    fontSize: fontSize.large,
    fontWeight: 'bold',
    marginBottom: '5@vs',
    color:'#000'
  },
  message: {
    fontSize: fontSize.regular,
    marginBottom: '5@vs',
    color:'#000'

  },
  time: {
    color: '#888888',
    fontSize: fontSize.small,
  },
});







export default NotificationScreen;


// async function schedulePushNotification() {
//     await Notifications.scheduleNotificationAsync({
//       content: {
//         title: "You've got mail! 📬",
//         body: 'Here is the notification body',
//         data: { data: 'goes here' },
//       },
//       trigger: { seconds: 2 },
//     });
//   }
  
//   async function registerForPushNotificationsAsync() {
//     let token;
  
//     if (Platform.OS === 'android') {
//       await Notifications.setNotificationChannelAsync('default', {
//         name: 'default',
//         importance: Notifications.AndroidImportance.MAX,
//         vibrationPattern: [0, 250, 250, 250],
//         lightColor: '#FF231F7C',
//       });
//     }
  
//     if (Device.isDevice) {
//       const { status: existingStatus } = await Notifications.getPermissionsAsync();
//       let finalStatus = existingStatus;
//       if (existingStatus !== 'granted') {
//         const { status } = await Notifications.requestPermissionsAsync();
//         finalStatus = status;
//       }
//       if (finalStatus !== 'granted') {
//         alert('Failed to get push token for push notification!');
//         return;
//       }
//       // Learn more about projectId:
//       // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
//       token = (await Notifications.getExpoPushTokenAsync({ projectId: '7e3b055f-c80c-40ac-8470-e0db0925f993' })).data;
//       console.log(token);
//     } else {
//       alert('Must use physical device for Push Notifications');
//     }
  
//     return token;
//   }