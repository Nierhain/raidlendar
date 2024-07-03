import { useComputedColorScheme, useMantineColorScheme } from "@mantine/core";

export default function ThemeToggle() {
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme("light", {
      getInitialValueInEffect: true,
    });
  return (
    <div>
      <button>Toggle Theme</button>
    </div>
  );
}