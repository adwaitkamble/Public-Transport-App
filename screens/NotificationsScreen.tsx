import * as React from "react";
import { StyleSheet, View, Text, Pressable, Switch, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Color, Border, FontFamily } from "../GlobalStyles";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

const NotificationsScreen = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const { themeColors } = useTheme();

  const [pushNotifs, setPushNotifs] = React.useState(true);
  const [emailNotifs, setEmailNotifs] = React.useState(false);
  const [promoNotifs, setPromoNotifs] = React.useState(true);

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 16), backgroundColor: themeColors.headerBg }]}> 
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={themeColors.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: themeColors.text }]}>Notifications</Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.content}>
        <View style={[styles.section, { backgroundColor: themeColors.cardBackground, borderColor: themeColors.divider }] }>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Notification Preferences</Text>
          
          <View style={styles.notifItem}>
            <View style={styles.notifLeft}>
              <View style={[styles.iconBox, { backgroundColor: themeColors.elevatedBackground }]}>
                <Feather name="bell" size={20} color={themeColors.primary} />
              </View>
              <View>
                <Text style={[styles.notifTitle, { color: themeColors.text }]}>Push Notifications</Text>
                <Text style={[styles.notifDesc, { color: themeColors.subText }]}>Receive alerts on your device</Text>
              </View>
            </View>
            <Switch
              value={pushNotifs}
              onValueChange={setPushNotifs}
              trackColor={{ false: themeColors.divider, true: themeColors.primary }}
              thumbColor={Color.colorWhite}
            />
          </View>
          
          <View style={[styles.divider, { backgroundColor: themeColors.divider }]} />
          
          <View style={styles.notifItem}>
            <View style={styles.notifLeft}>
              <View style={[styles.iconBox, { backgroundColor: themeColors.elevatedBackground }]}>
                <Feather name="mail" size={20} color={themeColors.primary} />
              </View>
              <View>
                <Text style={[styles.notifTitle, { color: themeColors.text }]}>Email Notifications</Text>
                <Text style={[styles.notifDesc, { color: themeColors.subText }]}>Receive updates via email</Text>
              </View>
            </View>
            <Switch
              value={emailNotifs}
              onValueChange={setEmailNotifs}
              trackColor={{ false: themeColors.divider, true: themeColors.primary }}
              thumbColor={Color.colorWhite}
            />
          </View>
          
          <View style={[styles.divider, { backgroundColor: themeColors.divider }]} />
          
          <View style={styles.notifItem}>
            <View style={styles.notifLeft}>
              <View style={[styles.iconBox, { backgroundColor: themeColors.elevatedBackground }]}>
                <Feather name="tag" size={20} color={themeColors.primary} />
              </View>
              <View>
                <Text style={[styles.notifTitle, { color: themeColors.text }]}>Promotions & Offers</Text>
                <Text style={[styles.notifDesc, { color: themeColors.subText }]}>Get deals and discounts</Text>
              </View>
            </View>
            <Switch
              value={promoNotifs}
              onValueChange={setPromoNotifs}
              trackColor={{ false: themeColors.divider, true: themeColors.primary }}
              thumbColor={Color.colorWhite}
            />
          </View>
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
  section: { borderRadius: Border.br_16, padding: 15, marginBottom: 20, borderWidth: 1 },
  sectionTitle: { fontSize: 16, fontWeight: "700", fontFamily: FontFamily.poppins, marginBottom: 15 },
  notifItem: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 12 },
  notifLeft: { flexDirection: "row", alignItems: "center", flex: 1 },
  iconBox: { width: 40, height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center", marginRight: 15 },
  notifTitle: { fontSize: 15, fontWeight: "600", fontFamily: FontFamily.poppins },
  notifDesc: { fontSize: 12, fontFamily: FontFamily.inter, marginTop: 2 },
  divider: { height: 1, marginVertical: 5 },
});

export default NotificationsScreen;
