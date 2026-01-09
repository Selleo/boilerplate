import { useLoginUser } from '@/api/mutations/useLoginUser';
import { SocialConnections } from '@/components/social-connections';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { AlertCircle } from 'lucide-react-native';
import * as React from 'react';
import { ActivityIndicator, Pressable, type TextInput, View } from 'react-native';

export function SignInForm() {
  const passwordInputRef = React.useRef<TextInput>(null);
  const loginMutation = useLoginUser();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function onEmailSubmitEditing() {
    passwordInputRef.current?.focus();
  }

  function onSubmit() {
    if (!email || !password) {
      loginMutation.reset();
      return;
    }

    loginMutation.mutate({ data: { email, password } });
  }

  const error = loginMutation.error?.message;
  const isLoading = loginMutation.isPending;

  return (
    <View className="gap-6">
      <Card className="border-border/0 sm:border-border shadow-none sm:shadow-sm sm:shadow-black/5">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-left">Sign in to your app</CardTitle>
          <CardDescription className="text-center sm:text-left">
            Welcome back! Please sign in to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-6">
          {error && (
            <Alert variant="destructive" icon={AlertCircle}>
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <View className="gap-6">
            <View className="gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="m@example.com"
                keyboardType="email-address"
                autoComplete="email"
                autoCapitalize="none"
                onSubmitEditing={onEmailSubmitEditing}
                returnKeyType="next"
                submitBehavior="submit"
                value={email}
                onChangeText={setEmail}
                editable={!isLoading}
              />
            </View>
            <View className="gap-1.5">
              <View className="flex-row items-center">
                <Label htmlFor="password">Password</Label>
                <Button
                  variant="link"
                  size="sm"
                  className="web:h-fit ml-auto h-4 px-1 py-0 sm:h-4"
                  onPress={() => {
                    // TODO: Navigate to forgot password screen
                  }}>
                  <Text className="font-normal leading-4">Forgot your password?</Text>
                </Button>
              </View>
              <Input
                ref={passwordInputRef}
                id="password"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={onSubmit}
                value={password}
                onChangeText={setPassword}
                editable={!isLoading}
              />
            </View>
            <Button className="w-full" onPress={onSubmit} disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text>Continue</Text>
              )}
            </Button>
          </View>
          <Text className="text-center text-sm">
            Don&apos;t have an account?{' '}
            <Pressable
              onPress={() => {
                // TODO: Navigate to sign up screen
              }}>
              <Text className="text-sm underline underline-offset-4">Sign up</Text>
            </Pressable>
          </Text>
          <View className="flex-row items-center">
            <Separator className="flex-1" />
            <Text className="text-muted-foreground px-4 text-sm">or</Text>
            <Separator className="flex-1" />
          </View>
          <SocialConnections />
        </CardContent>
      </Card>
    </View>
  );
}
