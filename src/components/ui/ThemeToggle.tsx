'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="rounded-full w-9 h-9 relative overflow-hidden text-muted-foreground hover:text-foreground"
    >
      <Sun className="h-4 w-4 transition-all dark:-translate-y-full dark:opacity-0" />
      <Moon className="absolute h-4 w-4 translate-y-full opacity-0 transition-all dark:translate-y-0 dark:opacity-100" />
      <span className="sr-only">Cambiar tema</span>
    </Button>
  );
}
