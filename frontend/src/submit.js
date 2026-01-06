// submit.js
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import './submit.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
    clearPipeline: state.clearPipeline,
});

export const SubmitButton = () => {
    const { nodes, edges, clearPipeline } = useStore(selector, shallow);

    const handleClear = () => {
        if (nodes.length === 0 && edges.length === 0) {
            return;
        }
        if (window.confirm('Are you sure you want to clear the entire pipeline? This action cannot be undone.')) {
            clearPipeline();
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(`${API_URL}/pipelines/parse`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error('Failed to parse pipeline');
            }

            const result = await response.json();
            
            const alertMessage = `Pipeline Analysis Results:
            
• Number of Nodes: ${result.num_nodes}
• Number of Edges: ${result.num_edges}
• Is Valid DAG: ${result.is_dag ? 'Yes ✓' : 'No ✗'}

${result.is_dag 
    ? 'Your pipeline is a valid Directed Acyclic Graph!' 
    : 'Warning: Your pipeline contains cycles. Consider reviewing the connections.'}`;
            
            alert(alertMessage);
        } catch (error) {
            alert(`Error: ${error.message}\n\nMake sure the backend server is running at ${API_URL}`);
        }
    };

    return (
        <div className="submit-container">
            <button 
                className="clear-button" 
                onClick={handleClear}
                disabled={nodes.length === 0 && edges.length === 0}
                title="Clear all nodes and edges"
            >
                <span className="clear-icon">🗑️</span>
                Clear
            </button>
            <div className="submit-stats">
                <span className="stat">Nodes: {nodes.length}</span>
                <span className="stat">Edges: {edges.length}</span>
                <span className="stat saved-indicator">💾 Auto-saved</span>
            </div>
            <button className="submit-button" onClick={handleSubmit}>
                <span className="submit-icon">▶</span>
                Submit Pipeline
            </button>
        </div>
    );
}
