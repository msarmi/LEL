import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../../../../node_modules/@angular/material';
import { SymbolComment } from '../../../shared/models/symbol-comment';
import { SymbolCommentFlatNode } from '../../../shared/models/symbol-comment-flat-node';
import { SymbolCommentNode } from '../../../shared/models/symbol-comment-node';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';
import {SelectionModel} from '@angular/cdk/collections';
import { SymbolCommentListDatabase } from '../../../shared/models/symbol-comment-list-database';

@Component({
  selector: 'app-symbol-comments',
  templateUrl: './symbol-comments.component.html',
  styleUrls: ['./symbol-comments.component.css']
})
export class SymbolCommentsComponent implements OnInit {

    /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<SymbolCommentFlatNode, SymbolCommentNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<SymbolCommentNode, SymbolCommentFlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: SymbolCommentFlatNode | null = null;

  /** The new item's name */
  newCommentContent = '';

  treeControl: FlatTreeControl<SymbolCommentFlatNode>;

  treeFlattener: MatTreeFlattener<SymbolCommentNode, SymbolCommentFlatNode>;

  dataSource: MatTreeFlatDataSource<SymbolCommentNode, SymbolCommentFlatNode>;
    /** The selection for checklist */
  checklistSelection = new SelectionModel<SymbolCommentFlatNode>(true /* multiple */);

  symbolComments: SymbolComment[];


  constructor(
    public dialogRef: MatDialogRef<SymbolCommentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private database: SymbolCommentListDatabase) {
      this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);
      this.treeControl = new FlatTreeControl<SymbolCommentFlatNode>(this.getLevel, this.isExpandable);
      this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

      database.dataChange.subscribe(dataAux => {
        this.dataSource.data = dataAux;
      });
    }

  ngOnInit() {
    this.symbolComments = this.data.symbolComments;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getLevel = (node: SymbolCommentFlatNode) => node.level;

  isExpandable = (node: SymbolCommentFlatNode) => node.expandable;

  getChildren = (node: SymbolCommentNode): SymbolCommentNode[] => node.children;

  hasChild = (_: number, _nodeData: SymbolCommentFlatNode) => _nodeData.expandable;

  hasNoChild = (_: number, _nodeData: SymbolCommentFlatNode) => !_nodeData.expandable;

  hasNoContent = (_: number, _nodeData: SymbolCommentFlatNode) => _nodeData.comment === '';

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: SymbolCommentNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.comment === node.comment
        ? existingNode
        : new SymbolCommentFlatNode();
    flatNode.comment = node.comment;
    flatNode.level = level;
    flatNode.expandable = !!node.children;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  /** Select the category so we can insert the new item. */
  addNewItem(node: SymbolCommentFlatNode) {
    const parentNode = this.flatNodeMap.get(node);
    this.database.insertItem(parentNode!, '');
    this.treeControl.expand(node);
  }

  /** Save the node to database */
  saveNode(node: SymbolCommentFlatNode, itemValue: string) {
    const nestedNode = this.flatNodeMap.get(node);
    this.database.updateItem(nestedNode!, itemValue);
  }

}
