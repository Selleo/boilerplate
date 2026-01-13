import { useState } from "react";
import { ScrollView, View } from "react-native";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Text } from "@/components/ui/text";
import { Textarea } from "@/components/ui/textarea";
import { Toggle, ToggleIcon } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Bold, Italic, Underline } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ComponentsScreen() {
  const [inputValue, setInputValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(true);
  const [radioValue, setRadioValue] = useState("option1");
  const [selectValue, setSelectValue] = useState<
    { value: string; label: string } | undefined
  >();
  const [switch1, setSwitch1] = useState(false);
  const [switch2, setSwitch2] = useState(true);
  const [toggleBold, setToggleBold] = useState(false);
  const [toggleItalic, setToggleItalic] = useState(false);
  const [toggleOutlineBold, setToggleOutlineBold] = useState(false);
  const [toggleOutlineItalic, setToggleOutlineItalic] = useState(false);
  const [toggleSm, setToggleSm] = useState(false);
  const [toggleDefault, setToggleDefault] = useState(false);
  const [toggleLg, setToggleLg] = useState(false);
  const [toggleGroupValue, setToggleGroupValue] = useState<string[]>(["bold"]);
  const [toggleGroupSingleValue, setToggleGroupSingleValue] = useState<
    string | undefined
  >("center");
  const [tabValue, setTabValue] = useState("account");
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{ paddingTop: insets.top }}
    >
      <View className="gap-8 px-4">
        {/* Text Component */}
        <View className="gap-4">
          <Text variant="h2">Text</Text>
          <View className="gap-2 rounded-lg border border-border bg-card p-4">
            <Text variant="h1">Heading 1</Text>
            <Text variant="h2">Heading 2</Text>
            <Text variant="h3">Heading 3</Text>
            <Text variant="h4">Heading 4</Text>
            <Text variant="p">
              This is a paragraph of text. It demonstrates the default paragraph
              styling with proper line height and spacing.
            </Text>
            <Text variant="lead">
              This is lead text, slightly larger and muted.
            </Text>
            <Text variant="large">This is large text.</Text>
            <Text variant="small">This is small text.</Text>
            <Text variant="muted">This is muted text.</Text>
            <Text variant="code">const code = &quot;inline&quot;;</Text>
            <Text variant="blockquote">
              This is a blockquote with styled border.
            </Text>
          </View>
        </View>

        {/* Input Component */}
        <View className="gap-4">
          <Text variant="h2">Input</Text>
          <View className="gap-3 rounded-lg border border-border bg-card p-4">
            <View className="gap-1">
              <Text variant="small">Default Input</Text>
              <Input
                placeholder="Enter text..."
                value={inputValue}
                onChangeText={setInputValue}
              />
            </View>
            <View className="gap-1">
              <Text variant="small">Disabled Input</Text>
              <Input
                placeholder="Disabled input"
                editable={false}
                value="Cannot edit this"
              />
            </View>
          </View>
        </View>

        {/* Button Component */}
        <View className="gap-4">
          <Text variant="h2">Button</Text>
          <View className="gap-3 rounded-lg border border-border bg-card p-4">
            <Text variant="small">Variants</Text>
            <View className="flex-row flex-wrap gap-2">
              <Button variant="default">
                <Text>Default</Text>
              </Button>
              <Button variant="secondary">
                <Text>Secondary</Text>
              </Button>
              <Button variant="destructive">
                <Text>Destructive</Text>
              </Button>
              <Button variant="outline">
                <Text>Outline</Text>
              </Button>
              <Button variant="ghost">
                <Text>Ghost</Text>
              </Button>
              <Button variant="link">
                <Text>Link</Text>
              </Button>
            </View>

            <Text variant="small">Sizes</Text>
            <View className="flex-row flex-wrap items-center gap-2">
              <Button size="sm">
                <Text>Small</Text>
              </Button>
              <Button size="default">
                <Text>Default</Text>
              </Button>
              <Button size="lg">
                <Text>Large</Text>
              </Button>
            </View>

            <Text variant="small">Disabled</Text>
            <Button disabled>
              <Text>Disabled</Text>
            </Button>
          </View>
        </View>

        {/* AlertDialog Component */}
        <View className="gap-4">
          <Text variant="h2">Alert Dialog</Text>
          <View className="gap-3 rounded-lg border border-border bg-card p-4">
            <Text variant="small">Tap to open dialog</Text>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">
                  <Text>Open Alert Dialog</Text>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>
                    <Text>Cancel</Text>
                  </AlertDialogCancel>
                  <AlertDialogAction>
                    <Text>Continue</Text>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </View>
        </View>

        {/* Checkbox Component */}
        <View className="gap-4">
          <Text variant="h2">Checkbox</Text>
          <View className="gap-3 rounded-lg border border-border bg-card p-4">
            <View className="flex-row items-center gap-3">
              <Checkbox checked={checkbox1} onCheckedChange={setCheckbox1} />
              <Text>Unchecked by default</Text>
            </View>
            <View className="flex-row items-center gap-3">
              <Checkbox checked={checkbox2} onCheckedChange={setCheckbox2} />
              <Text>Checked by default</Text>
            </View>
            <View className="flex-row items-center gap-3">
              <Checkbox checked={true} onCheckedChange={() => {}} disabled />
              <Text variant="muted">Disabled checked</Text>
            </View>
            <View className="flex-row items-center gap-3">
              <Checkbox checked={false} onCheckedChange={() => {}} disabled />
              <Text variant="muted">Disabled unchecked</Text>
            </View>
          </View>
        </View>

        {/* Dialog Component */}
        <View className="gap-4">
          <Text variant="h2">Dialog</Text>
          <View className="gap-3 rounded-lg border border-border bg-card p-4">
            <Text variant="small">Dialog with close button</Text>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Text>Open Dialog</Text>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when
                    you&apos;re done.
                  </DialogDescription>
                </DialogHeader>
                <View className="gap-4 py-4">
                  <View className="gap-2">
                    <Text variant="small">Name</Text>
                    <Input placeholder="Enter your name" />
                  </View>
                  <View className="gap-2">
                    <Text variant="small">Email</Text>
                    <Input placeholder="Enter your email" />
                  </View>
                </View>
                <DialogFooter>
                  <Button>
                    <Text>Save changes</Text>
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </View>
        </View>

        {/* Dropdown Menu Component */}
        <View className="gap-4">
          <Text variant="h2">Dropdown Menu</Text>
          <View className="gap-3 rounded-lg border border-border bg-card p-4">
            <Text variant="small">Tap to open menu</Text>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Text>Open Menu</Text>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Text>Profile</Text>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Text>Settings</Text>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Text>Notifications</Text>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <Text>Log out</Text>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </View>
        </View>

        {/* Popover Component */}
        <View className="gap-4">
          <Text variant="h2">Popover</Text>
          <View className="gap-3 rounded-lg border border-border bg-card p-4">
            <Text variant="small">Tap to open popover</Text>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <Text>Open Popover</Text>
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <View className="gap-2">
                  <Text variant="large">Popover Content</Text>
                  <Text variant="muted">
                    This is the popover content. You can put any content here.
                  </Text>
                </View>
              </PopoverContent>
            </Popover>
          </View>
        </View>

        {/* Radio Group Component */}
        <View className="gap-4">
          <Text variant="h2">Radio Group</Text>
          <View className="gap-3 rounded-lg border border-border bg-card p-4">
            <Text variant="small">Select an option</Text>
            <RadioGroup value={radioValue} onValueChange={setRadioValue}>
              <View className="flex-row items-center gap-3">
                <RadioGroupItem value="option1" />
                <Text>Option 1</Text>
              </View>
              <View className="flex-row items-center gap-3">
                <RadioGroupItem value="option2" />
                <Text>Option 2</Text>
              </View>
              <View className="flex-row items-center gap-3">
                <RadioGroupItem value="option3" />
                <Text>Option 3</Text>
              </View>
            </RadioGroup>
            <Text variant="muted">Selected: {radioValue}</Text>
          </View>
        </View>

        {/* Select Component */}
        <View className="gap-4">
          <Text variant="h2">Select</Text>
          <View className="gap-3 rounded-lg border border-border bg-card p-4">
            <Text variant="small">Choose a fruit</Text>
            <Select value={selectValue} onValueChange={setSelectValue}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apple" label="Apple">
                  Apple
                </SelectItem>
                <SelectItem value="banana" label="Banana">
                  Banana
                </SelectItem>
                <SelectItem value="orange" label="Orange">
                  Orange
                </SelectItem>
                <SelectItem value="grape" label="Grape">
                  Grape
                </SelectItem>
                <SelectItem value="mango" label="Mango">
                  Mango
                </SelectItem>
              </SelectContent>
            </Select>
            {selectValue && (
              <Text variant="muted">Selected: {selectValue.label}</Text>
            )}
          </View>
        </View>

        {/* Skeleton Component */}
        <View className="gap-4">
          <Text variant="h2">Skeleton</Text>
          <View className="gap-3 rounded-lg border border-border bg-card p-4">
            <Text variant="small">Loading placeholders</Text>
            <View className="gap-4">
              <View className="flex-row items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <View className="gap-2">
                  <Skeleton className="h-4 w-50" />
                  <Skeleton className="h-4 w-37.5" />
                </View>
              </View>
              <Skeleton className="h-31.25 w-full rounded-xl" />
              <View className="gap-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[80%]" />
                <Skeleton className="h-4 w-[60%]" />
              </View>
            </View>
          </View>
        </View>

        {/* Switch Component */}
        <View className="gap-4">
          <Text variant="h2">Switch</Text>
          <View className="gap-3 rounded-lg border border-border bg-card p-4">
            <View className="flex-row items-center justify-between">
              <Text>Notifications</Text>
              <Switch checked={switch1} onCheckedChange={setSwitch1} />
            </View>
            <View className="flex-row items-center justify-between">
              <Text>Dark Mode</Text>
              <Switch checked={switch2} onCheckedChange={setSwitch2} />
            </View>
            <View className="flex-row items-center justify-between">
              <Text variant="muted">Disabled</Text>
              <Switch checked={false} onCheckedChange={() => {}} disabled />
            </View>
          </View>
        </View>

        {/* Tabs Component */}
        <View className="gap-4">
          <Text variant="h2">Tabs</Text>
          <View className="gap-3 rounded-lg border border-border bg-card p-4">
            <Tabs value={tabValue} onValueChange={setTabValue}>
              <TabsList>
                <TabsTrigger value="account">
                  <Text>Account</Text>
                </TabsTrigger>
                <TabsTrigger value="password">
                  <Text>Password</Text>
                </TabsTrigger>
                <TabsTrigger value="settings">
                  <Text>Settings</Text>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <View className="gap-2 pt-4">
                  <Text variant="large">Account</Text>
                  <Text variant="muted">
                    Make changes to your account here. Click save when
                    you&apos;re done.
                  </Text>
                </View>
              </TabsContent>
              <TabsContent value="password">
                <View className="gap-2 pt-4">
                  <Text variant="large">Password</Text>
                  <Text variant="muted">
                    Change your password here. After saving, you&apos;ll be
                    logged out.
                  </Text>
                </View>
              </TabsContent>
              <TabsContent value="settings">
                <View className="gap-2 pt-4">
                  <Text variant="large">Settings</Text>
                  <Text variant="muted">
                    Manage your application settings and preferences.
                  </Text>
                </View>
              </TabsContent>
            </Tabs>
          </View>
        </View>

        {/* Textarea Component */}
        <View className="gap-4">
          <Text variant="h2">Textarea</Text>
          <View className="gap-3 rounded-lg border border-border bg-card p-4">
            <View className="gap-1">
              <Text variant="small">Default Textarea</Text>
              <Textarea
                placeholder="Type your message here..."
                value={textareaValue}
                onChangeText={setTextareaValue}
              />
            </View>
            <View className="gap-1">
              <Text variant="small">Disabled Textarea</Text>
              <Textarea placeholder="Disabled textarea" editable={false} />
            </View>
          </View>
        </View>

        {/* Toggle Component */}
        <View className="gap-4">
          <Text variant="h2">Toggle</Text>
          <View className="gap-3 rounded-lg border border-border bg-card p-4">
            <Text variant="small">Default variant</Text>
            <View className="flex-row gap-2">
              <Toggle pressed={toggleBold} onPressedChange={setToggleBold}>
                <ToggleIcon as={Bold} />
              </Toggle>
              <Toggle pressed={toggleItalic} onPressedChange={setToggleItalic}>
                <ToggleIcon as={Italic} />
              </Toggle>
              <Toggle pressed={false} onPressedChange={() => {}} disabled>
                <ToggleIcon as={Underline} />
              </Toggle>
            </View>
            <Text variant="small">Outline variant</Text>
            <View className="flex-row gap-2">
              <Toggle
                variant="outline"
                pressed={toggleOutlineBold}
                onPressedChange={setToggleOutlineBold}
              >
                <ToggleIcon as={Bold} />
              </Toggle>
              <Toggle
                variant="outline"
                pressed={toggleOutlineItalic}
                onPressedChange={setToggleOutlineItalic}
              >
                <ToggleIcon as={Italic} />
              </Toggle>
            </View>
            <Text variant="small">Sizes</Text>
            <View className="flex-row items-center gap-2">
              <Toggle
                size="sm"
                variant="outline"
                pressed={toggleSm}
                onPressedChange={setToggleSm}
              >
                <ToggleIcon as={Bold} />
              </Toggle>
              <Toggle
                size="default"
                variant="outline"
                pressed={toggleDefault}
                onPressedChange={setToggleDefault}
              >
                <ToggleIcon as={Bold} />
              </Toggle>
              <Toggle
                size="lg"
                variant="outline"
                pressed={toggleLg}
                onPressedChange={setToggleLg}
              >
                <ToggleIcon as={Bold} />
              </Toggle>
            </View>
          </View>
        </View>

        {/* Toggle Group Component */}
        <View className="gap-4">
          <Text variant="h2">Toggle Group</Text>
          <View className="gap-3 rounded-lg border border-border bg-card p-4">
            <Text variant="small">Multiple selection</Text>
            <ToggleGroup
              type="multiple"
              value={toggleGroupValue}
              onValueChange={setToggleGroupValue}
              variant="outline"
            >
              <ToggleGroupItem value="bold" isFirst>
                <ToggleIcon as={Bold} />
              </ToggleGroupItem>
              <ToggleGroupItem value="italic">
                <ToggleIcon as={Italic} />
              </ToggleGroupItem>
              <ToggleGroupItem value="underline" isLast>
                <ToggleIcon as={Underline} />
              </ToggleGroupItem>
            </ToggleGroup>
            <Text variant="muted">
              Selected: {toggleGroupValue.join(", ") || "none"}
            </Text>

            <Text variant="small">Single selection</Text>
            <ToggleGroup
              type="single"
              value={toggleGroupSingleValue}
              onValueChange={setToggleGroupSingleValue}
              variant="outline"
            >
              <ToggleGroupItem value="left" isFirst>
                <Text>Left</Text>
              </ToggleGroupItem>
              <ToggleGroupItem value="center">
                <Text>Center</Text>
              </ToggleGroupItem>
              <ToggleGroupItem value="right" isLast>
                <Text>Right</Text>
              </ToggleGroupItem>
            </ToggleGroup>
            <Text variant="muted">
              Selected: {toggleGroupSingleValue || "none"}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
