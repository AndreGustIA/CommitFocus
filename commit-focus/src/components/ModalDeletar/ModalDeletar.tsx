import * as AlertDialog from '@radix-ui/react-alert-dialog';
import style from './ModalDeletar.module.css';

interface ModalDeletarProps {
  aberto: boolean;
  onOpenChange: (aberto: boolean) => void;
  onConfirmar: () => void;
}

export function ModalDeletar({ aberto, onOpenChange, onConfirmar }: ModalDeletarProps) {
  return (
    <AlertDialog.Root open={aberto} onOpenChange={onOpenChange}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className={style.overlay} />
        <AlertDialog.Content className={style.content}>
          <AlertDialog.Title className={style.titulo}>Deseja realmente deletar todas as tarefas da lista?</AlertDialog.Title>
          <AlertDialog.Description className={style.descricao}>
            Esta ação não poderá ser desfeita.
          </AlertDialog.Description>
          <div className={style.botoes}>
            <AlertDialog.Cancel asChild>
              <button className={style.botaoCancelar}>Cancelar</button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button className={style.botaoDeletar} onClick={onConfirmar}>Deletar</button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
