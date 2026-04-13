import * as React from "react";
import { StyleSheet, View, Text, Pressable, ScrollView, TextInput, ActivityIndicator, Alert, KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Color, Border, FontFamily } from "../GlobalStyles";
import { Ionicons, Feather } from "@expo/vector-icons";

const faqs = [
  { id: 1, question: "How do I cancel my ticket?", answer: "You can cancel your ticket by navigating to the Travel History section, selecting your active ticket, and pressing the 'Cancel' button at the bottom." },
  { id: 2, question: "Where is my bus?", answer: "Go to the Map or Route screen to track your bus in real-time. You will see its live location marker update as it moves." },
  { id: 3, question: "Payment got deducted but no ticket?", answer: "Please wait 5-10 minutes for our system to sync. If the ticket still doesn't appear in 'Travel History', your payment will be automatically refunded within 3-5 business days." },
];

const HelpSupportScreen = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
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
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 16) }]}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={Color.colorBlack} />
        </Pressable>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.contactCard}>
          <Feather name="headphones" size={32} color={Color.colorRoyalblue} style={{ marginBottom: 10 }} />
          <Text style={styles.contactTitle}>How can we help?</Text>
          <Text style={styles.contactSubtitle}>We are here to help you 24/7</Text>
        </View>

        <View style={styles.faqSection}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          
          {faqs.map((faq, index) => (
            <View key={faq.id}>
              <Pressable style={styles.faqItem} onPress={() => toggleFaq(faq.id)}>
                <Text style={styles.faqText}>{faq.question}</Text>
                <Feather 
                  name={expandedFaq === faq.id ? "chevron-up" : "chevron-down"} 
                  size={20} 
                  color="#888" 
                />
              </Pressable>
              
              {expandedFaq === faq.id && (
                <View style={styles.faqAnswerContainer}>
                  <Text style={styles.faqAnswerText}>{faq.answer}</Text>
                </View>
              )}
              {index < faqs.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>

        <View style={styles.messageSection}>
          <Text style={styles.sectionTitle}>Send us a message</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Describe your issue in detail..."
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
  container: { flex: 1, backgroundColor: Color.colorGainsboro },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingBottom: 16, backgroundColor: Color.colorGainsboro },
  backBtn: { width: 40, height: 40, justifyContent: "center" },
  headerTitle: { fontSize: 20, fontWeight: "800", color: Color.colorBlack, fontFamily: FontFamily.poppins },
  content: { padding: 20 },
  contactCard: { backgroundColor: Color.colorWhite, borderRadius: Border.br_16, padding: 20, alignItems: "center", marginBottom: 20 },
  contactTitle: { fontSize: 18, fontWeight: "800", fontFamily: FontFamily.poppins, color: Color.colorBlack },
  contactSubtitle: { fontSize: 14, fontFamily: FontFamily.inter, color: "#888", marginTop: 5 },
  faqSection: { backgroundColor: Color.colorWhite, borderRadius: Border.br_16, padding: 15, marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: "700", fontFamily: FontFamily.poppins, marginBottom: 15, color: Color.colorBlack },
  faqItem: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 12 },
  faqText: { fontSize: 15, fontFamily: FontFamily.inter, color: Color.colorBlack, flex: 1, paddingRight: 10 },
  faqAnswerContainer: { paddingBottom: 12, paddingRight: 20 },
  faqAnswerText: { fontSize: 14, fontFamily: FontFamily.inter, color: "#666", lineHeight: 20 },
  divider: { height: 1, backgroundColor: "#f0f0f0" },
  messageSection: { backgroundColor: Color.colorWhite, borderRadius: Border.br_16, padding: 15, marginBottom: 30 },
  inputContainer: { borderWidth: 1, borderColor: "#e0e0e0", borderRadius: Border.br_12, padding: 12, backgroundColor: "#fafafa", marginBottom: 15 },
  input: { minHeight: 100, fontSize: 15, fontFamily: FontFamily.inter },
  sendButton: { backgroundColor: Color.colorRoyalblue, borderRadius: Border.br_12, paddingVertical: 14, alignItems: "center" },
  sendButtonDisabled: { opacity: 0.7 },
  sendButtonText: { color: Color.colorWhite, fontSize: 16, fontWeight: "800", fontFamily: FontFamily.poppins },
});

export default HelpSupportScreen;
