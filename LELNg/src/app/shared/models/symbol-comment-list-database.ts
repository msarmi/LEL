import { SymbolCommentNode } from './symbol-comment-node';
import {BehaviorSubject} from 'rxjs';
import {Component, Injectable} from '@angular/core';

/**
 * The Json object for to-do list data.
 */
const TREE_DATA = {
    Groceries: {
      'Almond Meal flour': null,
      'Organic eggs': null,
      'Protein Powder': null,
      Fruits: {
        Apple: null,
        Berries: ['Blueberry', 'Raspberry'],
        Orange: null
      }
    },
    Reminders: [
      'Cook dinner',
      'Read the Material Design spec',
      'Upgrade Application to Angular'
    ]
  };

  /**
   * Checklist database, it can build a tree structured Json object.
   * Each node in Json object represents a to-do item or a category.
   * If a node is a category, it has children items and new items can be added under the category.
   */
  @Injectable()
  export class SymbolCommentListDatabase {
    dataChange = new BehaviorSubject<SymbolCommentNode[]>([]);

    get data(): SymbolCommentNode[] { return this.dataChange.value; }

    constructor() {
      this.initialize();
    }

    initialize() {
      // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
      //     file node as children.
      const data = this.buildFileTree(TREE_DATA, 0);
      // const jsonReference = `{"id":${symbol.id},"lelProjectId":${symbol.lelProjectId},"name":"${symbolName}"}`;

      // Notify the change.
      this.dataChange.next(data);
    }

    /**
     * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
     * The return value is the list of `TodoItemNode`.
     */
    buildFileTree(obj: object, level: number): SymbolCommentNode[] {
      return Object.keys(obj).reduce<SymbolCommentNode[]>((accumulator, key) => {
        const value = obj[key];
        const node = new SymbolCommentNode();
        node.comment = key;

        if (value != null) {
          if (typeof value === 'object') {
            node.children = this.buildFileTree(value, level + 1);
          } else {
            node.comment = value;
          }
        }

        return accumulator.concat(node);
      }, []);
    }

    /** Add an item to to-do list */
    insertItem(parent: SymbolCommentNode, name: string) {
      if (parent.children) {
        parent.children.push({comment: name} as SymbolCommentNode);
        this.dataChange.next(this.data);
      }
    }

    updateItem(node: SymbolCommentNode, name: string) {
      node.comment = name;
      this.dataChange.next(this.data);
    }
  }
