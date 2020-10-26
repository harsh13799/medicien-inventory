import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  FlatList,
  Text,
  View,
  Image,
  ScrollView,
  Platform,
  TouchableHighlight,
  Keyboard,
} from "react-native";
import {
  MaterialCommunityIcons,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Button, TextInput, Snackbar } from "react-native-paper";
import * as firebase from "firebase";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";

export default function AddEdit({ navigation }) {
  const [text, setText] = useState("");
  const [etext, seteText] = useState(false);
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [equantity, seteQuantity] = useState(false);
  const [remark, setRemark] = useState("");
  const [purchaseDate, setPurchaseData] = useState("");
  const [epurchaseDate, setePurchaseData] = useState(false);
  const [expiryData, setExpiryData] = useState("");
  const [eexpiryData, seteExpiryData] = useState(false);
  const [purchaseFrom, setPurchaseFrom] = useState("");
  const [epurchaseFrom, setePurchaseFrom] = useState(false);
  const [mobileNo, setMobileNo] = useState("");
  const [emobileNo, seteMobileNo] = useState(false);
  const [showDatePicker1, setShowDatePicker1] = useState(false);
  const [showDatePicker2, setShowDatePicker2] = useState(false);
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [snackBarText, setSnackBarText] = useState(
    "Required field value are missing."
  );
  // const [image, setImage] = useState(null);
  const [id, setId] = useState("");

  // useEffect(() => {
  //   (async () => {
  //     if (Platform.OS !== 'web') {
  //       // const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
  //       const { status } = await ImagePicker.requestCameraPermissionsAsync();
  //       if (status !== 'granted') {
  //         alert('Sorry, we need camera roll permissions to make this work!');
  //       }
  //     }
  //   })();
  // }, []);

  // Get a reference to the database service

  function saveData() {
    var newReference = firebase.database().ref("medicine/").push();
    newReference.set({
      mName: text,
      mDescription: description,
      mQuantity: quantity,
      mPuchaseDate: purchaseDate,
      mExpiryDate: expiryData,
      mPurchaseFrom: purchaseFrom,
      mMobileNumber: mobileNo,
      mRemark: remark,
      mId: newReference.key,
    });
  }

  // uploadImage = async(uri) => {
  //   const response = await fetch(uri);
  //   const blob = await response.blob();
  //   var ref = firebase.storage().ref().child("medicine/" +id);
  //   return ref.put(blob);
  // }

  const onPurchaseChange = (event, selectedDate) => {
    setShowDatePicker1(false);
    if (selectedDate === undefined) {
      setPurchaseData("");
    } else {
      var temp = new Date(selectedDate);
      var m = ("0" + (temp.getMonth() + 1)).slice(-2);
      var d = ("0" + temp.getDate()).slice(-2);
      setPurchaseData(d + "-" + m + "-" + temp.getFullYear().toString());
    }
  };
  const onExpiryChange = (event, selectedDate) => {
    setShowDatePicker2(false);
    if (selectedDate === undefined) {
      setExpiryData("");
    } else {
      var temp = new Date(selectedDate);
      var m = ("0" + (temp.getMonth() + 1)).slice(-2);
      var d = ("0" + temp.getDate()).slice(-2);
      setExpiryData(d + "-" + m + "-" + temp.getFullYear().toString());
    }
  };

  const saveButtonHandler = () => {
    var validate = true;
    if (text == "") {
      seteText(true);
      validate = false;
    }
    if (quantity == "") {
      seteQuantity(true);
      validate = false;
    }
    if (purchaseDate == "") {
      setePurchaseData(true);
      validate = false;
    }
    if (expiryData == "") {
      seteExpiryData(true);
      validate = false;
    }
    if (purchaseFrom == "") {
      setePurchaseFrom(true);
      validate = false;
    }
    if (mobileNo == "") {
      seteMobileNo(true);
      validate = false;
    }

    if (!validate) {
      setSnackBarVisible(true);
    } else if (validate) {
      if (quantity.match(/^[0-9]+$/) == null) {
        setSnackBarText("Quantity value must be in numbers.");
        setSnackBarVisible(true);
      } else if (mobileNo.match(/^[0-9]+$/) == null) {
        setSnackBarText("Mobile number must be in numbers.");
        setSnackBarVisible(true);
      } else if (mobileNo.length != 10) {
        setSnackBarText("Mobile number length must be ten.");
        setSnackBarVisible(true);
      } else {
        console.log("pressed");
        saveData();
      }
    }
  };

  // const pickImage = async () => {
  //   let result = await ImagePicker.launchCameraAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [3, 3],
  //     quality: 0.6,
  //   });
  //   if (!result.cancelled) {
  //     setImage(result.uri);
  //   }
  // };
  return (
    <ScrollView style={styles.container}>
      <View style={{ marginBottom: 20 }}>
        <TextInput
          label="Medicine Name"
          style={styles.textinput}
          value={text}
          error={etext}
          onFocus={() => seteText(false)}
          mode="outlined"
          onChangeText={(text) => setText(text)}
        />
        <TextInput
          label="Description"
          placeholder="(Optional)"
          style={styles.textinput}
          value={description}
          multiline={true}
          numberOfLines={4}
          mode="outlined"
          onChangeText={(description) => setDescription(description)}
        />
        <TextInput
          label="Quantity"
          style={styles.textinput}
          value={quantity}
          mode="outlined"
          onFocus={() => seteQuantity(false)}
          error={equantity}
          onChangeText={(quantity) => setQuantity(quantity)}
        />
        <View style={styles.dateContainer}>
          <TextInput
            label="Purchase Date"
            value={purchaseDate}
            error={epurchaseDate}
            style={styles.dateInput}
            onFocus={() => {
              setePurchaseData(false);
              setShowDatePicker1(true);
            }}
            mode="outlined"
            onTouchEnd={Keyboard.dismiss}
          />
          <TextInput
            label="Expiry Date"
            value={expiryData}
            error={eexpiryData}
            style={styles.dateInput}
            onFocus={() => {
              setShowDatePicker2(true);
              seteExpiryData(false);
            }}
            mode="outlined"
            onTouchEnd={Keyboard.dismiss}
          />
        </View>
        <TextInput
          label="Purchase From"
          style={styles.textinput}
          value={purchaseFrom}
          mode="outlined"
          onFocus={() => setePurchaseFrom(false)}
          error={epurchaseFrom}
          onChangeText={(purchaseFrom) => setPurchaseFrom(purchaseFrom)}
        />
        <TextInput
          label="Mobile Number"
          style={styles.textinput}
          value={mobileNo}
          error={emobileNo}
          onFocus={() => seteMobileNo(false)}
          mode="outlined"
          onChangeText={(mobileNo) => setMobileNo(mobileNo)}
        />
        <TextInput
          label="Remark"
          style={styles.textinput}
          value={remark}
          placeholder="(Optional)"
          multiline={true}
          numberOfLines={4}
          mode="outlined"
          onChangeText={(remark) => setRemark(remark)}
        />
        {/* <View style={styles.imageContainer}>
              {image && <Image source={{ uri: image }} style={styles.image} onPress={pickImage} />}
              {!image && <MaterialIcons name="image" size={100} color="grey" />}
                <View styles={styles.buttonContainer}>
                <Button mode="contained" style={{marginLeft:10,marginRight:10,marginTop:10}} onPress={pickImage}>
                Add Image
                </Button>
                <Button mode="contained" style={{marginLeft:10,marginRight:10,marginTop:5}} onPress={()=>setImage(null)}>
                Remove Image
                </Button>
                </View>
             </View> */}
        <Button
          mode="contained"
          style={styles.button}
          onPress={saveButtonHandler}
        >
          Save
        </Button>
        {showDatePicker1 && (
          <DateTimePicker
            mode="date"
            value={new Date()}
            dateFormat="shortdate"
            minimumDate={new Date()}
            is24Hour="false"
            display="default"
            onChange={onPurchaseChange}
          />
        )}
        {showDatePicker2 && (
          <DateTimePicker
            mode="date"
            value={new Date()}
            dateFormat="shortdate"
            minimumDate={new Date()}
            is24Hour="false"
            display="default"
            onChange={onExpiryChange}
          />
        )}
      </View>
      <Snackbar
        visible={snackBarVisible}
        duration={3000}
        onDismiss={() => setSnackBarVisible(false)}
      >
        {snackBarText}
      </Snackbar>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 7,
    paddingLeft: 7,
    paddingRight: 7,
  },
  textinput: {
    marginBottom: 5,
  },
  dateContainer: {
    flexDirection: "row",
    marginBottom: 5,
    alignContent: "space-between",
    justifyContent: "space-between",
  },
  dateInput: {
    width: "49%",
  },
  button: {
    marginTop: 10,
    marginLeft: 100,
    marginRight: 100,
    marginBottom: 10,
  },
  imageContainer: {
    flexDirection: "row",
    alignContent: "space-between",
    justifyContent: "space-between",
    borderRadius: 4,
    borderColor: "grey",
    borderWidth: 1,
    padding: 5,
  },
  image: {
    width: "47%",
    height: 100,
  },
  buttonContainer: {},
});
