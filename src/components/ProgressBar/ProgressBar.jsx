import './ProgressBar.css';

export const ProgressBar = ({ value = 0, withBorder }) => {
  return (
    <div className={`progress-bar ${withBorder ? 'border' : ''}`}>
      <progress id="progress" value={Math.abs(value)} max="100">
        {value}
      </progress>
      <div
        className="progress-bar-indicator"
        style={{ transform: `scaleX(${Math.abs(value)}%)` }}
      ></div>
    </div>
  );
};
