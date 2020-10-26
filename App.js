// import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text, View ,SafeAreaView,Platform, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons , Feather} from '@expo/vector-icons'; 
import * as firebase from 'firebase';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

import HomeScreen from './Screens/HomeScreen';
import AddEditScreen from './Screens/AddEditScreen';


export default function App() {
  const [visible, setVisible] = useState(false);
  const Stack = createStackNavigator();
  
  const firebaseConfig = {
    apiKey: "AIzaSyBxVYUJyboDKamkRwoDb7DxYfJxvaXvk1w",
    authDomain: "medicine-management-58ce4.firebaseapp.com",
    databaseURL: "https://medicine-management-58ce4.firebaseio.com",
    projectId: "medicine-management-58ce4",
    storageBucket: "medicine-management-58ce4.appspot.com",
    messagingSenderId: "207060967693",
    appId: "1:207060967693:web:93d599ada04ba16558d044"
  };

  firebase.initializeApp(firebaseConfig);
  var temp;
  const setMenuRef =(ref) => {
    temp = ref;
  };

  const hideMenu = () => {
    temp.hide();
  };

  const showMenu = () => {
    temp.show();
  };
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Medicine" component={HomeScreen} options={{
          // headerTitle: props => <LogoTitle {...props} />,
          headerRight: () => (
            
            <View 
            style={styles.iconContainer}>
            <TouchableOpacity
            activeOpacity={0.3}
           onPress={()=>console.log("serch pressed")}>
          <Feather name="search" size={30} color="blue" style={styles.searchButton} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.3}
           onPress={showMenu}>
          <MaterialCommunityIcons name="dots-vertical" size={30} color="blue" style={styles.threeDotButton} />
          </TouchableOpacity>
          <Menu
            ref={setMenuRef}
          >
            <MenuItem onPress={hideMenu}>Log Out</MenuItem>
          </Menu>
          </View>
          ),
        }}/>
        <Stack.Screen name="AddEdit" component={AddEditScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchButton:{
    marginRight:15
  },
  iconContainer:{
    flexDirection:"row"
  },
  threeDotButton:{
    marginRight:10
  }
});
