import { forwardRef } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import tw from 'twrnc';

type ButtonProps = {
  title?: string;
} & TouchableOpacityProps;

export const Button = forwardRef<TouchableOpacity, ButtonProps>(
  ({ title, ...touchableProps }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        {...touchableProps}
        style={[
          tw`items-center rounded-3xl elevation-5 flex-row justify-center p-4  `,
          touchableProps.style,
        ]}>
        <Text style={tw`text-white text-lg font-semibold text-center`}>{title}</Text>
      </TouchableOpacity>
    );
  }
);
