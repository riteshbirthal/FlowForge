// conditionNode.js - Conditional Branch Node
import { useState } from 'react';
import { BaseNode, NodeField, NodeInput, NodeSelect } from './BaseNode';

export const ConditionNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'equals');
  const [value, setValue] = useState(data?.value || '');

  return (
    <BaseNode
      id={id}
      title="Condition"
      icon="🔀"
      className="node-condition-type"
      inputs={[{ id: 'input' }]}
      outputs={[{ id: 'true' }, { id: 'false' }]}
    >
      <NodeField label="Condition">
        <NodeSelect 
          value={condition} 
          onChange={(e) => setCondition(e.target.value)}
          options={[
            { value: 'equals', label: 'Equals' },
            { value: 'notEquals', label: 'Not Equals' },
            { value: 'isEmpty', label: 'Is Empty' },
            { value: 'isNotEmpty', label: 'Is Not Empty' },
            { value: 'contains', label: 'Contains' }
          ]}
        />
      </NodeField>
      <NodeField label="Compare Value">
        <NodeInput 
          value={value} 
          onChange={(e) => setValue(e.target.value)} 
          placeholder="Value to compare"
        />
      </NodeField>
    </BaseNode>
  );
}
