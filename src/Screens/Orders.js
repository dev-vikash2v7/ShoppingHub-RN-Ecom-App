import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { fontSize } from '../../constants/theme';
import { ScaledSheet } from 'react-native-size-matters';



const Orders = () => {

  const ordersList = useSelector(state => state.order.data);
  const navigattion  = useNavigation()


  


  const RenderProduct = ({item , order})=>{
    return (

      <TouchableOpacity style={styles.productItem} onPress={()=>navigattion.navigate('OrderDetails' , {orderDetails : order } )}>

                <View style={styles.productItem}>
                      <Image
                        source={{uri: item.image}}
                        style={styles.itemImage}
                      />
                      <View style={styles.nameView}>

                        <Text style={styles.title}>
                          {item.title.length > 20
                            ? item.title.substring(0, 20)
                            : item.title}
                        </Text>

                        <Text style={styles.desc}>
                          {item.description.length > 30
                            ? item.description.substring(0, 30)
                            : item.description}
                        </Text>

                        <Text style={{color: 'green'}}>
                          {'Rs.' + item.price}
                        </Text>

                        <Text style={styles.qty}>Quantity: {item.qty}</Text>

                      </View>


                      <View style={{}}>
                      <FontAwesome name='chevron-right' size={20} color='gray'/>
                      </View>
                </View>
       </TouchableOpacity>

    )
  }

  return (
    <View style={styles.container}>
      
      {ordersList == 0 ?
    <View style={{alignItems:'center' , justifyContent:'center' , marginTop:20}}>
      <Text style={{fontSize:fontSize.extralarge , fontWeight : '600'}}> No Order Yet</Text>
    </View>
    : 
<View>
      <FlatList
        data={ordersList}
        keyExtractor={ (item) => item.id}
        renderItem={({item, index}) => {
          return (
            <View style={styles.orderItem}>

            {/* <View style ={{marginBottom:10}}>
            <Text> Date & Time : <Text style={{fontSize:12 }}>{ Date(item.createdAt)} </Text></Text>
            <Text> Payment Status  : <Text style={{fontSize:14 }}>{item.paymentStatus} </Text></Text>
            </View> */}

          {item.items.map(product=>  <RenderProduct item={product} order = {item}/>) }

          

            <View style={styles.totalView}>
            <Text style={[styles.title , { marginTop:0}] }>  Total Amount : </Text>
            <View style = {{marginRight:2 ,flexDirection:'row' , justifyContent:'space-evenly' , alignItems:'center'}}>
            <FontAwesome name = 'rupee' size = {fontSize.large} color ='black'/> 
            <Text style = {styles.total}>{item.amount} </Text>
            </View>
            </View>

            </View>
          )
        }}
      />
</View>
    }

    </View>
  );
};

export default Orders;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor : Colors.bg,
    paddingHorizontal : '10@s',
    paddingVertical : '20@vs'
  },
  orderItem: {
    width: '95%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    marginBottom: '15@vs',
    borderWidth: 0.3,
    paddingHorizontal: '2@s',
    paddingVertical: '10@vs',
    borderRadius: '10@ms',
    borderColor: '#7D7D7DF2',
    elevation : 2,
    height : 'auto'


  },
  productItem: {
    width: '100%',
    flexDirection: 'row',
    padding:'10@ms' , 
    height : '130@vs',
    justifyContent:'space-between',
    alignItems:'center'

  },
  itemImage: {
    width: '70@s',
    height: '70@vs',
  },
  nameView: {
    marginLeft: 0,
  },
  title: {
    fontSize: fontSize.large,
    color: '#000',
    fontWeight:'500'
  },
  desc:{
fontSize : fontSize.small , 
fontWeight : '300'
  },
  totalView: {
    borderTopWidth: 0.3,
    borderColor: '#B7B7B7',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    width : '100%'
  },
  total:{
    fontWeight:'500',
    fontSize:fontSize.regular,
  },
});
