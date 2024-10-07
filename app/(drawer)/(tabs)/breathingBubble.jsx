import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';

const BreathingBubbles = () => {
  const [isBreathingIn, setIsBreathingIn] = useState(true); // Track if user is breathing in or out
  const [bubblePosition] = useState(new Animated.Value(0)); // Animated value for bubble movement

  useEffect(() => {
    // Function to animate the bubble
    const startBubbleAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(bubblePosition, {
            toValue: 300, // Move bubble upwards (inhaling)
            duration: 4000, // Duration of breathing in
            useNativeDriver: true,
          }),
          Animated.timing(bubblePosition, {
            toValue: 0, // Move bubble back down (exhaling)
            duration: 4000, // Duration of breathing out
            useNativeDriver: true,
          }),
        ]),
      ).start();
    };

    startBubbleAnimation();
  }, [bubblePosition]);

  // Toggle breathing direction (Inhale/Exhale)
  const toggleBreathing = () => {
    setIsBreathingIn(!isBreathingIn);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Breathing Bubbles</Text>

      <Text style={styles.instructions}>
        Focus on your breath as you inhale and exhale. Imagine you're blowing a bubble. Follow the bubble as it floats.
      </Text>

      <Animated.View
        style={[
          styles.bubble,
          { transform: [{ translateY: bubblePosition }] },
        ]}
      />

      <TouchableOpacity style={styles.breathButton} onPress={toggleBreathing}>
        <Text style={styles.breathButtonText}>
          {isBreathingIn ? 'Inhale...' : 'Exhale...'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BreathingBubbles;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#008080',
  },
  instructions: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  bubble: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#87CEEB',
    position: 'absolute',
    bottom: 100,
  },
  breathButton: {
    marginTop: 20,
    backgroundColor: '#87CEFA',
    padding: 15,
    borderRadius: 10,
  },
  breathButtonText: {
    fontSize: 20,
    color: '#fff',
  },
});
