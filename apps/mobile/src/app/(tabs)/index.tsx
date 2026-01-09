import { useLogoutUser } from "@/api/mutations/useLogoutUser";
import { useCurrentUser } from "@/api/queries/useCurrentUser";
import { SignInForm } from "@/components/sign-in-form";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { ActivityIndicator, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { data: user, isLoading } = useCurrentUser();
  const logoutMutation = useLogoutUser();

  function handleSignOut() {
    logoutMutation.mutate();
  }

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (user) {
    return (
      <ScrollView
        className="h-full"
        contentContainerStyle={{ paddingTop: insets.top }}
      >
        <ThemedView className="flex-1 items-center justify-center gap-6 p-6">
          <ThemedText type="title">Welcome back!</ThemedText>
          <ThemedText className="text-center">
            You are signed in as {user.email}
          </ThemedText>
          <Button
            onPress={handleSignOut}
            disabled={logoutMutation.isPending}
            variant="destructive"
            className="w-full max-w-xs"
          >
            {logoutMutation.isPending ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text>Sign out</Text>
            )}
          </Button>
        </ThemedView>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      className="h-full"
      contentContainerStyle={{ paddingTop: insets.top }}
    >
      <SignInForm />
    </ScrollView>
  );
}
