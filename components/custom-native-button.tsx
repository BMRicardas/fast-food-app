import React from "react";
import {
  AccessibilityActionEvent,
  AccessibilityActionInfo,
  AccessibilityState,
  GestureResponderEvent,
  Platform,
  StyleSheet,
  Text,
  TextStyle,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

type Props = {
  /**
   * Text to display inside the button. On Android the given title will be
   * converted to the uppercased form.
   */
  title: string;

  /**
   * Handler to be called when the user taps the button.
   */
  onPress?: (event?: GestureResponderEvent) => void;

  /**
   * If true, doesn't play system sound on touch.
   * @platform android
   * @default false
   */
  touchSoundDisabled?: boolean;

  /**
   * Color of the text (iOS), or background color of the button (Android).
   * @default '#2196F3' on Android
   * @default '#007AFF' on iOS
   */
  color?: string;

  /**
   * TV preferred focus.
   * @platform tv
   * @default false
   * @deprecated Use `focusable` instead
   */
  hasTVPreferredFocus?: boolean;

  /**
   * Designates the next view to receive focus when the user navigates down.
   * @platform android, tv
   */
  nextFocusDown?: number;

  /**
   * Designates the next view to receive focus when the user navigates forward.
   * @platform android, tv
   */
  nextFocusForward?: number;

  /**
   * Designates the next view to receive focus when the user navigates left.
   * @platform android, tv
   */
  nextFocusLeft?: number;

  /**
   * Designates the next view to receive focus when the user navigates right.
   * @platform android, tv
   */
  nextFocusRight?: number;

  /**
   * Designates the next view to receive focus when the user navigates up.
   * @platform android, tv
   */
  nextFocusUp?: number;

  /**
   * Text to display for blindness accessibility features.
   */
  accessibilityLabel?: string;

  /**
   * Alias for accessibilityLabel
   */
  "aria-label"?: string;

  /**
   * If true, disable all interactions for this component.
   * @default false
   */
  disabled?: boolean;

  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string;

  /**
   * Accessibility props.
   */
  accessible?: boolean;
  accessibilityActions?: ReadonlyArray<AccessibilityActionInfo>;
  onAccessibilityAction?: (event: AccessibilityActionEvent) => void;
  accessibilityState?: AccessibilityState;
  accessibilityHint?: string;
  accessibilityLanguage?: string;

  /**
   * Alias for accessibilityState
   */
  "aria-busy"?: boolean;
  "aria-checked"?: boolean | "mixed";
  "aria-disabled"?: boolean;
  "aria-expanded"?: boolean;
  "aria-selected"?: boolean;

  /**
   * Controlling if a view fires accessibility events and if it is reported to accessibility services.
   * @platform android
   */
  importantForAccessibility?: "auto" | "yes" | "no" | "no-hide-descendants";

  /**
   * Custom style for the button container
   */
  style?: ViewStyle;

  /**
   * Custom style for the button text
   */
  textStyle?: TextStyle;
};

export function CustomNativeButton({
  title,
  onPress,
  color,
  disabled = false,
  accessibilityLabel,
  accessibilityHint,
  accessibilityState,
  accessibilityActions,
  accessibilityLanguage,
  onAccessibilityAction,
  testID,
  touchSoundDisabled,
  style,
  textStyle,
  accessible,
  importantForAccessibility,
  // TV and focus props
  hasTVPreferredFocus,
  nextFocusDown,
  nextFocusForward,
  nextFocusLeft,
  nextFocusRight,
  nextFocusUp,
  // ARIA props
  "aria-label": ariaLabel,
  "aria-busy": ariaBusy,
  "aria-checked": ariaChecked,
  "aria-disabled": ariaDisabled,
  "aria-expanded": ariaExpanded,
  "aria-selected": ariaSelected,
}: Props) {
  const Touchable =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;

  const buttonStyles: ViewStyle[] = [styles.button];
  const textStyles: TextStyle[] = [styles.text];

  // Handle color prop
  if (color) {
    if (Platform.OS === "ios") {
      textStyles.push({ color: color });
    } else {
      buttonStyles.push({ backgroundColor: color });
    }
  }

  // Merge accessibility state
  const _accessibilityState: AccessibilityState = {
    busy: ariaBusy ?? accessibilityState?.busy,
    checked: ariaChecked ?? accessibilityState?.checked,
    disabled: ariaDisabled ?? accessibilityState?.disabled ?? disabled,
    expanded: ariaExpanded ?? accessibilityState?.expanded,
    selected: ariaSelected ?? accessibilityState?.selected,
  };

  // Handle disabled styles
  if (disabled) {
    buttonStyles.push(styles.buttonDisabled);
    textStyles.push(styles.textDisabled);
  }

  // Add custom styles
  if (style) {
    buttonStyles.push(style);
  }
  if (textStyle) {
    textStyles.push(textStyle);
  }

  // Format title (uppercase on Android)
  const formattedTitle =
    Platform.OS === "android" ? title.toUpperCase() : title;

  // Handle importantForAccessibility
  const _importantForAccessibility =
    importantForAccessibility === "no"
      ? "no-hide-descendants"
      : importantForAccessibility;

  return (
    <Touchable
      accessible={accessible}
      accessibilityActions={accessibilityActions}
      onAccessibilityAction={onAccessibilityAction}
      accessibilityLabel={ariaLabel || accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityLanguage={accessibilityLanguage}
      accessibilityRole="button"
      accessibilityState={_accessibilityState}
      importantForAccessibility={_importantForAccessibility}
      hasTVPreferredFocus={hasTVPreferredFocus}
      nextFocusDown={nextFocusDown}
      nextFocusForward={nextFocusForward}
      nextFocusLeft={nextFocusLeft}
      nextFocusRight={nextFocusRight}
      nextFocusUp={nextFocusUp}
      testID={testID}
      disabled={disabled}
      onPress={onPress}
      touchSoundDisabled={touchSoundDisabled}>
      <View style={buttonStyles}>
        <Text style={textStyles}>{formattedTitle}</Text>
      </View>
    </Touchable>
  );
}

const styles = StyleSheet.create({
  button: Platform.select({
    ios: {},
    android: {
      elevation: 4,
      backgroundColor: "#2196F3",
      borderRadius: 2,
    },
  }) as ViewStyle,
  text: {
    textAlign: "center",
    margin: 8,
    ...Platform.select({
      ios: {
        color: "#007AFF",
        fontSize: 18,
      },
      android: {
        color: "white",
        fontWeight: "500",
      },
    }),
  } as TextStyle,
  buttonDisabled: Platform.select({
    ios: {},
    android: {
      elevation: 0,
      backgroundColor: "#dfdfdf",
    },
  }) as ViewStyle,
  textDisabled: Platform.select({
    ios: {
      color: "#cdcdcd",
    },
    android: {
      color: "#a1a1a1",
    },
  }) as TextStyle,
});
