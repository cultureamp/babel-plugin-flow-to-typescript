import { CallExpression } from '@babel/types';
import { NodePath } from '@babel/traverse';
import { convertTypeParameterInstantiation } from '../converters/convert_type_parameter_instantiation';
import { replaceWith } from '../utils/replaceWith';
import { PluginPass } from '../types';

export function CallExpression(path: NodePath<CallExpression>, state: PluginPass) {
  if (path.node.typeArguments) {
    const typeParameters = convertTypeParameterInstantiation(path.node.typeArguments, state);
    path.node.typeArguments = null;
    replaceWith(path.get('typeParameters'), typeParameters);
  }
}
