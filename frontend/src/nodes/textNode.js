// textNode.js
import { useState, useEffect, useRef, useMemo } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';
import './nodeStyles.css';

const isValidJSVariableName = (name) => {
  const trimmed = name.trim();
  if (!trimmed) return false;
  const validPattern = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;
  const reserved = ['break', 'case', 'catch', 'continue', 'debugger', 'default', 
    'delete', 'do', 'else', 'finally', 'for', 'function', 'if', 'in', 'instanceof',
    'new', 'return', 'switch', 'this', 'throw', 'try', 'typeof', 'var', 'void',
    'while', 'with', 'class', 'const', 'enum', 'export', 'extends', 'import', 
    'super', 'implements', 'interface', 'let', 'package', 'private', 'protected',
    'public', 'static', 'yield'];
  return validPattern.test(trimmed) && !reserved.includes(trimmed);
};

const extractVariables = (text) => {
  const regex = /\{\{\s*([^}]+)\s*\}\}/g;
  const variables = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    const varName = match[1].trim();
    if (isValidJSVariableName(varName) && !variables.includes(varName)) {
      variables.push(varName);
    }
  }
  return variables;
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const textareaRef = useRef(null);
  const deleteNode = useStore((state) => state.deleteNode);
  
  const variables = useMemo(() => extractVariables(currText), [currText]);

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteNode(id);
  };

  const calculateDimensions = () => {
    const lines = currText.split('\n');
    const lineCount = lines.length;
    const maxLineLength = Math.max(...lines.map(line => line.length));
    const width = Math.max(220, Math.min(400, maxLineLength * 8 + 40));
    const height = Math.max(80, Math.min(300, lineCount * 20 + 100 + variables.length * 20));
    return { width, height };
  };

  const { width, height } = calculateDimensions();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [currText]);

  return (
    <div className="base-node node-text-type" style={{ width, minHeight: height }}>
      <div className="node-header">
        <span className="node-icon">📝</span>
        <span className="node-title">Text</span>
        <button 
          className="node-delete-btn" 
          onClick={handleDelete}
          title="Delete node"
        >
          ×
        </button>
      </div>
      <div className="node-content">
        <div className="node-field">
          <label className="node-label">Content</label>
          <textarea
            ref={textareaRef}
            className="node-textarea"
            value={currText}
            onChange={(e) => setCurrText(e.target.value)}
            placeholder="Enter text with {{variables}}"
            style={{ minHeight: '60px' }}
          />
        </div>
        {variables.length > 0 && (
          <div className="node-info" style={{ marginTop: '8px' }}>
            Variables: {variables.join(', ')}
          </div>
        )}
      </div>
      
      {/* Dynamic variable handles on the left */}
      {variables.map((variable, index) => (
        <Handle
          key={`var-${variable}`}
          type="target"
          position={Position.Left}
          id={`${id}-${variable}`}
          style={{ top: `${((index + 1) * 100) / (variables.length + 1)}%` }}
          className="node-handle input-handle"
        />
      ))}
      
      {/* Output handle on the right */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        className="node-handle output-handle"
      />
    </div>
  );
}
