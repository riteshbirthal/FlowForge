// toolbar.js
import { DraggableNode } from './draggableNode';
import './toolbar.css';

const Logo = () => (
    <svg viewBox="0 0 64 64" className="toolbar-logo">
        <defs>
            <linearGradient id="logoBg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor:'#4f46e5'}}/>
                <stop offset="100%" style={{stopColor:'#6366f1'}}/>
            </linearGradient>
        </defs>
        <rect width="64" height="64" rx="14" fill="url(#logoBg)"/>
        <rect x="6" y="6" width="52" height="52" rx="10" fill="#0f172a"/>
        <rect x="12" y="14" width="16" height="10" rx="2" fill="#1e293b" stroke="#22c55e" strokeWidth="1.5"/>
        <circle cx="28" cy="19" r="2.5" fill="#22c55e"/>
        <rect x="24" y="27" width="16" height="10" rx="2" fill="#1e293b" stroke="#6366f1" strokeWidth="1.5"/>
        <circle cx="24" cy="32" r="2.5" fill="#22c55e"/>
        <circle cx="40" cy="32" r="2.5" fill="#f59e0b"/>
        <rect x="36" y="40" width="16" height="10" rx="2" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5"/>
        <circle cx="36" cy="45" r="2.5" fill="#22c55e"/>
        <path d="M28 19 Q 28 23, 24 32" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round"/>
        <path d="M40 32 Q 40 38, 36 45" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="32" cy="22" r="1.5" fill="#f59e0b"/>
        <circle cx="44" cy="38" r="1.5" fill="#f59e0b"/>
    </svg>
);

export const PipelineToolbar = () => {
    return (
        <div className="toolbar">
            <div className="toolbar-header">
                <div className="toolbar-brand">
                    <Logo />
                    <div className="toolbar-brand-text">
                        <h1 className="toolbar-title">FlowForge</h1>
                        <p className="toolbar-subtitle">Visual Pipeline Builder</p>
                    </div>
                </div>
            </div>
            <div className="toolbar-divider"></div>
            <div className="toolbar-section">
                <span className="toolbar-section-title">Nodes</span>
                <p className="toolbar-section-hint">Drag to canvas</p>
            </div>
            <div className="toolbar-nodes">
                <DraggableNode type='customInput' label='Input' icon='📥' />
                <DraggableNode type='customOutput' label='Output' icon='📤' />
                <DraggableNode type='llm' label='LLM' icon='🤖' />
                <DraggableNode type='text' label='Text' icon='📝' />
                <DraggableNode type='api' label='API' icon='🌐' />
                <DraggableNode type='filter' label='Filter' icon='🔍' />
                <DraggableNode type='math' label='Math' icon='🔢' />
                <DraggableNode type='condition' label='Condition' icon='🔀' />
                <DraggableNode type='timer' label='Timer' icon='⏱️' />
            </div>
        </div>
    );
};
