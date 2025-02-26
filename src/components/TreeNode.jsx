export const TreeNode = ({ node, toggleExpand }) => {
  const statusColor = node.data.status === 'Active' ? 'green' : 'red';
  return (
    <div className="node-container">
      <div className="node-header" style={{ color: statusColor }}>
        {node.label}
      </div>
      <div className="node-content">
        <div><strong>{node.data.name}</strong></div>
        {node.expanded && (
          <>
            <div><strong>Product:</strong> {node.data.producto}</div>
            <div><strong>Category:</strong> {node.data.categoria}</div>
            <div><strong>Status:</strong> <span style={{ color: statusColor }}>{node.data.status}</span></div>
          </>
        )}
        <button onClick={() => toggleExpand(node)} style={{ marginTop: '10px' }}>
          {node.expanded ? 'Hide details' : 'Show details'}
        </button>
      </div>
    </div>
  )
}
