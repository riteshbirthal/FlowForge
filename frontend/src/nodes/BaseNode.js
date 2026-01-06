// BaseNode.js - Node Abstraction Component
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';
import './nodeStyles.css';

export const BaseNode = ({ 
  id, 
  title, 
  icon,
  children, 
  inputs = [], 
  outputs = [],
  className = '',
  style = {}
}) => {
  const deleteNode = useStore((state) => state.deleteNode);

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteNode(id);
  };

  return (
    <div className={`base-node ${className}`} style={style}>
      <div className="node-header">
        {icon && <span className="node-icon">{icon}</span>}
        <span className="node-title">{title}</span>
        <button 
          className="node-delete-btn" 
          onClick={handleDelete}
          title="Delete node"
        >
          ×
        </button>
      </div>
      <div className="node-content">
        {children}
      </div>
      {inputs.map((input, index) => (
        <Handle
          key={`input-${input.id}`}
          type="target"
          position={Position.Left}
          id={`${id}-${input.id}`}
          style={{ top: `${((index + 1) * 100) / (inputs.length + 1)}%` }}
          className="node-handle input-handle"
        />
      ))}
      {outputs.map((output, index) => (
        <Handle
          key={`output-${output.id}`}
          type="source"
          position={Position.Right}
          id={`${id}-${output.id}`}
          style={{ top: `${((index + 1) * 100) / (outputs.length + 1)}%` }}
          className="node-handle output-handle"
        />
      ))}
    </div>
  );
};

// Reusable form field components
export const NodeField = ({ label, children }) => (
  <div className="node-field">
    <label className="node-label">{label}</label>
    {children}
  </div>
);

export const NodeInput = ({ value, onChange, placeholder = '', type = 'text' }) => (
  <input
    type={type}
    className="node-input"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
  />
);

export const NodeSelect = ({ value, onChange, options }) => (
  <select className="node-select" value={value} onChange={onChange}>
    {options.map(opt => (
      <option key={opt.value} value={opt.value}>{opt.label}</option>
    ))}
  </select>
);

export const NodeTextArea = ({ value, onChange, placeholder = '', style = {} }) => (
  <textarea
    className="node-textarea"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    style={style}
  />
);
