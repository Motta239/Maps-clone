import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import tw from 'twrnc';

const Help: React.FC = () => {
  return (
    <View style={tw`flex-1 p-4 bg-white`}>
      <Text style={tw`text-xl font-bold mb-4`}>Help</Text>
      <Text style={tw`text-base mb-2`}>
        If you have any questions or need assistance, please refer to our FAQ section or contact our
        support team.
      </Text>
      <Text style={tw`text-base mb-2`}>
        Our support team is available 24/7 to help you with any issues you may encounter.
      </Text>
      <Text style={tw`text-base mb-2`}>
        You can reach us via email at support@example.com or call us at (123) 456-7890.
      </Text>
      <Text style={tw`text-base mb-2`}>
        For more detailed information, please visit our help center on our website.
      </Text>
    </View>
  );
};

export default Help;
