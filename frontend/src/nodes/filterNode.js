// filterNode.js - Data Filter Node
import { useState } from 'react';
import { BaseNode, NodeField, NodeInput, NodeSelect } from './BaseNode';

export const FilterNode = ({ id, data }) => {
  const [field, setField] = useState(data?.field || '');
  const [operator, setOperator] = useState(data?.operator || 'equals');

  return (
    <BaseNode
      id={id}
      title="Filter"
      icon="🔍"
      className="node-filter-type"
      inputs={[{ id: 'data' }]}
      outputs={[{ id: 'filtered' }, { id: 'rejected' }]}
    >
      <NodeField label="Field">
        <NodeInput 
          value={field} 
          onChange={(e) => setField(e.target.value)} 
          placeholder="field_name"
        />
      </NodeField>
      <NodeField label="Operator">
        <NodeSelect 
          value={operator} 
          onChange={(e) => setOperator(e.target.value)}
          options={[
            { value: 'equals', label: 'Equals' },
            { value: 'contains', label: 'Contains' },
            { value: 'gt', label: 'Greater Than' },
            { value: 'lt', label: 'Less Than' }
          ]}
        />
      </NodeField>
    </BaseNode>
  );
}
