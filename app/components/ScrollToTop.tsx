'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Przy zmianie ścieżki przewijaj do góry strony
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // Ten komponent nie renderuje niczego
} 