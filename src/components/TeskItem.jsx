import { startTransition, useOptimistic } from "react";

export default function TaskItem({ task, onToggle }) {
    const [concluida, setOptmisticConcluida] = useOptimistic(task.concluida);

    const handleToggle = () => {
        startTransition(async () => {
            setOptmisticConcluida(!task.concluida);
            await onToggle({ task });
        });
    };

    let className = "task";
    if (task.concluida) {
        className += " task--done";
    }
    return (
        <li className={className}>
            <div className="task__check">
                <input 
                    type="checkbox"
                    className="checkbox"
                    checked={concluida}
                    onChange={handleToggle}
                    aria-label={`Concluir: ${task.titulo}`}
                />
            </div>
            
            <div className="task__body">
                <span className="task__title">{task.titulo}</span>

                {task.descricao && <p className="task__description">{task.descricao}</p>}
            </div>

            <div className="task__actions">
                <button className="task-action" aria-label={`Editar: ${task.titulo}`}>
                    Editar
                </button>
                <button className="task-action task--action--danger" aria-label={`Remover: ${task.titulo}`}>
                    Remover
                </button>
            </div>
        </li>
    )
}