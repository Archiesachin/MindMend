import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function ChatBot() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const sendMessage = async () => {
    try {
      const res = await fetch('https://xyz123.ngrok.io/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <TextInput 
        placeholder="Type your message" 
        value={message} 
        onChangeText={setMessage} 
        style={{ borderColor: 'gray', borderWidth: 1, margin: 10, padding: 5 }}
      />
      <Button title="Send" onPress={sendMessage} />
      <Text>Response: {response}</Text>
    </View>
  );
}
