import './ProgressBar.css';

export const ProgressBar = ({ value = 0, withBorder }) => {
  return (
    <div className={`LL-ProgressBar ${withBorder ? 'border' : ''}`}>
      <progress
        id="LL-Progress"
        value={Math.abs(Number(value))}
        max="100"
        aria-controls="LL-ProgressBarIndicator"
        aria-describedby="LL-ProgressValue"
      >
        <span id="LL-ProgressValue" aria-hidden="true">
          {value}
        </span>
      </progress>
      <div
        id="LL-ProgressBarIndicator"
        className={`LL-ProgressBarIndicator ${
          value === 100 ? 'LL-ProgressComplete' : 'LL-UnderProgress'
        }`}
        style={{ transform: `scaleX(${Math.abs(value)}%)` }}
        aria-labelledby="LL-ProgressValue"
      ></div>
    </div>
  );
};
