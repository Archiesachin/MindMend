import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BreathingBubblesGuide = () => {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>How to Play Breathing Bubbles</Text>
      <Text style={styles.description}>
        Breathing Bubbles is a mindfulness game designed to help users focus on their breathing and let go of stress or negative thoughts.
      </Text>
      
      <Text style={styles.subTitle}>How to Play:</Text>
      
      <Text style={styles.steps}>
        1. <Text style={styles.bold}>Start with Calm Breathing:</Text> Sit in a comfortable position, take a few deep breaths.
      </Text>
      <Text style={styles.steps}>
        2. <Text style={styles.bold}>Visualize a Bubble:</Text> Imagine a bubble in front of you, ready to be filled with your breath.
      </Text>
      <Text style={styles.steps}>
        3. <Text style={styles.bold}>Blow the Bubble:</Text> Slowly exhale, imagining you're blowing your negative thought into the bubble.
      </Text>
      <Text style={styles.steps}>
        4. <Text style={styles.bold}>Release the Bubble:</Text> Watch the bubble drift away, taking your stress with it.
      </Text>
      <Text style={styles.steps}>
        5. <Text style={styles.bold}>Focus on Positive Energy:</Text> Focus on positive thoughts or sensations like calm or joy.
      </Text>
      <Text style={styles.steps}>
        6. <Text style={styles.bold}>Repeat as Needed:</Text> Continue as long as needed to let go of negative feelings.
      </Text>

      <TouchableOpacity
        style={styles.playButton}
        onPress={() => navigation.navigate('breathingBubble')} // This assumes your game page is called BreathingBubbles in your navigation stack.
      >
        <Text style={styles.playButtonText}>Play Breathing Bubbles</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default BreathingBubblesGuide;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#008080',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#555',
  },
  steps: {
    fontSize: 16,
    color: '#555',
    marginBottom: 15,
    textAlign: 'left',
  },
  bold: {
    fontWeight: 'bold',
    color: '#008080',
  },
  playButton: {
    marginTop: 30,
    backgroundColor: '#87CEFA',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  playButtonText: {
    fontSize: 18,
    color: '#fff',
  },
});
