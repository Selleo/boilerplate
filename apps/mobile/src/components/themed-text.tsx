import { cn } from "@/lib/utils";
import { Text, type TextProps } from "react-native";

export type ThemedTextProps = TextProps & {
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
  className?: string;
};

const typeClassMap = {
  base: "text-black dark:text-white",
  default: "text-base leading-6",
  defaultSemiBold: "text-base leading-6 font-semibold",
  title: "text-[32px] font-bold leading-8",
  subtitle: "text-xl font-bold",
  link: "text-base leading-[30px] text-[#0a7ea4]",
};

export function ThemedText({
  style,
  type = "default",
  className,
  ...rest
}: ThemedTextProps) {
  return (
    <Text
      className={cn(typeClassMap.base, typeClassMap[type], className)}
      {...rest}
    />
  );
}
