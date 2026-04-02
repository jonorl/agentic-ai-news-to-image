/// <reference types="nativewind/types" />

declare module "*.css" {
  import { StyleProp, ViewStyle } from "react-native";
  const content: StyleProp<ViewStyle>;
  export default content;
}