// llmNode.js
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      icon="🤖"
      className="node-llm-type"
      inputs={[{ id: 'system' }, { id: 'prompt' }]}
      outputs={[{ id: 'response' }]}
    >
      <p className="node-info">
        Large Language Model processor. Connect system prompt and user prompt to generate responses.
      </p>
    </BaseNode>
  );
}
