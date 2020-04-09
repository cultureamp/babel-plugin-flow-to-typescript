import { FunctionDeclaration } from '@babel/types';
import { NodePath } from '@babel/traverse';
import { transformFunctionParams } from '../transforms/transform_function_params';
import { PluginPass } from '../types';

export function FunctionDeclaration(path: NodePath<FunctionDeclaration>, state: PluginPass) {
  transformFunctionParams(path.get('params'), state);
  // @ts-ignore todo: add babel type
  path.get('predicate').remove();
}
