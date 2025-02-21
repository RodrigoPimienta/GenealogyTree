// Transforma solo el nodo raíz sin hijos inicialmente
const initializeRoot = (distributors) => {
    if (!distributors || distributors.length === 0) return [];

    const rootDistributor = distributors[0];

    return [
        {
            ...transformNode(rootDistributor),
            children: []
        }
    ];
};

const transformNode = (distributor) => {
    const { full_name, username, status, product_name, category_name, binary_placement, children } = distributor;

    return {
        label: full_name,
        type: 'person',
        className: binary_placement === 'left' ? 'p-left' : 'p-right', 
        expanded: false,
        data: {
            name: username,
            status,
            producto: product_name || 'N/A',
            categoria: category_name || 'N/A',
        },
        originalChildren: children || [], 
        children: []
    };
};

const sortChildren = (children) => {
    if (children.length < 2) return children;

    const [firstChild, secondChild] = children;

    if (firstChild.binary_placement === 'Right' && secondChild.binary_placement === 'Left') {
        return [secondChild, firstChild];
    }

    return children;
};

export { initializeRoot, transformNode, sortChildren };