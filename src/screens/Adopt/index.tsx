import React, { FC, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Switch,
  Modal,
} from 'react-native';
import { useAppStore } from '../../hooks';
import { AppTheme } from '@react-navigation/native';
import { ScreenProps } from '../../navigation/types';

const AdoptScreen: FC<ScreenProps> = ({ navigation }) => {
  const { theme } = useAppStore();
  const styles = adoptScreenStyle(theme);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    petType: '',
    petName: '',
    experience: '',
    livingSpace: '',
    otherPets: '',
    workSchedule: '',
    emergencyContact: '',
    emergencyPhone: '',
    additionalInfo: '',
  });

  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: '',
    billingCity: '',
    billingZip: '',
  });

  const [showPayment, setShowPayment] = useState(false);
  const [adoptionFee, setAdoptionFee] = useState(150);
  const [donationAmount, setDonationAmount] = useState(0);
  const [addDonation, setAddDonation] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePaymentChange = (field, value) => {
    setPaymentData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const formatExpiryDate = text => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  const validateForm = () => {
    if (!formData.fullName || !formData.email || !formData.phone) {
      Alert.alert('Error', 'Please fill in all required fields');
      return false;
    }
    return true;
  };

  const validatePayment = () => {
    if (
      !paymentData.cardNumber ||
      !paymentData.expiryDate ||
      !paymentData.cvv ||
      !paymentData.cardholderName
    ) {
      Alert.alert('Payment Error', 'Please fill in all payment details');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    setShowPayment(true);
  };

  const simulatePayment = () => {
    if (!validatePayment()) return;

    setProcessingPayment(true);

    setTimeout(() => {
      setProcessingPayment(false);
      setShowPayment(false);

      Alert.alert(
        'Payment Successful!',
        `Your adoption application has been submitted and payment of $${(
          adoptionFee + donationAmount
        ).toFixed(
          2,
        )} has been processed. We will contact you soon to schedule a meet and greet!`,
        [
          {
            text: 'OK',
            onPress: () =>
              navigation.reset({
                index: 1,
                routes: [{ name: 'HOME' }],
              }),
          },
        ],
      );
    }, 2000);
  };

  const totalAmount = adoptionFee + (addDonation ? donationAmount : 0);

  const renderPersonalInfoSection = () => (
    <View>
      <Text style={styles.sectionTitle}>Personal Information</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name *"
        value={formData.fullName}
        onChangeText={text => handleInputChange('fullName', text)}
        placeholderTextColor="#999"
      />

      <TextInput
        style={styles.input}
        placeholder="Email Address *"
        value={formData.email}
        onChangeText={text => handleInputChange('email', text)}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#999"
      />

      <TextInput
        style={styles.input}
        placeholder="Phone Number *"
        value={formData.phone}
        onChangeText={text => handleInputChange('phone', text)}
        keyboardType="phone-pad"
        placeholderTextColor="#999"
      />

      <TextInput
        style={styles.input}
        placeholder="Home Address"
        value={formData.address}
        onChangeText={text => handleInputChange('address', text)}
        placeholderTextColor="#999"
      />

      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="City"
          value={formData.city}
          onChangeText={text => handleInputChange('city', text)}
          placeholderTextColor="#999"
        />
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="ZIP Code"
          value={formData.zipCode}
          onChangeText={text => handleInputChange('zipCode', text)}
          keyboardType="numeric"
          placeholderTextColor="#999"
        />
      </View>
    </View>
  );

  const renderPetInfoSection = () => (
    <View>
      <Text style={styles.sectionTitle}>Pet Information</Text>

      <TextInput
        style={styles.input}
        placeholder="Preferred Pet Type (Dog, Cat, etc.)"
        value={formData.petType}
        onChangeText={text => handleInputChange('petType', text)}
        placeholderTextColor="#999"
      />

      <TextInput
        style={styles.input}
        placeholder="Specific Pet Name (if applicable)"
        value={formData.petName}
        onChangeText={text => handleInputChange('petName', text)}
        placeholderTextColor="#999"
      />
    </View>
  );

  const renderLivingSituationSection = () => (
    <View>
      <Text style={styles.sectionTitle}>Living Situation</Text>

      <TextInput
        style={styles.textArea}
        placeholder="Describe your living space (apartment, house, yard, etc.)"
        value={formData.livingSpace}
        onChangeText={text => handleInputChange('livingSpace', text)}
        multiline
        numberOfLines={3}
        placeholderTextColor="#999"
      />

      <TextInput
        style={styles.textArea}
        placeholder="Do you have other pets? Please describe"
        value={formData.otherPets}
        onChangeText={text => handleInputChange('otherPets', text)}
        multiline
        numberOfLines={3}
        placeholderTextColor="#999"
      />

      <TextInput
        style={styles.textArea}
        placeholder="What is your work schedule? How many hours will the pet be alone?"
        value={formData.workSchedule}
        onChangeText={text => handleInputChange('workSchedule', text)}
        multiline
        numberOfLines={3}
        placeholderTextColor="#999"
      />
    </View>
  );

  const renderExperienceSection = () => (
    <View>
      <Text style={styles.sectionTitle}>Experience & Emergency Contact</Text>

      <TextInput
        style={styles.textArea}
        placeholder="Previous pet experience"
        value={formData.experience}
        onChangeText={text => handleInputChange('experience', text)}
        multiline
        numberOfLines={3}
        placeholderTextColor="#999"
      />

      <TextInput
        style={styles.input}
        placeholder="Emergency Contact Name"
        value={formData.emergencyContact}
        onChangeText={text => handleInputChange('emergencyContact', text)}
        placeholderTextColor="#999"
      />

      <TextInput
        style={styles.input}
        placeholder="Emergency Contact Phone"
        value={formData.emergencyPhone}
        onChangeText={text => handleInputChange('emergencyPhone', text)}
        keyboardType="phone-pad"
        placeholderTextColor="#999"
      />

      <TextInput
        style={styles.textArea}
        placeholder="Additional information or questions"
        value={formData.additionalInfo}
        onChangeText={text => handleInputChange('additionalInfo', text)}
        multiline
        numberOfLines={4}
        placeholderTextColor="#999"
      />
    </View>
  );

  const renderDonationSection = () => (
    <View>
      <Text style={styles.sectionTitle}>Adoption Fee & Donation</Text>

      <View style={styles.feeContainer}>
        <View style={styles.feeRow}>
          <Text style={styles.feeLabel}>Adoption Fee:</Text>
          <Text style={styles.feeAmount}>${adoptionFee.toFixed(2)}</Text>
        </View>

        <View style={styles.donationRow}>
          <View style={styles.donationToggle}>
            <Text style={styles.donationLabel}>Add Donation:</Text>
            <Switch
              value={addDonation}
              onValueChange={setAddDonation}
              trackColor={{ false: '#767577', true: '#4CAF50' }}
              thumbColor={addDonation ? '#ffffff' : '#f4f3f4'}
            />
          </View>

          {addDonation && (
            <View style={styles.donationAmountContainer}>
              <Text style={styles.donationAmountLabel}>Donation Amount:</Text>

              <View style={styles.donationButtons}>
                {[10, 25, 50, 100].map(amount => (
                  <TouchableOpacity
                    key={amount}
                    style={[
                      styles.donationButton,
                      donationAmount === amount && styles.donationButtonActive,
                    ]}
                    onPress={() => setDonationAmount(amount)}
                  >
                    <Text
                      style={[
                        styles.donationButtonText,
                        donationAmount === amount &&
                          styles.donationButtonTextActive,
                      ]}
                    >
                      ${amount}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TextInput
                style={styles.customDonationInput}
                placeholder="Custom amount"
                value={
                  donationAmount > 0 &&
                  ![10, 25, 50, 100].includes(donationAmount)
                    ? donationAmount.toString()
                    : ''
                }
                onChangeText={text => setDonationAmount(parseFloat(text) || 0)}
                keyboardType="numeric"
                placeholderTextColor="#999"
              />
            </View>
          )}
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalAmount}>${totalAmount.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );

  const renderPaymentModal = () => (
    <Modal
      visible={showPayment}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Payment Information</Text>
          <TouchableOpacity onPress={() => setShowPayment(false)}>
            <Text style={styles.modalClose}>Cancel</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent}>
          <View style={styles.paymentSummary}>
            <Text style={styles.paymentSummaryTitle}>Payment Summary</Text>

            <View style={styles.summaryRow}>
              <Text>Adoption Fee:</Text>
              <Text>${adoptionFee.toFixed(2)}</Text>
            </View>

            {addDonation && (
              <View style={styles.summaryRow}>
                <Text>Donation:</Text>
                <Text>${donationAmount.toFixed(2)}</Text>
              </View>
            )}

            <View style={[styles.summaryRow, styles.totalSummaryRow]}>
              <Text style={styles.totalSummaryText}>Total:</Text>
              <Text style={styles.totalSummaryText}>
                ${totalAmount.toFixed(2)}
              </Text>
            </View>
          </View>

          <Text style={styles.paymentSectionTitle}>Card Information</Text>

          <TextInput
            style={styles.input}
            placeholder="Cardholder Name"
            value={paymentData.cardholderName}
            onChangeText={text => handlePaymentChange('cardholderName', text)}
            placeholderTextColor="#999"
          />

          <TextInput
            style={styles.input}
            placeholder="Card Number"
            value={paymentData.cardNumber}
            onChangeText={text => handlePaymentChange('cardNumber', text)}
            keyboardType="numeric"
            maxLength={19}
            placeholderTextColor="#999"
          />

          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="MM/YY"
              value={paymentData.expiryDate}
              onChangeText={text =>
                handlePaymentChange('expiryDate', formatExpiryDate(text))
              }
              keyboardType="numeric"
              maxLength={5}
              placeholderTextColor="#999"
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="CVV"
              value={paymentData.cvv}
              onChangeText={text => handlePaymentChange('cvv', text)}
              keyboardType="numeric"
              maxLength={4}
              secureTextEntry
              placeholderTextColor="#999"
            />
          </View>

          <Text style={styles.paymentSectionTitle}>Billing Address</Text>

          <TextInput
            style={styles.input}
            placeholder="Billing Address"
            value={paymentData.billingAddress}
            onChangeText={text => handlePaymentChange('billingAddress', text)}
            placeholderTextColor="#999"
          />

          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="City"
              value={paymentData.billingCity}
              onChangeText={text => handlePaymentChange('billingCity', text)}
              placeholderTextColor="#999"
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="ZIP Code"
              value={paymentData.billingZip}
              onChangeText={text => handlePaymentChange('billingZip', text)}
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
          </View>

          <TouchableOpacity
            style={[
              styles.paymentButton,
              processingPayment && styles.paymentButtonDisabled,
            ]}
            onPress={simulatePayment}
            disabled={processingPayment}
          >
            <Text style={styles.paymentButtonText}>
              {processingPayment
                ? 'Processing...'
                : `Pay $${totalAmount.toFixed(2)}`}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Pet Adoption Application</Text>
          <Text style={styles.subtitle}>
            Help us find the perfect match for you and your new pet!
          </Text>
        </View>

        <View style={styles.form}>
          {renderPersonalInfoSection()}
          {renderPetInfoSection()}
          {renderLivingSituationSection()}
          {renderExperienceSection()}
          {renderDonationSection()}

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Proceed to Payment</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {renderPaymentModal()}
    </KeyboardAvoidingView>
  );
};

const adoptScreenStyle = ({ colors }: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollView: {
      flex: 1,
    },
    header: {
      backgroundColor: colors.primary,
      paddingTop: 60,
      paddingBottom: 30,
      paddingHorizontal: 20,
      alignItems: 'center',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: 'white',
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: '#e8f5e8',
      textAlign: 'center',
      lineHeight: 22,
    },
    form: {
      padding: 20,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: '#333',
      marginTop: 20,
      marginBottom: 15,
      borderBottomWidth: 2,
      borderBottomColor: colors.secondary,
      paddingBottom: 5,
    },
    input: {
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      padding: 15,
      fontSize: 16,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    textArea: {
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      padding: 15,
      fontSize: 16,
      marginBottom: 12,
      minHeight: 80,
      textAlignVertical: 'top',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    halfInput: {
      width: '48%',
    },
    feeContainer: {
      backgroundColor: 'white',
      borderRadius: 8,
      padding: 20,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    feeRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    feeLabel: {
      fontSize: 16,
      color: '#333',
    },
    feeAmount: {
      fontSize: 16,
      fontWeight: '600',
      color: '#333',
    },
    donationRow: {
      marginVertical: 15,
    },
    donationToggle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 15,
    },
    donationLabel: {
      fontSize: 16,
      color: '#333',
    },
    donationAmountContainer: {
      marginTop: 10,
    },
    donationAmountLabel: {
      fontSize: 14,
      color: '#666',
      marginBottom: 10,
    },
    donationButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    donationButton: {
      flex: 1,
      backgroundColor: '#f0f0f0',
      padding: 12,
      borderRadius: 6,
      marginHorizontal: 2,
      alignItems: 'center',
    },
    donationButtonActive: {
      backgroundColor: colors.primary,
    },
    donationButtonText: {
      color: '#333',
      fontWeight: '600',
    },
    donationButtonTextActive: {
      color: 'white',
    },
    customDonationInput: {
      backgroundColor: '#f8f9fa',
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 6,
      padding: 10,
      fontSize: 14,
    },
    totalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 15,
      borderTopWidth: 1,
      borderTopColor: '#eee',
    },
    totalLabel: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
    },
    totalAmount: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.primary,
    },
    submitButton: {
      backgroundColor: colors.primary,
      paddingVertical: 16,
      paddingHorizontal: 32,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 40,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    submitButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    modalContainer: {
      flex: 1,
      backgroundColor: '#f8f9fa',
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      paddingTop: 60,
      backgroundColor: colors.primary,
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
    },
    modalClose: {
      fontSize: 16,
      color: 'white',
    },
    modalContent: {
      flex: 1,
      padding: 20,
    },
    paymentSummary: {
      backgroundColor: 'white',
      borderRadius: 8,
      padding: 20,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    paymentSummaryTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 15,
      color: '#333',
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    totalSummaryRow: {
      borderTopWidth: 1,
      borderTopColor: '#eee',
      paddingTop: 10,
      marginTop: 10,
    },
    totalSummaryText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
    },
    paymentSectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: '#333',
      marginBottom: 15,
      marginTop: 10,
    },
    paymentButton: {
      backgroundColor: colors.primary,
      paddingVertical: 16,
      paddingHorizontal: 32,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 40,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    paymentButtonDisabled: {
      backgroundColor: '#cccccc',
    },
    paymentButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });

export default AdoptScreen;
