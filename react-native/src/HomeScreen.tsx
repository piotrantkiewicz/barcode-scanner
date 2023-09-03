import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Appbar, FAB } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { selectors, actions } from "./store/inventory";
import { RootState } from "./store";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackScreenProps } from "@react-navigation/stack";
import { StackParamList } from "./App";
import ProductItem from "./ProductItem";

function isDateWithinLastNDays(dateToCheck: Date, n: number): boolean {
  const currentDate: Date = new Date();
  const nDaysAgo: Date = new Date();
  nDaysAgo.setDate(currentDate.getDate() - n);

  return dateToCheck >= nDaysAgo && dateToCheck <= currentDate;
}

export default (props: StackScreenProps<StackParamList, "Home">) => {
  const fetching = useSelector((state: RootState) => state.inventory.fetching);
  const inventory = useSelector(selectors.selectInventory);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      dispatch(actions.fetchInventory());
    });
    return unsubscribe;
  }, [props.navigation]);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Appbar.Header style={{ backgroundColor: "#FDFBFC" }}>
        <Appbar.Content title="Inventory" />
      </Appbar.Header>

      <FlatList
        data={inventory}
        renderItem={({ item }) => (
          <ProductItem
            name={item.fields["Product Name"]}
            thumbnailSrc={item.fields["Product Image"]}
            categories={item.fields["Product Categories"]?.split(",") ?? []}
            createdAt={new Date(item.fields.Posted).toLocaleDateString()}
            isNew={isDateWithinLastNDays(new Date(item.fields.Posted), 7)}
          />
        )}
        onRefresh={() => dispatch(actions.fetchInventory())}
        refreshing={fetching}
        style={{ flex: 1 }}
      />

      <SafeAreaView style={styles.fab}>
        <FAB
          icon={() => (
            <MaterialCommunityIcons name="barcode" size={24} color="#0B5549" />
          )}
          label="Scan Product"
          onPress={() => props.navigation.navigate("Camera")}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 16,
    width: "100%",
    flex: 1,
    alignItems: "center"
  }
});
