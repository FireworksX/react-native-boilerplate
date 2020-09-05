import React from "react";
import { View, StyleSheet } from "react-native";
import ThemeView from "../components/ThemeView";

export interface ModalPageHeaderProps {}

const ModalPageHeader = ({}: ModalPageHeaderProps) => {
  return (
    <ThemeView mode="modalPageContent" style={styles.header}>
      <View style={styles.panelHeader}>
        <ThemeView mode="modalHeaderHandler" style={styles.panelHandle} />
      </View>
    </ThemeView>
  );
};

const styles = StyleSheet.create({
  header: {
    shadowColor: "#000000",
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 60,
    height: 6,
    borderRadius: 4,
    marginBottom: 10,
  },
});

export default ModalPageHeader;
