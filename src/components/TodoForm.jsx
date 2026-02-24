import PropTypes from 'prop-types';

const TodoForm = ({ inputValue, setInputValue, onAddTodo }) => {
  return (
    <form onSubmit={onAddTodo} className="todo-input-container">
      <label htmlFor="todo-input" className="visually-hidden">
        Add a task
      </label>
      <input
        id="todo-input"
        type="text"
        className="todo-input"
        placeholder="Add a new task..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit" className="add-button">
        Add
      </button>
    </form>
  );
};

TodoForm.propTypes = {
  inputValue: PropTypes.string.isRequired,
  setInputValue: PropTypes.func.isRequired,
  onAddTodo: PropTypes.func.isRequired,
};

export default TodoForm;
