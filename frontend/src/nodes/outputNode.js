// outputNode.js
import { useState } from 'react';
import { BaseNode, NodeField, NodeInput, NodeSelect } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Output"
      icon="📤"
      className="node-output-type"
      inputs={[{ id: 'value' }]}
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
          value={outputType} 
          onChange={(e) => setOutputType(e.target.value)}
          options={[
            { value: 'Text', label: 'Text' },
            { value: 'Image', label: 'Image' }
          ]}
        />
      </NodeField>
    </BaseNode>
  );
}
