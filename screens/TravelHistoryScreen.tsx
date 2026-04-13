import * as React from "react";
import { StyleSheet, View, Text, Pressable, ScrollView, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Color, Border, FontFamily } from "../GlobalStyles";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const mockHistory = [
  { id: '1', date: 'Oct 12, 2023', from: 'Mumbai', to: 'Pune', status: 'Completed', amount: '₹1500.00' },
  { id: '2', date: 'Sep 28, 2023', from: 'Pune', to: 'Goa', status: 'Completed', amount: '₹4500.00' },
  { id: '3', date: 'Aug 15, 2023', from: 'Mumbai', to: 'Nashik', status: 'Cancelled', amount: '₹1200.00' },
];

const TravelHistoryScreen = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  const renderItem = ({ item }: any) => (
    <View style={styles.historyCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.dateText}>{item.date}</Text>
        <Text style={[styles.statusText, { color: item.status === 'Completed' ? '#34c759' : '#ff3b30' }]}>
          {item.status}
        </Text>
      </View>

      <View style={styles.routeContainer}>
        <View style={styles.routeRow}>
          <MaterialCommunityIcons name="circle-slice-8" size={16} color={Color.colorRoyalblue} />
          <Text style={styles.cityText}>{item.from}</Text>
        </View>
        <View style={styles.routeLine} />
        <View style={styles.routeRow}>
          <MaterialCommunityIcons name="map-marker" size={16} color="#ef4242" />
          <Text style={styles.cityText}>{item.to}</Text>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <Text style={styles.amountText}>{item.amount}</Text>
        <Pressable style={styles.viewTicketBtn}>
          <Text style={styles.viewTicketText}>View Details</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 16) }]}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={Color.colorBlack} />
        </Pressable>
        <Text style={styles.headerTitle}>Travel History</Text>
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
  container: { flex: 1, backgroundColor: Color.colorGainsboro },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingBottom: 16, backgroundColor: Color.colorGainsboro },
  backBtn: { width: 40, height: 40, justifyContent: "center" },
  headerTitle: { fontSize: 20, fontWeight: "800", color: Color.colorBlack, fontFamily: FontFamily.poppins },
  content: { padding: 20 },
  historyCard: { backgroundColor: Color.colorWhite, borderRadius: Border.br_16, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: "#e0e0e0" },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 15 },
  dateText: { fontSize: 14, fontFamily: FontFamily.inter, color: "#666" },
  statusText: { fontSize: 14, fontWeight: "700", fontFamily: FontFamily.poppins },
  routeContainer: { marginLeft: 5, paddingVertical: 5 },
  routeRow: { flexDirection: "row", alignItems: "center" },
  cityText: { fontSize: 16, fontWeight: "600", fontFamily: FontFamily.poppins, color: Color.colorBlack, marginLeft: 10 },
  routeLine: { width: 2, height: 20, backgroundColor: "#ccc", marginLeft: 7, marginVertical: 4 },
  cardFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 20, paddingTop: 15, borderTopWidth: 1, borderTopColor: "#f0f0f0" },
  amountText: { fontSize: 18, fontWeight: "800", fontFamily: FontFamily.poppins, color: Color.colorBlack },
  viewTicketBtn: { backgroundColor: "#ebf1fb", paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20 },
  viewTicketText: { color: Color.colorRoyalblue, fontSize: 13, fontWeight: "700", fontFamily: FontFamily.poppins },
});

export default TravelHistoryScreen;
