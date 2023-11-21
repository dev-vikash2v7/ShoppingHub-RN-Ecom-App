import { ScrollView, Text, View } from "react-native";


export default CheckoutScreen = () => {
  return (
        <ScrollView
          style={{ flex: 1 }}
          horizontal={true}
          scrollEventThrottle={16}
          pagingEnabled={true}
        >
          <View style={{ width, height }}>
            <Text>Screen 1</Text>
          </View>

          <View style={{ width, height }}>
            <Text>Screen 2</Text>
          </View>

        </ScrollView>
  );
};