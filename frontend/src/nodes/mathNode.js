// mathNode.js - Math Operation Node
import { useState } from 'react';
import { BaseNode, NodeField, NodeSelect } from './BaseNode';

export const MathNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'add');

  return (
    <BaseNode
      id={id}
      title="Math"
      icon="🔢"
      className="node-math-type"
      inputs={[{ id: 'a' }, { id: 'b' }]}
      outputs={[{ id: 'result' }]}
    >
      <NodeField label="Operation">
        <NodeSelect 
          value={operation} 
          onChange={(e) => setOperation(e.target.value)}
          options={[
            { value: 'add', label: 'Add (+)' },
            { value: 'subtract', label: 'Subtract (-)' },
            { value: 'multiply', label: 'Multiply (×)' },
            { value: 'divide', label: 'Divide (÷)' },
            { value: 'modulo', label: 'Modulo (%)' },
            { value: 'power', label: 'Power (^)' }
          ]}
        />
      </NodeField>
      <p className="node-info">
        Performs mathematical operations on two input values.
      </p>
    </BaseNode>
  );
}
