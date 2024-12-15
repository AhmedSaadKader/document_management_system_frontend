// Interfaces for type definitions
interface Item {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
  baseCategoryId?: string | null;
  items?: Item[];
}

interface RootData {
  categories: Category[];
}

// Abstract base class for tree nodes
abstract class AbstractTreeNode {
  depth: number = 0;
  protected _parent: AbstractTreeNode | null = null;
  containedItems: Item[] = [];
  categories: CategoryNode[] = [];

  constructor(containedItems: Item[] = []) {
    this.containedItems = containedItems;
  }

  get root(): AbstractTreeNode {
    const maxDepth = 50;

    const findRoot = (node: AbstractTreeNode): AbstractTreeNode => {
      if (node._parent === null) {
        return node;
      }

      if (node._parent.depth >= maxDepth) {
        throw new Error(`Tree is too deep (exceeds depth of ${maxDepth}).`);
      }

      return findRoot(node._parent);
    };

    return findRoot(this);
  }

  // Abstract method to be implemented by subclasses
  abstract traverse(): (AbstractTreeNode | Item)[];
}

// Category node representing a folder
class CategoryNode extends AbstractTreeNode {
  category: Category;

  constructor(category: Category) {
    super(category.items || []);
    this.category = category;
  }

  set parent(newParent: AbstractTreeNode | null) {
    if (newParent === this._parent) return;

    // Remove from old parent's categories if exists
    if (this._parent) {
      this._parent.categories = this._parent.categories.filter(
        (cat) => cat !== this
      );
    }

    this._parent = newParent;

    // Add to new parent's categories
    if (newParent) {
      newParent.categories.push(this);
      this.depth = newParent.depth + 1;
    }
  }

  get parent(): AbstractTreeNode | null {
    return this._parent;
  }

  traverse(): (AbstractTreeNode | Item)[] {
    return [
      this,
      ...this.containedItems,
      ...this.categories.flatMap((category) => category.traverse()),
    ];
  }
}

// Item node representing a file or specific item
class ItemNode extends AbstractTreeNode {
  item: Item;

  constructor(item: Item) {
    super();
    this.item = item;
  }

  set parent(newParent: AbstractTreeNode | null) {
    this._parent = newParent;
    if (newParent) {
      this.depth = newParent.depth + 1;
    }
  }

  get parent(): AbstractTreeNode | null {
    return this._parent;
  }

  traverse(): (AbstractTreeNode | Item)[] {
    return [this];
  }
}

// Root node for the entire tree structure
class TreeRoot extends AbstractTreeNode {
  rootData: RootData;

  constructor(rootData: RootData) {
    super();
    this.rootData = rootData;
    this.buildTree();
  }

  buildTree(): void {
    const categoryMap = new Map<string, CategoryNode>();
    const orphanNodes = new Map<string, CategoryNode[]>();

    const setParent = (baseCategoryId: string, categoryNode: CategoryNode) => {
      const parent = categoryMap.get(baseCategoryId);
      if (!parent) {
        const orphans = orphanNodes.get(baseCategoryId) || [];
        orphanNodes.set(baseCategoryId, [...orphans, categoryNode]);
      } else {
        categoryNode.parent = parent;
      }
    };

    const handlePossibleParent = (categoryNode: CategoryNode) => {
      const categoryId = categoryNode.category.id;
      const orphans = orphanNodes.get(categoryId) || [];

      orphans.forEach((orphan) => {
        orphan.parent = categoryNode;
      });

      orphanNodes.delete(categoryId);
    };

    // Process categories
    this.rootData.categories.forEach((category) => {
      const categoryNode = new CategoryNode(category);
      categoryMap.set(category.id, categoryNode);

      handlePossibleParent(categoryNode);

      if (!category.baseCategoryId) {
        // Root category
        categoryNode.parent = this;
      } else {
        setParent(category.baseCategoryId, categoryNode);
      }
    });

    if (orphanNodes.size > 0) {
      throw new Error(
        `Unresolved orphan nodes: ${JSON.stringify(Object.fromEntries(orphanNodes))}`
      );
    }
  }

  traverse(): (AbstractTreeNode | Item)[] {
    return this.categories.flatMap((category) => category.traverse());
  }
}

// // Example usage
// function exampleUsage() {
//   const sampleData: RootData = {
//     categories: [
//       {
//         id: 'root',
//         name: 'Documents',
//         baseCategoryId: null,
//         items: [
//           { id: 'doc1', name: 'Report.docx' },
//           { id: 'doc2', name: 'Presentation.pptx' },
//         ],
//       },
//       {
//         id: 'work',
//         name: 'Work',
//         baseCategoryId: 'root',
//         items: [{ id: 'proj1', name: 'Project Proposal.pdf' }],
//       },
//       {
//         id: 'personal',
//         name: 'Personal',
//         baseCategoryId: 'root',
//         items: [{ id: 'budget', name: 'Budget.xlsx' }],
//       },
//       {
//         id: 'subwork',
//         name: 'Ongoing Projects',
//         baseCategoryId: 'work',
//         items: [{ id: 'proj2', name: 'Status Report.docx' }],
//       },
//     ],
//   };

//   const treeRoot = new TreeRoot(sampleData);

//   // Demonstrate traversal
//   console.log('All nodes:', treeRoot.traverse());
// }

// Uncomment to run example
// exampleUsage();
export { AbstractTreeNode, CategoryNode, ItemNode, TreeRoot };
export type { Item, Category, RootData };
