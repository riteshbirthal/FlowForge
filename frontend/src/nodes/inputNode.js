// inputNode.js
import { useState } from 'react';
import { BaseNode, NodeField, NodeInput, NodeSelect } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Input"
      icon="📥"
      className="node-input-type"
      outputs={[{ id: 'value' }]}
    >
      <NodeField label="Name">
        <NodeInput 
          value={currName} 
          onChange={(e) => setCurrName(e.target.value)} 
          placeholder="Enter name"
        />
      </NodeField>
      <NodeField label="Type">
        <NodeSelect 
          value={inputType} 
          onChange={(e) => setInputType(e.target.value)}
          options={[
            { value: 'Text', label: 'Text' },
            { value: 'File', label: 'File' }
          ]}
        />
      </NodeField>
    </BaseNode>
  );
}
