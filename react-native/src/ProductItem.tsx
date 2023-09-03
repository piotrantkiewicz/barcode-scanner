import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Chip, IconButton } from "react-native-paper";
import NewIcon from "./NewIcon";
import PlaceholderImage from "./PlaceholderImage";

interface ProductItemProps {
  name: string;
  thumbnailSrc: string;
  createdAt: string;
  categories: string[];
  isNew?: boolean;
}

const ProductItem = ({
  name,
  createdAt,
  thumbnailSrc,
  categories,
  isNew = false
}: ProductItemProps) => {
  const [areCategoriesVisible, setAreCategoriesVisible] = useState(true);

  const handleChevronPress = () => {
    setAreCategoriesVisible(!areCategoriesVisible);
  };

  const thumbnail = thumbnailSrc ? (
    <Image
      source={{ uri: thumbnailSrc }}
      style={styles.thumbnail}
      resizeMode="contain"
    />
  ) : (
    <PlaceholderImage />
  );

  return (
    <View style={styles.container}>
      <View style={styles.thumbnailWrapper}>{thumbnail}</View>
      <View style={styles.content}>
        <View style={styles.info}>
          <View style={styles.infoLeft}>
            <Text style={styles.name} numberOfLines={1}>
              {name}
            </Text>
            <Text style={styles.date}>{createdAt}</Text>
          </View>
          <View style={styles.infoRight}>
            {isNew && <NewIcon />}
            <IconButton
              icon={areCategoriesVisible ? "chevron-up" : "chevron-down"}
              onPress={handleChevronPress}
            />
          </View>
        </View>
        {areCategoriesVisible && (
          <View style={styles.categories}>
            {categories.map((category) => (
              <Chip style={styles.category}>{category}</Chip>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flexDirection: "row",
    gap: 20,
    borderRadius: 4,
    backgroundColor: "#F8F9FC",
    marginHorizontal: 16,
    marginBottom: 12,
    shadowColor: "#263340",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 1
  },
  thumbnailWrapper: {
    flex: 1
  },
  thumbnail: {
    flex: 1,
    height: undefined,
    width: undefined
  },
  content: {
    flex: 4
  },
  info: {
    flexDirection: "row",
    gap: 20
  },
  infoLeft: {
    flex: 1,
    rowGap: 2
  },
  name: {
    fontSize: 20,
    fontWeight: "900"
  },
  date: {
    fontSize: 12
  },
  infoRight: {
    flexDirection: "row",
    gap: 16,
    flex: 1
  },
  newIcon: {
    width: 50,
    height: 10
  },
  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 6,
    columnGap: 4
  },
  category: {
    borderRadius: 48,
    backgroundColor: "#D4E5FF"
  }
});
