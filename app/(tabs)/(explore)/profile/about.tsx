import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import tw from 'twrnc';

const Privacy: React.FC = () => {
  return (
    <View style={tw`flex-1 p-4`}>
      <Text style={tw`text-xl font-bold mb-4`}>Privacy Policy</Text>
      <Text style={tw`text-base mb-2`}>
        Your privacy is important to us. This privacy statement explains the personal data our app
        processes, how our app processes it, and for what purposes.
      </Text>
      <Text style={tw`text-base mb-2`}>
        We collect data to provide the services you request, ease your navigation on the app, and
        improve your experience.
      </Text>
      <Text style={tw`text-base mb-2`}>
        We do not share your personal data with third parties without your consent, except to comply
        with laws or respond to lawful requests and legal process.
      </Text>
      <Text style={tw`text-base mb-2`}>
        For more detailed information, please read our full privacy policy on our website.
      </Text>
    </View>
  );
};

export default Privacy;
