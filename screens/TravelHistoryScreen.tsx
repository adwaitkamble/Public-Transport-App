import * as React from "react";
import { StyleSheet, View, Text, Pressable, FlatList, ActivityIndicator } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Color, Border, FontFamily } from "../GlobalStyles";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "../context/ThemeContext";
import { getMyTickets } from "../services/api";

const TravelHistoryScreen = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const { themeColors } = useAppTheme();
  const [tickets, setTickets] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const data = await getMyTickets();
      setTickets(data);
    } catch (error) {
      console.log("Failed to fetch tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: any) => {
    const isDailyPass = item.ticketType === 'daily_pass';
    const dateStr = new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
    // Determine status color
    let statusColor = '#34c759'; // active/completed
    if (item.status === 'expired') statusColor = themeColors.subText;
    if (item.status === 'cancelled') statusColor = '#ff3b30';

    return (
    <View style={[styles.historyCard, { backgroundColor: themeColors.cardBackground, borderColor: themeColors.divider }]}>
      <View style={styles.cardHeader}>
        <Text style={[styles.dateText, { color: themeColors.subText }]}>{dateStr}</Text>
        <Text style={[styles.statusText, { color: statusColor, textTransform: 'capitalize' }]}>
          {item.status}
        </Text>
      </View>

      <View style={styles.routeContainer}>
        <View style={styles.routeRow}>
          <MaterialCommunityIcons name={isDailyPass ? "ticket-percent" : "circle-slice-8"} size={16} color={Color.colorRoyalblue} />
          <Text style={[styles.cityText, { color: themeColors.text }]}>{isDailyPass ? "Daily Pass" : "Single Ticket"}</Text>
        </View>
        <View style={[styles.routeLine, { backgroundColor: themeColors.divider }]} />
        <View style={styles.routeRow}>
          <MaterialCommunityIcons name={isDailyPass ? "infinity" : "map-marker"} size={16} color="#ef4242" />
          <Text style={[styles.cityText, { color: themeColors.text }]}>{isDailyPass ? "Valid Everywhere (24 Hrs)" : "Valid for 2 Hours"}</Text>
        </View>
      </View>

      <View style={[styles.cardFooter, { borderTopColor: themeColors.divider }]}>
        <Text style={[styles.amountText, { color: themeColors.text }]}>₹{item.price.toFixed(2)}</Text>
        <Pressable style={[styles.viewTicketBtn, { backgroundColor: themeColors.elevatedBackground }]}> 
          <Text style={[styles.viewTicketText, { color: themeColors.primary }]}>View Details</Text>
        </Pressable>
      </View>
    </View>
  );
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 16), backgroundColor: themeColors.headerBg }]}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={themeColors.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: themeColors.text }]}>Travel History</Text>
        <View style={styles.backBtn} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={Color.colorRoyalblue} style={{ marginTop: 40 }} />
      ) : tickets.length === 0 ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: themeColors.subText, fontSize: 16 }}>No tickets found</Text>
        </View>
      ) : (
        <FlatList
          data={tickets}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          refreshing={loading}
          onRefresh={fetchHistory}
        />
      )}
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
