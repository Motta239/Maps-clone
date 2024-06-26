import React from 'react';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

export const ICONS = {
  explore: MaterialIcons,
  go: FontAwesome,
  saved: MaterialIcons,
  contribute: FontAwesome,
  updates: MaterialIcons,
};

const ICON_NAMES = {
  explore: 'explore',
  go: 'car',
  saved: 'bookmark',
  contribute: 'plus-circle',
  updates: 'notifications',
};

type AnimatedIconProps = {
  name: keyof typeof ICON_NAMES;
  focused: boolean;
  color: string;
};
const AnimatedIcon: React.FC<AnimatedIconProps> = ({ name, color, focused }) => {
  const IconComponent = ICONS[name];
  const iconName = ICON_NAMES[name];

  return <IconComponent name={iconName} size={24} color={color} />;
};

export default AnimatedIcon;
