import { useEffect, useState } from "react";
import styles from "./Toast.module.css";

export type ToastType = 'sucesso' | 'erro' | 'deletar';

interface ToastProps {
  titulo: string;
  mensagem: string;
  tipo: ToastType;
  onClose: () => void;
  duracao?: number;
}

export function Toast({ titulo, mensagem, tipo, onClose, duracao = 3000 }: ToastProps) {
  const [saindo, setSaindo] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSaindo(true);
    }, duracao);

    return () => clearTimeout(timer);
  }, [duracao]);

  const handleAnimationEnd = () => {
    if (saindo) {
      onClose();
    }
  };

  const renderIcon = () => {
    switch (tipo) {
      case 'sucesso':
        return <span className="material-symbols-outlined">check_circle</span>;
      case 'deletar':
        return <span className="material-symbols-outlined">delete_forever</span>;
      case 'erro':
        return <span className="material-symbols-outlined">error</span>;
    }
  };

  return (
    <div className={`
      ${styles.toastContainer} 
      ${saindo ? styles.saindo : styles.entrando}`}
      onAnimationEnd={handleAnimationEnd}
      >
      <div className={styles.icone}>
        {renderIcon()}
      </div>
      <div className={styles.conteudo}>
        <strong>{titulo}</strong>
        <p>{mensagem}</p>
      </div>
    </div>
  )
}
