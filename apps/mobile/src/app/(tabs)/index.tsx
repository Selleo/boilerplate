import { SignInForm } from "@/components/sign-in-form";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      className="h-full"
      contentContainerStyle={{ paddingTop: insets.top }}
    >
      <SignInForm />
    </ScrollView>
  );
}
