import * as React from "react";
import { StyleSheet, View, Text, Pressable, ScrollView, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Color, Border, FontFamily } from "../GlobalStyles";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

const mockHistory = [
  { id: '1', date: 'Oct 12, 2023', from: 'Swargate', to: 'Shivaji Nagar', status: 'Completed', amount: '₹15.00' },
  { id: '2', date: 'Sep 28, 2023', from: 'Katraj', to: 'Hinjewadi Phase 1', status: 'Completed', amount: '₹40.00' },
  { id: '3', date: 'Aug 15, 2023', from: 'Kothrud', to: 'Deccan Gymkhana', status: 'Cancelled', amount: '₹10.00' },
];

const TravelHistoryScreen = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const { themeColors } = useTheme();

  const renderItem = ({ item }: any) => (
    <View style={[styles.historyCard, { backgroundColor: themeColors.cardBackground, borderColor: themeColors.divider }]}>
      <View style={styles.cardHeader}>
        <Text style={[styles.dateText, { color: themeColors.subText }]}>{item.date}</Text>
        <Text style={[styles.statusText, { color: item.status === 'Completed' ? '#34c759' : '#ff3b30' }]}>
          {item.status}
        </Text>
      </View>

      <View style={styles.routeContainer}>
        <View style={styles.routeRow}>
          <MaterialCommunityIcons name="circle-slice-8" size={16} color={Color.colorRoyalblue} />
          <Text style={[styles.cityText, { color: themeColors.text }]}>{item.from}</Text>
        </View>
        <View style={[styles.routeLine, { backgroundColor: themeColors.divider }]} />
        <View style={styles.routeRow}>
          <MaterialCommunityIcons name="map-marker" size={16} color="#ef4242" />
          <Text style={[styles.cityText, { color: themeColors.text }]}>{item.to}</Text>
        </View>
      </View>

      <View style={[styles.cardFooter, { borderTopColor: themeColors.divider }]}>
        <Text style={[styles.amountText, { color: themeColors.text }]}>{item.amount}</Text>
        <Pressable style={[styles.viewTicketBtn, { backgroundColor: themeColors.elevatedBackground }]}> 
          <Text style={[styles.viewTicketText, { color: themeColors.primary }]}>View Details</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 16), backgroundColor: themeColors.headerBg }]}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={themeColors.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: themeColors.text }]}>Travel History</Text>
        <View style={styles.backBtn} />
      </View>

      <FlatList
        data={mockHistory}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingBottom: 16 },
  backBtn: { width: 40, height: 40, justifyContent: "center" },
  headerTitle: { fontSize: 20, fontWeight: "800", fontFamily: FontFamily.poppins },
  content: { padding: 20 },
  historyCard: { borderRadius: Border.br_16, padding: 16, marginBottom: 16, borderWidth: 1 },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 15 },
  dateText: { fontSize: 14, fontFamily: FontFamily.inter },
  statusText: { fontSize: 14, fontWeight: "700", fontFamily: FontFamily.poppins },
  routeContainer: { marginLeft: 5, paddingVertical: 5 },
  routeRow: { flexDirection: "row", alignItems: "center" },
  cityText: { fontSize: 16, fontWeight: "600", fontFamily: FontFamily.poppins, marginLeft: 10 },
  routeLine: { width: 2, height: 20, marginLeft: 7, marginVertical: 4 },
  cardFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 20, paddingTop: 15, borderTopWidth: 1 },
  amountText: { fontSize: 18, fontWeight: "800", fontFamily: FontFamily.poppins },
  viewTicketBtn: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20 },
  viewTicketText: { color: Color.colorRoyalblue, fontSize: 13, fontWeight: "700", fontFamily: FontFamily.poppins },
});

export default TravelHistoryScreen;
