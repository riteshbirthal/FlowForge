# FlowForge 🔧

**A Visual Pipeline Builder for Creating Node-Based Workflows**

FlowForge is a modern, intuitive drag-and-drop pipeline builder that enables users to create complex workflows by connecting modular nodes. Built with React and FastAPI, it provides a seamless experience for designing, visualizing, and validating data pipelines.

![FlowForge Banner](https://via.placeholder.com/1200x400/1e293b/6366f1?text=FlowForge+-+Visual+Pipeline+Builder)

---

## ✨ Features

### 🧩 Node-Based Architecture
- **9 Pre-built Node Types**: Input, Output, LLM, Text, API, Filter, Math, Condition, Timer
- **Extensible Framework**: Create custom nodes in ~20 lines of code
- **Dynamic Connections**: Visual edge connections with animated flows

### 📝 Smart Text Node
- **Dynamic Sizing**: Auto-adjusts width/height based on content
- **Variable Detection**: Automatically creates input handles for `{{variables}}`
- **JavaScript Validation**: Only valid variable names are processed

### 🎨 Modern UI/UX
- **Dark Theme**: Professional dark interface with indigo accents
- **Color-Coded Handles**: Green for inputs, orange for outputs
- **Smooth Animations**: Hover effects, transitions, and visual feedback
- **Node Deletion**: Easy removal with × button in header

### ⚙️ Backend Integration
- **RESTful API**: FastAPI backend for pipeline processing
- **DAG Validation**: Kahn's algorithm detects circular dependencies
- **Real-time Stats**: Live node and edge count display

---

## 🖼️ Screenshots

| Pipeline Builder | Node Types | DAG Validation |
|------------------|------------|----------------|
| ![Builder](https://via.placeholder.com/300x200/0f172a/6366f1?text=Pipeline+Canvas) | ![Nodes](https://via.placeholder.com/300x200/0f172a/10b981?text=Node+Library) | ![Validation](https://via.placeholder.com/300x200/0f172a/ef4444?text=DAG+Check) |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18, ReactFlow 11.8 |
| **State Management** | Zustand |
| **Backend** | Python 3.x, FastAPI |
| **Styling** | CSS3 with Custom Properties |

---

## 📦 Installation

### Prerequisites
- Node.js 16+ and npm
- Python 3.8+
- pip
- Docker & Docker Compose (optional)

---

### 🐳 Option 1: Docker (Recommended)

The easiest way to run FlowForge is using Docker Compose:

```bash
# Clone the repository
git clone https://github.com/yourusername/flowforge.git
cd flowforge

# Start with Docker Compose (development mode)
docker-compose up --build

# Or run in detached mode
docker-compose up -d --build
```

Access the application:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000

#### Production Build

```bash
# Build production image
docker build -t flowforge:latest .

# Run production container
docker run -p 80:80 flowforge:latest
```

Access at http://localhost

---

### 💻 Option 2: Manual Setup

#### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

The frontend will be available at `http://localhost:3000`

#### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the server
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

---

## 🚀 Usage

### Creating a Pipeline

1. **Add Nodes**: Drag nodes from the toolbar onto the canvas
2. **Connect Nodes**: Click and drag from output handles (orange) to input handles (green)
3. **Configure Nodes**: Fill in node-specific fields (names, types, values)
4. **Delete Nodes**: Click the × button in any node's header to remove it
5. **Validate Pipeline**: Click "Submit Pipeline" to check for cycles

### Using the Text Node

The Text node supports dynamic variables:

```
Hello {{name}}, your order {{orderId}} is ready!
```

This automatically creates two input handles: `name` and `orderId`

### Variable Rules
- Must be valid JavaScript identifiers
- Cannot be reserved keywords (`var`, `let`, `const`, etc.)
- Whitespace is trimmed: `{{ name }}` equals `{{name}}`

---

## 📁 Project Structure

```
FlowForge/
├── frontend/
│   ├── src/
│   │   ├── nodes/
│   │   │   ├── BaseNode.js       # Core abstraction component
│   │   │   ├── nodeStyles.css    # Unified node styling
│   │   │   ├── inputNode.js      # Data input node
│   │   │   ├── outputNode.js     # Data output node
│   │   │   ├── llmNode.js        # LLM processor node
│   │   │   ├── textNode.js       # Dynamic text node
│   │   │   ├── apiNode.js        # HTTP request node
│   │   │   ├── filterNode.js     # Data filter node
│   │   │   ├── mathNode.js       # Math operations node
│   │   │   ├── conditionNode.js  # Conditional branch node
│   │   │   └── timerNode.js      # Delay/timer node
│   │   ├── App.js
│   │   ├── ui.js                 # ReactFlow canvas
│   │   ├── toolbar.js            # Node palette
│   │   ├── draggableNode.js      # Draggable node component
│   │   ├── submit.js             # Submit button + API call
│   │   ├── store.js              # Zustand state management
│   │   └── index.css             # Global styles
│   └── package.json
│
├── backend/
│   ├── main.py                   # FastAPI application
│   └── venv/                     # Virtual environment
│
├── VectorShift_Presentation.pptx # Project presentation
├── VectorShift_Documentation.docx # Detailed documentation
└── README.md
```

---

## 🔌 API Reference

### Check Pipeline

Validates a pipeline and returns statistics.

**Endpoint:** `POST /pipelines/parse`

**Request Body:**
```json
{
  "nodes": [
    { "id": "input-1", "type": "customInput", "position": {...}, "data": {...} },
    { "id": "llm-1", "type": "llm", "position": {...}, "data": {...} }
  ],
  "edges": [
    { "source": "input-1", "target": "llm-1", "sourceHandle": "...", "targetHandle": "..." }
  ]
}
```

**Response:**
```json
{
  "num_nodes": 2,
  "num_edges": 1,
  "is_dag": true
}
```

| Field | Type | Description |
|-------|------|-------------|
| `num_nodes` | int | Total number of nodes in pipeline |
| `num_edges` | int | Total number of connections |
| `is_dag` | bool | Whether pipeline is a valid DAG (no cycles) |

---

## 🧩 Creating Custom Nodes

FlowForge's abstraction makes creating new nodes simple:

```jsx
import { useState } from 'react';
import { BaseNode, NodeField, NodeInput } from './BaseNode';

export const MyCustomNode = ({ id, data }) => {
  const [value, setValue] = useState(data?.value || '');

  return (
    <BaseNode
      id={id}
      title="My Node"
      icon="⭐"
      className="node-custom-type"
      inputs={[{ id: 'input' }]}
      outputs={[{ id: 'output' }]}
    >
      <NodeField label="Value">
        <NodeInput 
          value={value} 
          onChange={(e) => setValue(e.target.value)} 
        />
      </NodeField>
    </BaseNode>
  );
};
```

Then register it in `ui.js`:
```jsx
const nodeTypes = {
  // ... existing nodes
  myCustom: MyCustomNode,
};
```

And add to toolbar in `toolbar.js`:
```jsx
<DraggableNode type='myCustom' label='My Node' icon='⭐' />
```

---

## 🎨 Theming

### Color Palette

| Variable | Color | Usage |
|----------|-------|-------|
| Background | `#0f172a` | Main canvas |
| Surface | `#1e293b` | Node backgrounds |
| Border | `#334155` | Default borders |
| Accent | `#6366f1` | Primary actions, highlights |
| Success | `#22c55e` | Input handles |
| Warning | `#f59e0b` | Output handles |
| Error | `#ef4444` | Delete buttons, alerts |

### Node Type Colors

| Node Type | Header Gradient |
|-----------|-----------------|
| Input | Green (`#059669` → `#10b981`) |
| Output | Red (`#dc2626` → `#ef4444`) |
| LLM | Purple (`#7c3aed` → `#8b5cf6`) |
| Text | Blue (`#0284c7` → `#0ea5e9`) |
| API | Orange (`#d97706` → `#f59e0b`) |
| Filter | Cyan (`#0891b2` → `#06b6d4`) |
| Math | Magenta (`#c026d3` → `#d946ef`) |
| Condition | Orange-Red (`#ea580c` → `#f97316`) |
| Timer | Indigo (`#4338ca` → `#6366f1`) |

---

## 🧪 DAG Validation Algorithm

FlowForge uses **Kahn's Algorithm** to detect cycles:

```python
def is_dag(nodes, edges):
    # 1. Build adjacency list and in-degree count
    # 2. Start with nodes having in-degree = 0
    # 3. Process queue, decrementing neighbor in-degrees
    # 4. If all nodes visited → DAG (no cycles)
    return visited_count == len(nodes)
```

**Why DAG matters:** Pipelines with cycles would create infinite loops during execution. FlowForge validates this before processing.

---

## 📋 Available Scripts

### Frontend

| Command | Description |
|---------|-------------|
| `npm start` | Start development server |
| `npm run build` | Build for production |
| `npm test` | Run test suite |

### Backend

| Command | Description |
|---------|-------------|
| `uvicorn main:app --reload` | Start with hot-reload |
| `uvicorn main:app` | Start production server |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style and patterns
- Add comments for complex logic
- Test new nodes with various connection scenarios
- Ensure DAG validation works with new node types

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [ReactFlow](https://reactflow.dev/) - Powerful library for node-based UIs
- [Zustand](https://github.com/pmndrs/zustand) - Lightweight state management
- [FastAPI](https://fastapi.tiangolo.com/) - Modern Python web framework
- [VectorShift](https://vectorshift.ai/) - Inspiration for pipeline builder design

---

<p align="center">
  Made with ❤️ by FlowForge Team
</p>

<p align="center">
  <a href="#flowforge-">Back to Top ↑</a>
</p>
