import { OrganizationChart } from 'primereact/organizationchart';
import { useState, useRef, useEffect } from 'react';
import { initializeRoot, sortChildren, transformNode } from '../services/tree';
import { TreeNode } from './TreeNode';
import dataJSON from '../mocks/data.json';

export default function Tree() {
  const treeRef = useRef(null); // Referencia al contenedor del árbol
  const firstNodeRef = useRef(null); // Referencia al primer nodo del árbol

  const initializeWithExpanded = (data, status = true) => {
    const rootNode = initializeRoot(data); // Inicializamos el árbol
    // Aseguramos que el primer nodo esté expandido
    if (rootNode.length > 0) {
      rootNode[0].expanded= status;
    }
    return rootNode;
  };

  const [treeData, setTreeData] = useState(() => initializeWithExpanded(dataJSON.data.attributes, false));

  useEffect(() => {
    // Desplazar al primer nodo después de que el árbol se haya cargado
    if (firstNodeRef.current) {
      firstNodeRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [treeData]);

  const toggleExpand = (node) => {
    setTreeData((prevTree) => {
      return prevTree.map((rootNode) => expandNode(rootNode, node.label));
    });
  };

  const expandNode = (currentNode, nodeLabel) => {
    if (currentNode.label === nodeLabel) {
      const sortedChildren = sortChildren(currentNode.originalChildren).map(transformNode);
      return {
        ...currentNode,
        expanded: !currentNode.expanded,
        children: currentNode.expanded ? [] : sortedChildren
      };
    }

    return {
      ...currentNode,
      children: currentNode.children.map((child) => expandNode(child, nodeLabel))
    };
  };

  const nodeTemplate = (node) => {
    return (
      <TreeNode node={node} toggleExpand={toggleExpand} />
    );
  };

  const showAllTree = () => {
    // primero actualizar el expanden del nodo raíz a true

    setTreeData([initializeWithExpanded(dataJSON.data.attributes)[0]]);

    const expandAllNodes = (node) => {
        node.expanded = true;
      const sortedChildren = sortChildren(node.originalChildren).map(transformNode);
      return {
        ...node,
        expanded: true,
        children: sortedChildren.length > 0 ? sortedChildren.map(expandAllNodes) : [] // Recursividad para expandir los hijos
      };
    };

    setTreeData((prevTree) => prevTree.map((rootNode) => expandAllNodes(rootNode)));
    // Desplazar al nodo raíz
    if (firstNodeRef.current) {

      firstNodeRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const resetTree = () => {


    // poner el atributo 'expanded' del nodo raíz a false

    setTreeData(initializeWithExpanded(dataJSON.data.attributes, true));

  };

  return (
    <div className="tree-container">
      {/* Contenedor del árbol, desplazable hacia abajo */}
      <div className="tree-content" tabIndex="0" ref={treeRef}>
        <OrganizationChart 
          value={treeData} 
          nodeTemplate={nodeTemplate} 
        />
      </div>

      {/* Botones fijos en la parte inferior */}
      <div className="tree-buttons">
        <button onClick={showAllTree}>Show all</button>
        <button onClick={resetTree}>Hide all</button>
      </div>
    </div>
  );
}
