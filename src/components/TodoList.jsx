import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onToggle, onDelete }) => {
  const sortedTodos = [...todos].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <ul className="todo-list">
      {sortedTodos.map((todo) => (
        <TodoItem 
          key={todo.id} 
          todo={todo} 
          onToggle={onToggle} 
          onDelete={onDelete} 
        />
      ))}
      {todos.length === 0 && (
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '1rem' }}>
          No tasks yet. Add one above!
        </p>
      )}
    </ul>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    createdAt: PropTypes.string.isRequired,
  })).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TodoList;
