import * as Checkbox from '@radix-ui/react-checkbox';
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import style from './CardTarefa.module.css'

export function CardTarefa() {
  return (
    <div className={style.containerCard}>
      <label className={style.containerCardTarefa} htmlFor="">
        <Checkbox.Root 
          className={style.checkboxRoot}
          >
          <Checkbox.Indicator className={style.checkboxIndicator}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </Checkbox.Indicator>
        </Checkbox.Root>
        <span className={style.textoCardTarefa}>Estudar React</span>
      </label>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className={style.btnAcaoCardTarefa} type='button'>
            <span className={`material-symbols-outlined ${style.iconeCardTarefa}`}>more_vert</span>
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className={style.dropdownContent}
            sideOffset={6}
            align="end"
          >
            <DropdownMenu.Item className={style.dropdownItem}>
              <span className={`material-symbols-outlined ${style.iconesDropTarefa}`}>edit</span>
              <span className={style.textoIconeCardTarefa}>editar</span>
            </DropdownMenu.Item>

            <DropdownMenu.Separator className={style.dropdownSeparator} />

            <DropdownMenu.Item className={style.dropdownItem}>
              <span className={`material-symbols-outlined ${style.iconesDropTarefa}`}>delete</span>
              <span className={style.textoIconeCardTarefa}>excluir</span>
            </DropdownMenu.Item>

          </DropdownMenu.Content>
        </DropdownMenu.Portal>  
      </DropdownMenu.Root>
    </div>
  )
}
