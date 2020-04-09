import { NodePath } from '@babel/traverse';
import { ClassBody, Node } from '@babel/types';
import { transformFunctionParams } from './transform_function_params';
import { PluginPass } from '../types';

export function transformClassBody(
  path: OneOrMany<NodePath<ClassBody> | NodePath<Node>>,
  state: PluginPass,
) {
  const pathOrFirst = path instanceof Array ? path[0] : path;

  if (!pathOrFirst.isClassBody()) return;
  for (const elementPath of pathOrFirst.get('body')) {
    if (elementPath.isClassMethod()) {
      if (elementPath.node.kind === 'constructor') {
        const returnType = elementPath.get('returnType');
        if (returnType instanceof Array) {
          returnType[0].remove();
        } else {
          returnType.remove();
        }
      }
      transformFunctionParams(elementPath.get('params'), state);
    }

    if (elementPath.isClassProperty()) {
      // @ts-ignore todo: missing proppery in babel
      const variance = elementPath.node.variance;
      if (variance) {
        elementPath.node.readonly = variance && variance.kind === 'plus';
        // @ts-ignore
        elementPath.node.variance = null;
      }
    }

    // todo: commented out because it is not yet in ts
    // todo: missing method in babel
    // if (isClassPrivateMethod(elementPath.node)) {
    // }

    // todo: missing method in babel
    // if (isClassPrivateProperty(elementPath.node)) {
    //   elementPath.node.variance = null;
    // }
  }
}
