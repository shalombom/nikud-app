export default function NikudTile({ width = 80, height = 120, children, onClick, className = '' }) {
  return (
    <div
      onClick={onClick}
      className={`nikud-tile ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        margin: '5px',
        position: 'relative',
        display: 'inline-block'
      }}
    >
      <div className="nikud-sign-container">
        {children}
      </div>
    </div>
  );
}