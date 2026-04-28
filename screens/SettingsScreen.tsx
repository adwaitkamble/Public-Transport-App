import * as React from "react";
import { StyleSheet, View, Text, Pressable, Switch, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Color, Border, FontFamily } from "../GlobalStyles";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

const SettingsScreen = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const { isDarkMode, toggleDarkMode, themeColors } = useTheme();
  const [locationServices, setLocationServices] = React.useState(true);

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 16), backgroundColor: themeColors.headerBg }]}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={themeColors.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: themeColors.text }]}>Settings</Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.content}>
        <View style={[styles.section, { backgroundColor: themeColors.cardBackground }]}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>App Preferences</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Feather name="moon" size={20} color={themeColors.primary} />
              <Text style={[styles.settingText, { color: themeColors.text }]}>Dark Mode</Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={toggleDarkMode}
              trackColor={{ false: themeColors.divider, true: themeColors.primary }}
              thumbColor={Color.colorWhite}
            />
          </View>
          <View style={[styles.settingDivider, { backgroundColor: themeColors.divider }]} />
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Feather name="map-pin" size={20} color={themeColors.primary} />
              <Text style={[styles.settingText, { color: themeColors.text }]}>Location Services</Text>
            </View>
            <Switch
              value={locationServices}
              onValueChange={setLocationServices}
              trackColor={{ false: themeColors.divider, true: themeColors.primary }}
              thumbColor={Color.colorWhite}
            />
          </View>
          <View style={[styles.settingDivider, { backgroundColor: themeColors.divider }]} />
          <Pressable style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Feather name="globe" size={20} color={themeColors.primary} />
              <Text style={[styles.settingText, { color: themeColors.text }]}>Language</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: themeColors.subText, marginRight: 5 }}>English</Text>
              <Feather name="chevron-right" size={20} color={themeColors.subText} />
            </View>
          </Pressable>
        </View>

        <View style={[styles.section, { backgroundColor: themeColors.cardBackground }]}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>About</Text>
          <Pressable style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Feather name="file-text" size={20} color={themeColors.primary} />
              <Text style={[styles.settingText, { color: themeColors.text }]}>Terms of Service</Text>
            </View>
            <Feather name="chevron-right" size={20} color={themeColors.subText} />
          </Pressable>
          <View style={[styles.settingDivider, { backgroundColor: themeColors.divider }]} />
          <Pressable style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Feather name="shield" size={20} color={themeColors.primary} />
              <Text style={[styles.settingText, { color: themeColors.text }]}>Privacy Policy</Text>
            </View>
            <Feather name="chevron-right" size={20} color={themeColors.subText} />
          </Pressable>
          <View style={[styles.settingDivider, { backgroundColor: themeColors.divider }]} />
          <Pressable style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Feather name="info" size={20} color={themeColors.primary} />
              <Text style={[styles.settingText, { color: themeColors.text }]}>App Version</Text>
            </View>
            <Text style={{ color: themeColors.subText }}>1.0.0</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingBottom: 16 },
  backBtn: { width: 40, height: 40, justifyContent: "center" },
  headerTitle: { fontSize: 20, fontWeight: "800", fontFamily: FontFamily.poppins },
  content: { padding: 20 },
  section: { borderRadius: Border.br_16, padding: 15, marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: "700", fontFamily: FontFamily.poppins, marginBottom: 15 },
  settingItem: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 10 },
  settingLeft: { flexDirection: "row", alignItems: "center", gap: 15 },
  settingText: { fontSize: 15, fontFamily: FontFamily.inter },
  settingDivider: { height: 1, marginVertical: 5 },
});

export default SettingsScreen;
