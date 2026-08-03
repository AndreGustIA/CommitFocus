import { useEffect, useState } from "react";

export function useTheme() {
  const [tema, setTema] = useState<'dark' | 'light'>(() => {
    const temaSalvo = localStorage.getItem('@commit-focus:theme');
    return (temaSalvo as 'dark' | 'light') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', tema);
    localStorage.setItem('@commit-focus:theme', tema);
  }, [tema]);

  const alternarTema = () => {
    setTema((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return { tema, alternarTema };
}
