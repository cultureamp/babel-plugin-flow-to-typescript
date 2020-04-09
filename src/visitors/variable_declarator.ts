import { NodePath } from '@babel/traverse';
import { VariableDeclarator } from '@babel/types';
import { PluginPass } from '../types';
import { transformEmptyObjectVariable } from '../transforms/transform_empty_object_variable';

export function VariableDeclarator(path: NodePath<VariableDeclarator>, state: PluginPass) {
  /* 
    In the case of:
    ```flow
      const foo = {}
    ```
    We want:

    ```ts
      const foo: Record<string | number, unknown> = {}
    ```
  */
  const initPath = path.get('init');
  if (initPath.isObjectExpression() && !initPath.node.properties.length) {
    transformEmptyObjectVariable(path, state);
  }
}
