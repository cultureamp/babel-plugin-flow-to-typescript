import { NodePath, Node } from '@babel/traverse';

// tslint:disable-next-line:no-any
export function replaceWith(
  path: NodePath<any> | NodePath<any>[],
  replacement: Node | NodePath<any>,
) {
  if (replacement instanceof NodePath) {
    replacement = replacement.node;
  }
  const pathOrFirst = path instanceof Array ? path[0] : path;

  pathOrFirst.replaceWith({
    ...replacement,
    // @ts-ignore
    comments: path.node ? path.node.comments : undefined,
  } as Node);
}
