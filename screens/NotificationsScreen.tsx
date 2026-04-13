import * as React from "react";
import { StyleSheet, View, Text, Pressable, Switch, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Color, Border, FontFamily } from "../GlobalStyles";
import { Ionicons, Feather } from "@expo/vector-icons";

const NotificationsScreen = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  const [pushNotifs, setPushNotifs] = React.useState(true);
  const [emailNotifs, setEmailNotifs] = React.useState(false);
  const [promoNotifs, setPromoNotifs] = React.useState(true);

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 16) }]}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={Color.colorBlack} />
        </Pressable>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notification Preferences</Text>
          
          <View style={styles.notifItem}>
            <View style={styles.notifLeft}>
              <View style={[styles.iconBox, { backgroundColor: '#e8f5e9' }]}>
                <Feather name="bell" size={20} color="#4caf50" />
              </View>
              <View>
                <Text style={styles.notifTitle}>Push Notifications</Text>
                <Text style={styles.notifDesc}>Receive alerts on your device</Text>
              </View>
            </View>
            <Switch
              value={pushNotifs}
              onValueChange={setPushNotifs}
              trackColor={{ false: "#e0e0e0", true: Color.colorRoyalblue }}
            />
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.notifItem}>
            <View style={styles.notifLeft}>
              <View style={[styles.iconBox, { backgroundColor: '#e3f2fd' }]}>
                <Feather name="mail" size={20} color="#2196f3" />
              </View>
              <View>
                <Text style={styles.notifTitle}>Email Notifications</Text>
                <Text style={styles.notifDesc}>Receive updates via email</Text>
              </View>
            </View>
            <Switch
              value={emailNotifs}
              onValueChange={setEmailNotifs}
              trackColor={{ false: "#e0e0e0", true: Color.colorRoyalblue }}
            />
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.notifItem}>
            <View style={styles.notifLeft}>
              <View style={[styles.iconBox, { backgroundColor: '#fff3e0' }]}>
                <Feather name="tag" size={20} color="#ff9800" />
              </View>
              <View>
                <Text style={styles.notifTitle}>Promotions & Offers</Text>
                <Text style={styles.notifDesc}>Get deals and discounts</Text>
              </View>
            </View>
            <Switch
              value={promoNotifs}
              onValueChange={setPromoNotifs}
              trackColor={{ false: "#e0e0e0", true: Color.colorRoyalblue }}
            />
          </View>
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Color.colorGainsboro },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingBottom: 16, backgroundColor: Color.colorGainsboro },
  backBtn: { width: 40, height: 40, justifyContent: "center" },
  headerTitle: { fontSize: 20, fontWeight: "800", color: Color.colorBlack, fontFamily: FontFamily.poppins },
  content: { padding: 20 },
  section: { backgroundColor: Color.colorWhite, borderRadius: Border.br_16, padding: 15, marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: "700", fontFamily: FontFamily.poppins, marginBottom: 15, color: Color.colorBlack },
  notifItem: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 12 },
  notifLeft: { flexDirection: "row", alignItems: "center", flex: 1 },
  iconBox: { width: 40, height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center", marginRight: 15 },
  notifTitle: { fontSize: 15, fontWeight: "600", fontFamily: FontFamily.poppins, color: Color.colorBlack },
  notifDesc: { fontSize: 12, fontFamily: FontFamily.inter, color: "#888", marginTop: 2 },
  divider: { height: 1, backgroundColor: "#f0f0f0", marginVertical: 5 },
});

export default NotificationsScreen;
