import React, { FC } from 'react';
import { ScreenProps } from '../../navigation/types';
import { AppButton, Screen, Spacer, ToolBar } from '../../core/components';
import { Image, StyleSheet, View, Text } from 'react-native';
import { Pets } from '../../core/models/pets';
import { AppTheme } from '@react-navigation/native';
import { useAppStore } from '../../hooks';

const DetailScreen: FC<ScreenProps> = ({ navigation, route }) => {
  const { theme } = useAppStore();
  const styles = detailScreenStyle(theme);

  const { pets } = route.params as { pets: Pets };
  const { breeds, url } = pets;
  const {
    name,
    weight,
    origin,
    country_code,
    description,
    life_span,
    alt_names,
    temperament,
  } = breeds[0];

  const handleOnPress = () => {
    navigation.navigate('ADOPT', {
      screen: 'DETAIL',
      params: {
        pets,
      },
    });
  };

  const renderInfoCard = (title: string, content: string, icon?: string) => (
    <View style={styles.infoCard}>
      <View style={styles.infoHeader}>
        {icon && <Text style={styles.infoIcon}>{icon}</Text>}
        <Text style={styles.infoTitle}>{title}</Text>
      </View>
      <Text style={styles.infoContent}>{content}</Text>
    </View>
  );

  const renderWeightCard = () => (
    <View style={styles.weightCard}>
      <View style={styles.weightHeader}>
        <Text style={styles.weightIcon}>⚖️</Text>
        <Text style={styles.weightTitle}>Weight Range</Text>
      </View>
      <View style={styles.weightContent}>
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
  );

  const renderLocationCard = () => (
    <View style={styles.locationCard}>
      <View style={styles.locationHeader}>
        <Text style={styles.locationIcon}>🌍</Text>
        <Text style={styles.locationTitle}>Origin</Text>
      </View>
      <View style={styles.locationContent}>
        <Text style={styles.locationOrigin}>{origin}</Text>
        <View style={styles.countryBadge}>
          <Text style={styles.countryCode}>{country_code}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <Screen
      scroll
      header={<ToolBar back center={name} />}
      footer={
        <View style={styles.footerContainer}>
          <AppButton
            text={`Adopt ${name} 🐾`}
            onPress={handleOnPress}
            style={styles.adoptButton}
          />
        </View>
      }
    >
      <View style={styles.container}>
        <View style={styles.heroSection}>
          <Image
            source={{ uri: url }}
            style={styles.heroImage}
            resizeMode={'cover'}
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroName}>{name}</Text>
            <View style={styles.lifespanBadge}>
              <Text style={styles.lifespanText}>{life_span} years</Text>
            </View>
          </View>
        </View>

        <View style={styles.quickInfoSection}>
          {renderLocationCard()}
          {renderWeightCard()}
        </View>

        <View style={styles.detailsSection}>
          {alt_names && renderInfoCard('Alternative Names', alt_names, '🏷️')}

          {temperament && (
            <View style={styles.temperamentCard}>
              <View style={styles.temperamentHeader}>
                <Text style={styles.temperamentIcon}>🎭</Text>
                <Text style={styles.temperamentTitle}>Temperament</Text>
              </View>
              <View style={styles.temperamentTags}>
                {temperament.split(', ').map((trait, index) => (
                  <View key={index} style={styles.temperamentTag}>
                    <Text style={styles.temperamentTagText}>{trait}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {description && (
            <View style={styles.descriptionCard}>
              <View style={styles.descriptionHeader}>
                <Text style={styles.descriptionIcon}>📝</Text>
                <Text style={styles.descriptionTitle}>About {name}</Text>
              </View>
              <Text style={styles.descriptionText}>{description}</Text>
            </View>
          )}
        </View>

        <Spacer size={'xLarge'} />
      </View>
    </Screen>
  );
};

const detailScreenStyle = ({ fonts, colors, space }: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },

    heroSection: {
      position: 'relative',
      height: 300,
      marginBottom: space.large,
    },
    heroImage: {
      width: '100%',
      height: '100%',
      borderRadius: 20,
    },
    heroOverlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      padding: space.large,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    heroName: {
      ...fonts.xLargeFont,
      fontWeight: 'bold',
      color: '#FFFFFF',
      flex: 1,
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

    quickInfoSection: {
      marginBottom: space.large,
    },
    locationCard: {
      backgroundColor: colors.lightBackground,
      borderRadius: 16,
      padding: space.large,
      marginBottom: space.medium,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    locationHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: space.medium,
    },
    locationIcon: {
      fontSize: 20,
      marginRight: space.small,
    },
    locationTitle: {
      ...fonts.largeFont,
      fontWeight: 'bold',
      color: colors.text,
    },
    locationContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    locationOrigin: {
      ...fonts.mediumFont,
      color: colors.lightText,
      flex: 1,
    },
    countryBadge: {
      backgroundColor: colors.branchBackground,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
    },
    countryCode: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.darkText,
    },

    weightCard: {
      backgroundColor: colors.lightBackground,
      borderRadius: 16,
      padding: space.large,
      marginBottom: space.medium,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    weightHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: space.medium,
    },
    weightIcon: {
      fontSize: 20,
      marginRight: space.small,
    },
    weightTitle: {
      ...fonts.largeFont,
      fontWeight: 'bold',
      color: colors.text,
    },
    weightContent: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    weightItem: {
      alignItems: 'center',
      flex: 1,
    },
    weightValue: {
      ...fonts.largeFont,
      fontWeight: 'bold',
      color: colors.accent,
    },
    weightUnit: {
      ...fonts.smallFont,
      color: colors.lightText,
      marginTop: 4,
    },
    weightDivider: {
      width: 1,
      height: 24,
      backgroundColor: colors.border,
      marginHorizontal: space.medium,
    },

    detailsSection: {
      marginBottom: space.large,
    },
    infoCard: {
      backgroundColor: colors.lightBackground,
      borderRadius: 16,
      padding: space.large,
      marginBottom: space.medium,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    infoHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: space.medium,
    },
    infoIcon: {
      fontSize: 20,
      marginRight: space.small,
    },
    infoTitle: {
      ...fonts.largeFont,
      fontWeight: 'bold',
      color: colors.text,
    },
    infoContent: {
      ...fonts.mediumFont,
      color: colors.lightText,
      lineHeight: 24,
    },

    temperamentCard: {
      backgroundColor: colors.lightBackground,
      borderRadius: 16,
      padding: space.large,
      marginBottom: space.medium,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    temperamentHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: space.medium,
    },
    temperamentIcon: {
      fontSize: 20,
      marginRight: space.small,
    },
    temperamentTitle: {
      ...fonts.largeFont,
      fontWeight: 'bold',
      color: colors.text,
    },
    temperamentTags: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: space.small,
    },
    temperamentTag: {
      backgroundColor: colors.branchBackground,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      marginBottom: space.small,
    },
    temperamentTagText: {
      ...fonts.smallFont,
      color: colors.darkText,
      fontWeight: '500',
    },

    descriptionCard: {
      backgroundColor: colors.lightBackground,
      borderRadius: 16,
      padding: space.large,
      marginBottom: space.medium,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    descriptionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: space.medium,
    },
    descriptionIcon: {
      fontSize: 20,
      marginRight: space.small,
    },
    descriptionTitle: {
      ...fonts.largeFont,
      fontWeight: 'bold',
      color: colors.text,
    },
    descriptionText: {
      ...fonts.mediumFont,
      color: colors.lightText,
      lineHeight: 24,
    },

    footerContainer: {
      padding: space.medium,
      backgroundColor: colors.lightBackground,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    adoptButton: {
      backgroundColor: colors.accent,
      borderRadius: 25,
      paddingVertical: space.large,
      shadowColor: colors.accent,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 6,
    },
  });

export default DetailScreen;
