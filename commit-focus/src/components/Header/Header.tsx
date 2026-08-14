import * as Toggle from '@radix-ui/react-toggle';
import style from './Header.module.css';
import { NavLink } from 'react-router-dom';

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
              <li>
                <NavLink 
                  to="/dashboard"
                  className={({ isActive }) => isActive ? style.linkAtivo : ''}
                >
                Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/tarefas"
                  className={({ isActive }) => isActive ? style.linkAtivo : ''}
                >
                Tarefas
                </NavLink>
              </li>
              <li>
                <NavLink 
                to="/daily"
                className={({ isActive }) => isActive ? style.linkAtivo : ''}
                >
                Daily
                </NavLink>
              </li>
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
