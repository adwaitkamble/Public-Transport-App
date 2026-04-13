import * as React from "react";
import { ScrollView, StyleSheet, View, Text, TextInput, Pressable, Alert, ActivityIndicator } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FrameComponent2 from "../components/FrameComponent2";
import {
  Color,
  Border,
  FontFamily,
} from "../GlobalStyles";
import { Feather, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { bookTicket } from '../services/api';

const UpiAppIcon = ({ title, badgeText, color, icon, customSize }: any) => (
  <View style={styles.upiAppBox}>
    <View style={styles.upiIconContainer}>
      {icon ? icon : <Text style={[{ color, fontWeight: '900', fontSize: customSize || 16 }]}>{badgeText}</Text>}
    </View>
    <Text style={styles.upiIconLabel}>{title}</Text>
  </View>
);

const BankRow = ({ name, iconColor, letter, isSquare, isSlanted, isCircle }: any) => {
  return (
    <View style={styles.bankRow}>
      <View style={styles.bankIconWrapper}>
        {isSquare && (
          <View style={styles.hdfcIconBox}>
            <View style={[styles.hdfcInnerSquare, { backgroundColor: iconColor }]} />
          </View>
        )}
        {isCircle && (
          <View style={[styles.sbiCircle, { backgroundColor: iconColor }]}>
            <View style={styles.sbiKeyholeTop} />
            <View style={styles.sbiKeyholeBottom} />
          </View>
        )}
        {isSlanted && <Text style={[styles.bankLetterSlanted, { color: iconColor }]}>{letter}</Text>}
        {!isSquare && !isCircle && !isSlanted && (
          <Text style={[styles.bankLetter, { color: iconColor }]}>{letter}</Text>
        )}
      </View>
      <Text style={styles.bankName}>{name}</Text>
    </View>
  );
};

const TicketBooking = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const [paymentMethod, setPaymentMethod] = React.useState('upi');
  const [loading, setLoading] = React.useState(false);

  const handlePay = async () => {
    setLoading(true);
    try {
      const result = await bookTicket('daily_pass', 50, paymentMethod);
      Alert.alert('Success', result.message || 'Ticket booked successfully!', [
        { text: 'OK', onPress: () => navigation.navigate('Home') },
      ]);
    } catch (error: any) {
      Alert.alert('Payment Failed', error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 16) }]}>
        <Pressable onPress={() => navigation.canGoBack() ? navigation.goBack() : {}}>
          <Image
            style={styles.headerIcon}
            contentFit="contain"
            source={require("../assets/image-21.png")}
          />
        </Pressable>
        <Text style={styles.headerTitle}>Smart Bus</Text>
        <Pressable onPress={() => { }}>
          <Image
            style={styles.headerIcon}
            contentFit="contain"
            source={require("../assets/image-3.png")}
          />
        </Pressable>
      </View>

      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.pageTitle}>Payment Methods</Text>

        {/* DAILY PASS */}
        <View style={styles.card}>
          <View style={styles.rowBetweenBase}>
            <View style={styles.gap4}>
              <Text style={styles.cardTitle}>DAILY PASS</Text>
              <Text style={styles.cardSubText}>Valid: 24 HR</Text>
            </View>
            <View style={styles.alignEnd}>
              <View style={styles.iconRow}>
                <Feather name="edit" size={20} color="black" />
                <Feather name="info" size={20} color="black" />
              </View>
              <Text style={styles.priceText}>PRICE: ₹50.00</Text>
            </View>
          </View>
        </View>

        {/* UPI SECTION */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>UPI</Text>
          <View style={styles.upiLogoGroup}>
            <Text style={styles.upiLogoText}>UPI</Text>
            <FontAwesome5 name="caret-right" size={16} color="#03a124" style={styles.upiLogoCaret} />
          </View>
        </View>

        <View style={[styles.card, styles.upiCard]}>
          <View style={styles.upiInputArea}>
            <Text style={styles.upiInputLabel}>Enter UPI ID</Text>
            <TextInput
              style={styles.upiInputField}
              placeholder="e.g., name@bank"
              placeholderTextColor="#666"
            />
            <View style={styles.inputUnderline} />
            <Text style={styles.verifyLink}>Verify</Text>
          </View>

          <View style={styles.upiIconsArea}>
            <View style={styles.upiIconsRow}>
              <UpiAppIcon
                title="Google Pay"
                icon={
                  <View style={styles.gpayLogo}>
                    <Text style={{ color: '#4285F4', fontWeight: '900', fontSize: 18 }}>G</Text>
                  </View>
                }
              />
              <UpiAppIcon title="PhonePe" badgeText="पे" color="#6739B7" customSize={20} />
            </View>
            <View style={styles.upiIconsRow}>
              <UpiAppIcon title="Paytm" badgeText="paytm" color="#00B9F5" customSize={14} />
              <UpiAppIcon title="BHIM" badgeText="BHIM" color="#FF7A00" customSize={14} />
            </View>
          </View>
        </View>

        {/* NETBANKING SECTION */}
        <Text style={[styles.sectionTitle, styles.netbankingTitle]}>NETBANKING</Text>
        <View style={[styles.card, styles.paddedCard]}>
          <BankRow name="HDFC Bank" iconColor="#ed1b24" isSquare={true} />
          <BankRow name="ICICI Bank" iconColor="#f26522" letter="i" isSlanted={true} />
          <BankRow name="State Bank of India" iconColor="#005b9f" isCircle={true} />
          <BankRow name="Axis Bank" iconColor="#97144d" letter="A" />

          <View style={styles.viewAllRow}>
            <Text style={styles.viewAllText}>View All Banks</Text>
            <MaterialIcons name="arrow-drop-down" size={24} color="black" />
          </View>
        </View>

        {/* Space at the bottom */}
        <View style={{ height: 20 }} />
      </KeyboardAwareScrollView>

      {/* Floating Checkout Bar */}
      <View style={styles.checkoutBar}>
        <View style={styles.checkoutHeader}>
          <Text style={styles.totalText}>Total to Pay: ₹50.00</Text>
          <View style={styles.secureBadge}>
            <Feather name="lock" size={14} color="black" style={styles.lockIcon} />
            <Text style={styles.secureText}>SECURE CHECKOUT</Text>
          </View>
        </View>

        <Pressable style={[styles.proceedBtn, loading && { opacity: 0.7 }]} onPress={handlePay} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <Text style={styles.proceedBtnText}>PROCEED TO PAY</Text>
          )}
        </Pressable>
      </View>

      <FrameComponent2 />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorGainsboro,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: Color.colorGainsboro,
  },
  headerIcon: {
    width: 28,
    height: 28,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: Color.colorBlack,
    fontFamily: FontFamily.poppins,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: "900",
    fontFamily: FontFamily.poppins,
    color: Color.colorBlack,
    marginBottom: 20,
  },
  card: {
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_16,
    borderWidth: 1.5,
    borderColor: Color.colorBlack,
    padding: 16,
    marginBottom: 24,
  },
  rowBetweenBase: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  gap4: {
    gap: 4,
  },
  alignEnd: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "900",
    fontFamily: FontFamily.poppins,
    color: Color.colorBlack,
  },
  cardSubText: {
    fontSize: 16,
    fontFamily: FontFamily.inter,
    color: Color.colorBlack,
  },
  iconRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 8,
  },
  priceText: {
    fontSize: 18,
    fontWeight: "900",
    fontFamily: FontFamily.poppins,
    color: Color.colorBlack,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "900",
    fontFamily: FontFamily.poppins,
    color: Color.colorBlack,
    marginRight: 10,
  },
  upiLogoGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  upiLogoText: {
    fontSize: 20,
    fontStyle: "italic",
    fontWeight: "900",
    color: "#555",
  },
  upiLogoCaret: {
    marginLeft: 2,
  },
  upiCard: {
    flexDirection: "row",
    alignItems: "stretch",
    padding: 14,
  },
  upiInputArea: {
    flex: 1.2,
    paddingRight: 12,
  },
  upiInputLabel: {
    fontSize: 15,
    fontWeight: "900",
    fontFamily: FontFamily.poppins,
    color: Color.colorBlack,
    marginBottom: 12,
  },
  upiInputField: {
    fontSize: 15,
    fontFamily: FontFamily.inter,
    color: Color.colorBlack,
    paddingVertical: 2,
  },
  inputUnderline: {
    height: 1,
    backgroundColor: Color.colorBlack,
    opacity: 0.3,
    marginTop: 2,
    marginBottom: 8,
  },
  verifyLink: {
    textAlign: "right",
    fontSize: 13,
    fontFamily: FontFamily.inter,
    textDecorationLine: "underline",
    color: Color.colorBlack,
  },
  upiIconsArea: {
    flex: 1.2,
    gap: 12,
    paddingLeft: 8,
  },
  upiIconsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  upiAppBox: {
    alignItems: "center",
    width: "48%",
  },
  upiIconContainer: {
    width: "100%",
    height: 40,
    borderRadius: Border.br_8,
    borderWidth: 1,
    borderColor: Color.colorBlack,
    backgroundColor: "#f5f8ff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  gpayLogo: {
    flexDirection: "row",
  },
  upiIconLabel: {
    fontSize: 11,
    fontFamily: FontFamily.inter,
    color: Color.colorBlack,
    textAlign: "center",
  },
  netbankingTitle: {
    marginBottom: 12,
  },
  paddedCard: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  bankRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  bankIconWrapper: {
    width: 32,
    height: 32,
    marginRight: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  hdfcIconBox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#004b8f",
    alignItems: "center",
    justifyContent: "center",
  },
  hdfcInnerSquare: {
    width: 8,
    height: 8,
  },
  sbiCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    position: "relative",
  },
  sbiKeyholeTop: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "white",
    position: "absolute",
    top: 6,
  },
  sbiKeyholeBottom: {
    width: 4,
    height: 10,
    backgroundColor: "white",
    position: "absolute",
    bottom: -1,
  },
  bankLetterSlanted: {
    fontWeight: "900",
    fontSize: 26,
    fontStyle: "italic",
  },
  bankLetter: {
    fontWeight: "900",
    fontSize: 24,
  },
  bankName: {
    fontSize: 16,
    fontFamily: FontFamily.poppins,
    fontWeight: "900",
    color: Color.colorBlack,
  },
  viewAllRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 8,
  },
  viewAllText: {
    fontSize: 14,
    fontFamily: FontFamily.inter,
    color: Color.colorBlack,
    marginRight: -4,
  },
  checkoutBar: {
    backgroundColor: Color.colorWhite,
    borderTopLeftRadius: Border.br_16,
    borderTopRightRadius: Border.br_16,
    borderWidth: 1.5,
    borderColor: Color.colorBlack,
    borderBottomWidth: 0,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  checkoutHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  totalText: {
    fontSize: 18,
    fontFamily: FontFamily.poppins,
    fontWeight: "900",
    color: Color.colorBlack,
  },
  secureBadge: {
    flexDirection: "row",
    alignItems: "center",
  },
  lockIcon: {
    marginRight: 4,
  },
  secureText: {
    fontSize: 12,
    fontFamily: FontFamily.inter,
    fontWeight: "900",
    color: Color.colorBlack,
  },
  proceedBtn: {
    backgroundColor: Color.colorRoyalblue,
    borderRadius: Border.br_12,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: Color.colorBlack,
  },
  proceedBtnText: {
    color: Color.colorWhite,
    fontSize: 18,
    fontFamily: FontFamily.poppins,
    fontWeight: "900",
  },
});

export default TicketBooking;
