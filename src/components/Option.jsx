import './Option.css';

function Option({ text, selected, onClick }) {
  return (
    <div className={`option-container ${selected ? 'selected' : ''}`} onClick={onClick}>
      <span className="option-text">{text}</span>
      <span className={`radio-circle ${selected ? 'checked' : ''}`}></span>
    </div>
  );
}

export default Option;
