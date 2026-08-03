import * as Toggle from '@radix-ui/react-toggle';
import style from './Header.module.css';

interface HeaderProps {
  tema: 'dark' | 'light';
  alternarTema: () => void;
}

export function Header({ tema, alternarTema }: HeaderProps) {
  return (
    <header className={style.containerHeader}>
      <h1>CommitFocus</h1>
      <Toggle.Root
        className={style.botaoTema}
        pressed={tema === 'light'}
        onPressedChange={alternarTema}
        aria-label='Alternar tema claro e escuro'
      >
        <span className={`material-symbols-outlined ${style.iconeHeader}`}>{tema === 'light' ? 'wb_twilight' : 'wb_twilight_2'}</span>
      </Toggle.Root>
    </header>
  )
}
