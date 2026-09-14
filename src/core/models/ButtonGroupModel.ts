export type ButtonGroupItemType = 'push' | 'toggle' | 'dropdown' | 'separator';
export type ButtonGroupItemStyle = 'primary' | 'secondary' | 'success' | 'danger' | 'ghost';
export type ButtonGroupSelectionMode = 'none' | 'single-select' | 'multi-select';
export type ButtonGroupSizeMode = 'auto-fit' | 'equal-width' | 'fill';

export interface ButtonGroupItem {
  id: string;
  text?: string;
  iconGlyph?: string;
  tooltip?: string;
  type?: ButtonGroupItemType;
  style?: ButtonGroupItemStyle;
  isChecked?: boolean;
  isEnabled?: boolean;
  isVisible?: boolean;
  badgeText?: string;
  showBadgeDot?: boolean;
  badgeColorHex?: string;
  minWidth?: number;
  customPaddingHorizontal?: number;
  customBackColorHex?: string;
  customForeColorHex?: string;
  dropDownItems?: Array<{
    id: string;
    text: string;
    icon?: string;
    isDanger?: boolean;
    onClick?: () => void;
  }>;
  action?: (item: ButtonGroupItem) => void;
  tag?: unknown;
}
