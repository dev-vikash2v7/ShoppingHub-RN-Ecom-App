import React, { useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Modal,
  ActivityIndicator
} from 'react-native';


import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import  FontAwesome from 'react-native-vector-icons/FontAwesome';
import {   useDispatch, useSelector} from 'react-redux'
import { appIcons } from '../../constants/icons';
import { Colors, fontSize } from '../../constants/theme';
import { setUser, updateUser } from '../Redux/Slices/AuthSlice';
import db from '@react-native-firebase/firestore'
import { ScaledSheet } from 'react-native-size-matters';


const EditProfile = () => {

  const user= useSelector(state => state.auth.user);
  const [image, setImage] = useState('https://api.adorable.io/avatars/80/abott@adorable.png');
  const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmit , setIsSubmit] = useState(false)
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };
    
  const dispatch = useDispatch();


  const handleSubmit =async () => {
 
    setIsSubmit(true)
    const userDocRef = doc(db, 'Users', user.id);

    

  await  updateDoc(userDocRef, {name,email,address})
  .then(() => {
    console.log('Document updated successfully');
    dispatch(updateUser( {name,email,address}))
  })
  .catch((error) => {
    console.error('Error updating document: ', error);
    setErrorMessage('Network connection is weak. ');
    
    setIsSubmit(false)
  });

  setIsSubmit(false)

  };





  const takePhotoFromCamera = async () => {
    // const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      setErrorMessage('Permission to access camera was denied');
      return
    }

    let result = await ImagePicker.launchCameraAsync({
      // mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      setImage(result.assets[0]);

    }
  }


  const choosePhotoFromLibrary =async () => {
    
    // get media permission
    if (Platform.OS !== 'web') {
      // const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        setErrorMessage('Permission to access media library is required!');
        return;
      } 
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });


  if (!result.canceled) {
    setImage(result.assets[0]);
  }
  }



 const renderInner = () => (

  <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}

      >
    <View style={styles.modalContainer}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity style={styles.panelButton} onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.panelButton} onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => setModalVisible(false)}
        >
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>

    </View>
    </Modal>
  );




  return (
    <View style={styles.container}>

        <View style={{alignItems: 'center' , marginTop : 5}}>


          <TouchableOpacity onPress={toggleModal}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ImageBackground
                source={appIcons.user}
                style={{height: 100, width: 100}}
                imageStyle={{borderRadius: 15}}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MaterialCommunityIcons
                    name="camera"
                    size={35}
                    color="#fff"
                    style={{
                      opacity: 0.7,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: '#fff',
                      borderRadius: 10,
                    }}
                  />
                </View>
              </ImageBackground>
              
            </View>

          </TouchableOpacity>

          <Text style={{marginTop: 10, fontSize: fontSize.large, fontWeight: 'bold'}}>
            {user.name}
          </Text>


        </View>

      <View style={styles.actionBox}>

        <View style={styles.action}>

          <FontAwesome name="user-o" color={Colors.text} size={20} />
          <TextInput
            placeholder="First Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: Colors.text,
              },
            ]}
            onChangeText={(t)=>setName(t)}
            value={name}
          />
        </View> 


        
        <View style={styles.action}>
          <FontAwesome name="envelope-o" color={Colors.text} size={20} />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#666666"
            keyboardType="email-address"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: Colors.text,
              },
            ]}
            onChangeText={(t)=>setEmail(t)}
            value={email}
          />
        </View>


      
         <View style={styles.action}>
          <MaterialCommunityIcons name="map-marker-outline" color={Colors.text} size={20} />
          <TextInput
            placeholder="Address"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: Colors.text,
              },
            ]}
            onChangeText={(t)=>setAddress(t)}
            value={address}
          />
        </View> 

    </View>

{isSubmit ?
 <ActivityIndicator color='orange' size={30}/> 
 :
        <TouchableOpacity style={styles.commandButton} onPress={handleSubmit}>
          <Text style={styles.panelButtonTitle}>Submit</Text>
        </TouchableOpacity>
        }

{errorMessage &&
        <Text style={styles.errorMessage}>{errorMessage}</Text>
       }

        {isModalVisible &&
          renderInner()
        }

    </View>
  );
};

export default EditProfile;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: '15@ms',
    borderRadius: '10@ms',
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: '10@vs',
  },
 
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: '20@vs',
    borderTopLeftRadius: '20@vs',
    borderTopRightRadius: '20@vs',
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: '40@s',
    height: '8@vs',
    borderRadius: '4@ms',
    backgroundColor: '#00000040',
    marginBottom: '10@vs',
  },
  panelTitle: {
    fontSize: fontSize.extralarge,
    height: '35@vs',
  },
  panelSubtitle: {
    fontSize: fontSize.regular,
    color: 'gray',
    height: '30@vs',
    marginBottom: '10@vs',
  },
  panelButton: {
    padding: '13@ms',
    borderRadius: '10@ms',
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: '7@vs',
  },
  panelButtonTitle: {
    fontSize: fontSize.large,
    fontWeight: 'bold',
    color: 'white',
  },
  actionBox:{
    paddingLeft : '20@s',

  },
  action: {
    flexDirection: 'row',
    marginVertical: '10@vs',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: '5@vs',
    alignItems:'center',
    justifyContent:'center'
  },
  actionError: {
    flexDirection: 'row',
    marginTop: '10@vs',
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: '5@s',
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: '10@s',
    color: '#05375a',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',

    padding: '20@ms',
    paddingTop: '20@vs',
    borderTopLeftRadius: '20@ms',
    borderTopRightRadius: '20@ms',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    shadowOpacity: 0.4,
  },
  errorMessage: {
    marginTop : '5@vs' ,
    color: 'red',
    marginBottom: '7@vs',
    fontWeight : 'bold'
  },
});