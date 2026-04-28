import * as React from "react";
import { StyleSheet, View, Text, Pressable, ScrollView, TextInput, ActivityIndicator, Alert, KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Color, Border, FontFamily } from "../GlobalStyles";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useAppTheme } from "../context/ThemeContext";

const faqs = [
  { id: 1, question: "How do I cancel my ticket?", answer: "You can cancel your ticket by navigating to the Travel History section, selecting your active ticket, and pressing the 'Cancel' button at the bottom." },
  { id: 2, question: "Where is my bus?", answer: "Go to the Map or Route screen to track your bus in real-time. You will see its live location marker update as it moves." },
  { id: 3, question: "Payment got deducted but no ticket?", answer: "Please wait 5-10 minutes for our system to sync. If the ticket still doesn't appear in 'Travel History', your payment will be automatically refunded within 3-5 business days." },
];

const HelpSupportScreen = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const { themeColors } = useAppTheme();
  const [message, setMessage] = React.useState("");
  const [expandedFaq, setExpandedFaq] = React.useState<number | null>(null);
  const [isSending, setIsSending] = React.useState(false);

  const toggleFaq = (id: number) => {
    if (expandedFaq === id) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(id);
    }
  };

  const handleSendMessage = () => {
    if (!message.trim()) {
      Alert.alert("Wait a second!", "Please enter a message before submitting.");
      return;
    }

    Keyboard.dismiss();
    setIsSending(true);

    // Mock an API Network call taking 1.5 seconds
    setTimeout(() => {
      setIsSending(false);
      setMessage("");
      Alert.alert(
        "Message Sent!", 
        "Your request has been successfully submitted to our support team. We will respond via email shortly."
      );
    }, 1500);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={[styles.container, { backgroundColor: themeColors.background }]}> 
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 16), backgroundColor: themeColors.headerBg }]}> 
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={themeColors.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: themeColors.text }]}>Help & Support</Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={[styles.contactCard, { backgroundColor: themeColors.cardBackground, borderColor: themeColors.divider }] }>
          <Feather name="headphones" size={32} color={Color.colorRoyalblue} style={{ marginBottom: 10 }} />
          <Text style={[styles.contactTitle, { color: themeColors.text }]}>How can we help?</Text>
          <Text style={[styles.contactSubtitle, { color: themeColors.subText }]}>We are here to help you 24/7</Text>
        </View>

        <View style={[styles.faqSection, { backgroundColor: themeColors.cardBackground, borderColor: themeColors.divider }] }>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Frequently Asked Questions</Text>
          
          {faqs.map((faq, index) => (
            <View key={faq.id}>
              <Pressable style={styles.faqItem} onPress={() => toggleFaq(faq.id)}>
                <Text style={[styles.faqText, { color: themeColors.text }]}>{faq.question}</Text>
                <Feather 
                  name={expandedFaq === faq.id ? "chevron-up" : "chevron-down"} 
                  size={20} 
                  color={themeColors.subText} 
                />
              </Pressable>
              
              {expandedFaq === faq.id && (
                <View style={styles.faqAnswerContainer}>
                  <Text style={[styles.faqAnswerText, { color: themeColors.subText }]}>{faq.answer}</Text>
                </View>
              )}
              {index < faqs.length - 1 && <View style={[styles.divider, { backgroundColor: themeColors.divider }]} />}
            </View>
          ))}
        </View>

        <View style={[styles.messageSection, { backgroundColor: themeColors.cardBackground, borderColor: themeColors.divider }] }>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Send us a message</Text>
          <View style={[styles.inputContainer, { backgroundColor: themeColors.elevatedBackground, borderColor: themeColors.divider }] }>
            <TextInput
              style={[styles.input, { color: themeColors.text }]}
              placeholder="Describe your issue in detail..."
              placeholderTextColor={themeColors.subText}
              multiline
              numberOfLines={4}
              value={message}
              onChangeText={setMessage}
              textAlignVertical="top"
              editable={!isSending}
            />
          </View>
          <Pressable 
            style={[styles.sendButton, isSending && styles.sendButtonDisabled]} 
            onPress={handleSendMessage}
            disabled={isSending}
          >
            {isSending ? (
              <ActivityIndicator color={Color.colorWhite} />
            ) : (
              <Text style={styles.sendButtonText}>Send Message</Text>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingBottom: 16 },
  backBtn: { width: 40, height: 40, justifyContent: "center" },
  headerTitle: { fontSize: 20, fontWeight: "800", fontFamily: FontFamily.poppins },
  content: { padding: 20 },
  contactCard: { borderRadius: Border.br_16, padding: 20, alignItems: "center", marginBottom: 20, borderWidth: 1 },
  contactTitle: { fontSize: 18, fontWeight: "800", fontFamily: FontFamily.poppins },
  contactSubtitle: { fontSize: 14, fontFamily: FontFamily.inter, marginTop: 5 },
  faqSection: { borderRadius: Border.br_16, padding: 15, marginBottom: 20, borderWidth: 1 },
  sectionTitle: { fontSize: 16, fontWeight: "700", fontFamily: FontFamily.poppins, marginBottom: 15 },
  faqItem: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 12 },
  faqText: { fontSize: 15, fontFamily: FontFamily.inter, flex: 1, paddingRight: 10 },
  faqAnswerContainer: { paddingBottom: 12, paddingRight: 20 },
  faqAnswerText: { fontSize: 14, fontFamily: FontFamily.inter, lineHeight: 20 },
  divider: { height: 1 },
  messageSection: { borderRadius: Border.br_16, padding: 15, marginBottom: 30, borderWidth: 1 },
  inputContainer: { borderWidth: 1, borderRadius: Border.br_12, padding: 12, marginBottom: 15 },
  input: { minHeight: 100, fontSize: 15, fontFamily: FontFamily.inter },
  sendButton: { backgroundColor: Color.colorRoyalblue, borderRadius: Border.br_12, paddingVertical: 14, alignItems: "center" },
  sendButtonDisabled: { opacity: 0.7 },
  sendButtonText: { color: Color.colorWhite, fontSize: 16, fontWeight: "800", fontFamily: FontFamily.poppins },
});

export default HelpSupportScreen;
