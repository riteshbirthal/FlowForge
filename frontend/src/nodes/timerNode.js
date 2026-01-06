// timerNode.js - Timer/Delay Node
import { useState } from 'react';
import { BaseNode, NodeField, NodeInput, NodeSelect } from './BaseNode';

export const TimerNode = ({ id, data }) => {
  const [delay, setDelay] = useState(data?.delay || '1000');
  const [unit, setUnit] = useState(data?.unit || 'ms');

  return (
    <BaseNode
      id={id}
      title="Timer"
      icon="⏱️"
      className="node-timer-type"
      inputs={[{ id: 'trigger' }]}
      outputs={[{ id: 'output' }]}
    >
      <NodeField label="Delay">
        <NodeInput 
          value={delay} 
          onChange={(e) => setDelay(e.target.value)} 
          placeholder="1000"
          type="number"
        />
      </NodeField>
      <NodeField label="Unit">
        <NodeSelect 
          value={unit} 
          onChange={(e) => setUnit(e.target.value)}
          options={[
            { value: 'ms', label: 'Milliseconds' },
            { value: 's', label: 'Seconds' },
            { value: 'm', label: 'Minutes' }
          ]}
        />
      </NodeField>
    </BaseNode>
  );
}
