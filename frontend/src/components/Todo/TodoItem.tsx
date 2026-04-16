import { Todo } from "../../types/todo";
import Button from "../common/Button";

import binIcon from "../../assets/bin.svg";

type CompleteTodoHandler = (id: string) => void;

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const TodoItem = ({
  todo,
  id,
  markAsDone,
  deleteTodoHandler,
}: {
  todo: Todo;
  id: string;
  markAsDone: CompleteTodoHandler;
  deleteTodoHandler: CompleteTodoHandler;
}) => {
  return (
    <div className={classNames("todo-item", todo.completed ? "completed" : "")}>
      <div className="todo-item-content">
        <p className="todo-item-title">{todo.title}</p>
        <p className="todo-item-desc">{todo.description}</p>
      </div>
      <div className="todo-item-actions">
        <button
          className="todo-item-delete"
          onClick={() => deleteTodoHandler(id)}
        >
          <img src={binIcon} alt="delete" />
        </button>

        <Button
          variant="success"
          text="Done"
          disabled={todo.completed}
          onClick={() => markAsDone(id)}
        ></Button>
      </div>
    </div>
  );
};

export default TodoItem;
