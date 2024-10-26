type Icon = "home" | "settings" | "about" | 'test';
type ButtonVariant = "primary" | "secondary" | "tertiary";

// How do we refactor this to make it DRY?
type LooseType<T> = T | (string & {});
type LooseIcon = LooseType<Icon>;
type LooseButtonVariant = LooseType<ButtonVariant>

export const icons: LooseIcon[] = [
  "home",
  "settings",
  "about",
  "any-other-string",
  'test'
  // I should get autocomplete if I add a new item here!
];

export const buttonVariants: LooseButtonVariant[] = [
  "primary",
  "secondary",
  "tertiary",
  "any-other-string",
  // I should get autocomplete if I add a new item here!
];
