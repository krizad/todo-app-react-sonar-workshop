import PropTypes from 'prop-types';

const ProgressBar = ({ completedCount, totalCount, progress }) => {
  return (
    <div className="progress-container">
      <div className="stats">
        <span>Progress</span>
        <span>{completedCount} of {totalCount} tasks</span>
      </div>
      <progress 
        className="todo-progress" 
        value={completedCount} 
        max={totalCount}
        aria-label="Task completion progress"
      >
        {progress}%
      </progress>
    </div>
  );
};

ProgressBar.propTypes = {
  completedCount: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  progress: PropTypes.number.isRequired,
};

export default ProgressBar;
