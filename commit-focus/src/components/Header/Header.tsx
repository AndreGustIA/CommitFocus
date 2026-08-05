import * as Toggle from '@radix-ui/react-toggle';
import style from './Header.module.css';

interface HeaderProps {
  tema: 'dark' | 'light';
  alternarTema: () => void;
}

export function Header({ tema, alternarTema }: HeaderProps) {
  return (
    <header className={style.containerHeader}>
      <div className={style.containerConteudoHeader}>
        <h1>CommitFocus</h1>
        <div className={style.conteudoBotoesHeader}>
          <nav className={style.navegacaoPages}>
            <ul>
              <li><a href="#">Início</a></li>
              <li><a href="#">Tarefas</a></li>
              <li><a href="#">Daily</a></li>
            </ul>
          </nav>
          <Toggle.Root
            className={style.botaoTema}
            pressed={tema === 'light'}
            onPressedChange={alternarTema}
            aria-label='Alternar tema claro e escuro'
          >
            <span className={`material-symbols-outlined ${style.iconeHeader}`}>{tema === 'light' ? 'wb_twilight' : 'wb_twilight_2'}</span>
          </Toggle.Root>
        </div>
      </div>
    </header>
  )
}
