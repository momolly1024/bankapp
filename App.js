import React, {useState, createContext, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  Linking,
  Alert,
  Modal,
  Pressable,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function HomeScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>qqqqqqqqqqqqq</Text>
    </View>
  );
}

function SettingsScreen() {
  const storedEvents = useContext(AppContext);
  console.log(storedEvents);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
      <Button title="logout" onPress={() => storedEvents.setIsLogin(false)} />
    </View>
  );
}
function Test1Screen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Test1Screen!</Text>
    </View>
  );
}
function Test2Screen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Test2Screen!</Text>
    </View>
  );
}
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Test1"
        component={Test1Screen}
        options={{
          tabBarLabel: 'Test1',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Test2"
        component={Test2Screen}
        options={{
          tabBarLabel: 'Test2',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="face-man" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
          tabBarBadge: 3,
        }}
      />
    </Tab.Navigator>
  );
}

// use context

const AppContext = createContext();

const AppProvider = props => {
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState('molly');

  return (
    <AppContext.Provider value={{isLogin, setIsLogin, name}}>
      {props.children}
    </AppContext.Provider>
  );
};

const App = () => {
  return (
    <AppProvider>
      <Home />
    </AppProvider>
  );
};
const Home = () => {
  const storedEvents = useContext(AppContext);

  console.log('141', storedEvents);

  const login = () => {
    storedEvents.setIsLogin(true);
  };

  const [number, onChangeNumber] = useState(123);
  const [modalVisible, setModalVisible] = useState(false);

  if (!storedEvents.isLogin) {
    return (
      <View style={styles.loginPage}>
        <View style={styles.logo}>
          <Text>BANK APP LOGO</Text>
        </View>
        <View>
          <Text style={styles.loginTitle}>Financial Management App!</Text>
          {/* <Text style={styles.loginTitle}>{storedEvents.name}</Text> */}
        </View>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="account id "
            // keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="password"
            // keyboardType="numeric"
          />
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={() => login()}>
          <Text style={styles.loginBtnTxt}>login</Text>
        </TouchableOpacity>
        <View style={styles.loginHelp}>
          <Text
            style={styles.underline}
            onPress={() => Linking.openURL('http://google.com')}>
            Forgot password?
          </Text>
          <Text style={styles.underline}>Sign Up</Text>
        </View>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Hello World!</Text>
                <Text style={styles.modalText}>Hello World!</Text>
                <Text style={styles.modalText}>Hello World!</Text>
                <Text style={styles.modalText}>Hello World!</Text>

                <View style={styles.modalBtn}>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.textStyle}>Cancel</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.textStyle}>Checked</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.textStyle}>Show Modal</Text>
          </Pressable>
        </View>
      </View>
    );
  }
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  loginPage: {
    flex: 1,
    backgroundColor: '#003D79',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    backgroundColor: 'yellow',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginTitle: {
    color: 'white',
    fontSize: 20,
    marginBottom: 40,
  },
  loginBtn: {
    width: 80,
    height: 40,
    border: '1px solid black',
    backgroundColor: '#46A3FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginTop: 20,
  },
  loginBtnTxt: {fontSize: 20, fontWeight: 'bold', color: 'white'},
  input: {
    height: 40,
    width: 260,
    margin: 4,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  loginHelp: {
    marginTop: 40,
  },
  underline: {
    color: '#aaa',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  centeredView: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: 300,
    // height: 600,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalBtn: {
    flexDirection: 'row',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default App;
