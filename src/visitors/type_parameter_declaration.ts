import { TypeParameterDeclaration } from '@babel/types';
import { NodePath } from '@babel/traverse';
import { convertTypeParameterDeclaration } from '../converters/convert_type_parameter_declaration';
import { replaceWith } from '../utils/replaceWith';
import { PluginPass } from '../types';

export function TypeParameterDeclaration(
  path: NodePath<TypeParameterDeclaration>,
  state: PluginPass,
) {
  replaceWith(path, convertTypeParameterDeclaration(path.node, state));
}
