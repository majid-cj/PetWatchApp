import React, { FC } from 'react';
import { Image, Pressable, StyleSheet, View, Text } from 'react-native';
import { AppTheme, useNavigation } from '@react-navigation/native';

import { Pets } from '../../models/pets';
import { SubTitle } from '../texts';
import { Spacer } from '../ui';
import { useAppStore } from '../../../hooks';

interface PetPreviewProps {
  pet: Pets;
}

export const PetPreview: FC<PetPreviewProps> = ({ pet }) => {
  const { navigate } = useNavigation();
  const { theme } = useAppStore();
  const styles = petPreviewStyles(theme);
  const { url, breeds } = pet;
  const { name, origin, weight, life_span } = breeds[0];

  const handleOnPress = () => {
    navigate('PET_DETAIL', {
      pets: pet,
    });
  };

  return (
    <React.Fragment>
      <Pressable
        onPress={handleOnPress}
        style={styles.container}
        android_ripple={{ color: 'rgba(0,0,0,0.1)' }}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: url }}
            style={styles.image}
            resizeMode={'cover'}
          />
          <View style={styles.imageOverlay} />
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.headerRow}>
            <SubTitle text={name} />
            <View style={styles.lifespanBadge}>
              <Text style={styles.lifespanText}>{life_span} years</Text>
            </View>
          </View>

          <View style={styles.locationRow}>
            <View style={styles.locationIcon}>
              <Text style={styles.locationIconText}>📍</Text>
            </View>
            <Text style={styles.originText}>{origin}</Text>
          </View>

          <View style={styles.weightContainer}>
            <View style={styles.weightCard}>
              <Text style={styles.weightLabel}>Weight Range</Text>
              <View style={styles.weightRow}>
                <View style={styles.weightItem}>
                  <Text style={styles.weightValue}>{weight.imperial}</Text>
                  <Text style={styles.weightUnit}>lbs</Text>
                </View>
                <View style={styles.weightDivider} />
                <View style={styles.weightItem}>
                  <Text style={styles.weightValue}>{weight.metric}</Text>
                  <Text style={styles.weightUnit}>kg</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.actionIndicator}>
            <Text style={styles.actionText}>Tap to learn more</Text>
            <Text style={styles.actionArrow}>→</Text>
          </View>
        </View>
      </Pressable>
      <Spacer size={'xl'} />
    </React.Fragment>
  );
};

const petPreviewStyles = ({ fonts, colors }: AppTheme) =>
  StyleSheet.create({
    container: {
      width: '90%',
      backgroundColor: colors.lightBackground,
      borderRadius: 16,
      marginHorizontal: 4,
      marginVertical: 2,
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      overflow: 'hidden',
    },
    imageContainer: {
      position: 'relative',
      height: 180,
      backgroundColor: colors.lightBackground,
    },
    image: {
      width: '100%',
      height: '100%',
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
    },
    imageOverlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 40,
      background: 'linear-gradient(transparent, rgba(0,0,0,0.3))',
    },
    contentContainer: {
      padding: 16,
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    petName: {
      fontSize: 22,
      fontWeight: 'bold',
      color: colors.text,
      flex: 1,
      marginRight: 12,
    },
    lifespanBadge: {
      backgroundColor: colors.accent,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
    },
    lifespanText: {
      fontSize: 12,
      fontWeight: '600',
      color: '#FFFFFF',
    },
    locationRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    locationIcon: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 8,
    },
    locationIconText: {
      fontSize: 12,
    },
    originText: {
      fontSize: 16,
      color: colors.lightText,
      fontWeight: '500',
    },
    weightContainer: {
      marginBottom: 16,
    },
    weightCard: {
      backgroundColor: colors.lightBackground,
      borderRadius: 12,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    weightLabel: {
      fontSize: 14,
      fontWeight: '600',
      color: colors?.lightText,
      marginBottom: 8,
      textAlign: 'center',
    },
    weightRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    weightItem: {
      alignItems: 'center',
      flex: 1,
    },
    weightValue: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
    },
    weightUnit: {
      fontSize: 12,
      color: colors.lightText,
      marginTop: 2,
    },
    weightDivider: {
      width: 1,
      height: 24,
      backgroundColor: colors.border,
      marginHorizontal: 16,
    },
    actionIndicator: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    actionText: {
      fontSize: 14,
      color: colors.accent,
      fontWeight: '500',
    },
    actionArrow: {
      fontSize: 16,
      color: colors.accent,
      fontWeight: 'bold',
    },
  });
