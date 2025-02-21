// Transforma solo el nodo raíz sin hijos inicialmente
const initializeRoot = (distributors) => {
    if (!distributors || distributors.length === 0) return [];

    const rootDistributor = distributors[0];

    return [
        {
            ...transformNode(rootDistributor),
            children: [] // No carga hijos al inicio
        }
    ];
};

// Función que transforma un distribuidor en un nodo del árbol
const transformNode = (distributor) => {
    const { full_name, username, status, product_name, category_name, binary_placement, children } = distributor;

    return {
        label: full_name,
        type: 'person',
        className: binary_placement === 'left' ? 'p-left' : 'p-right', // Clases para la posición
        expanded: false,
        data: {
            name: username,
            status,
            producto: product_name || 'N/A',
            categoria: category_name || 'N/A',
        },
        originalChildren: children || [], // Guarda los hijos originales pero sin mostrarlos al inicio
        children: []
    };
};

// Reorganiza los hijos según binary_placement
const sortChildren = (children) => {
    if (children.length < 2) return children;

    const [firstChild, secondChild] = children;

    // Si el primer hijo es "right" y el segundo es "left", los intercambiamos
    if (firstChild.binary_placement === 'Right' && secondChild.binary_placement === 'Left') {
        return [secondChild, firstChild];
    }

    return children;
};

export { initializeRoot, transformNode, sortChildren };