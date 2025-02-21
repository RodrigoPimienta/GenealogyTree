
export const TreeNode = ({node, toggleExpand}) => {
    const statusColor = node.data.status === 'Active' ? 'green' : 'red';
  return (
        <div className="node-container">
          <div className="node-header" style={{ color: statusColor }}>
            {node.label}
          </div>
          <div className="node-content">
            <div><strong>Usuario:</strong> {node.data.name}</div>
            {node.expanded && (
              <>
                <div><strong>Producto:</strong> {node.data.producto}</div>
                <div><strong>Categoría:</strong> {node.data.categoria}</div>
                <div><strong>Estado:</strong> <span style={{ color: statusColor }}>{node.data.status}</span></div>
              </>
            )}
            <button onClick={() => toggleExpand(node)} style={{ marginTop: '10px' }}>
              {node.expanded ? 'Ocultar detalles' : 'Ver detalles'}
            </button>
          </div>
        </div>
  )
}
