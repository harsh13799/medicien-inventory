import React, { useEffect, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import {
  MaterialCommunityIcons,
  Feather,
  MaterialIcons,
} from "@expo/vector-icons";
import * as firebase from "firebase";
import { FlatList, RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState();
  var list = [];

  const AnimatedIcon = Animated.createAnimatedComponent(MaterialIcons);

  const renderRightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });
    return (
      <RectButton style={styles.rightAction}>
        <AnimatedIcon
          name="delete-forever"
          size={30}
          color="#fff"
          style={[styles.actionIcon, { transform: [{ scale }] }]}
        />
      </RectButton>
    );
  };

  useEffect(() => {
    var database = firebase.database();

    database.ref("medicine/").on("value", (snapshot) => {
      snapshot.forEach(function (child) {
        list.push({
          mDescription: child.val().mDescription,
          mExpiryDate: child.val().mExpiryDate,
          mMobileNumber: child.val().mMobileNumber,
          mName: child.val().mName,
          mPuchaseDate: child.val().mPuchaseDate,
          mPurchaseFrom: child.val().mPuchaseFrom,
          mQuantity: child.val().mQuantity,
          mRemark: child.val().mRemark,
          mId: child.val().mId,
        });
      });
      setData(list);
    });
  });

  return (
    <View style={styles.container}>
      {/* <FlatList
        data={data}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          // <Swipeable renderRightActions={renderRightActions}>
          //   <RectButton style={styles.rectButton}>
          <Text style={styles.fromText}>{item.mName}</Text>
          //     <Text style={styles.messageText}>{item.mDescription}</Text>
          //     <Text style={styles.dateText}>{item.mQuantity}</Text>
          //   </RectButton>
          // </Swipeable>
        )}
        keyExtractor={(item) => item.mId}
      /> */}
      <TouchableOpacity
        activeOpacity={0.3}
        style={styles.touchableOpacityStyle}
        onPress={() => navigation.navigate("AddEdit")}
      >
        <MaterialCommunityIcons name="plus-circle" size={70} color="blue" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  touchableOpacityStyle: {
    position: "absolute",
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 20,
  },
  floatingButtonStyle: {
    resizeMode: "contain",
    width: 70,
    height: 70,
    //backgroundColor:'black'
  },
  rectButton: {
    flex: 1,
    height: 80,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    flexDirection: "column",
    backgroundColor: "white",
  },
  separator: {
    backgroundColor: "rgb(200, 199, 204)",
    height: 2,
  },
  fromText: {
    fontWeight: "bold",
    backgroundColor: "transparent",
  },
  messageText: {
    color: "#999",
    backgroundColor: "transparent",
  },
  dateText: {
    backgroundColor: "transparent",
    position: "absolute",
    right: 20,
    top: 10,
    color: "#999",
    fontWeight: "bold",
  },
  actionIcon: {
    width: 30,
    height: 30,
    marginHorizontal: 10,
  },
  rightAction: {
    alignItems: "flex-end",
    backgroundColor: "#dd2c00",
    justifyContent: "center",
  },
});
