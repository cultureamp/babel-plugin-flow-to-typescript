import { TypeCastExpression } from '@babel/types';
import { NodePath } from '@babel/traverse';
import { convertTypeCastExpression } from '../converters/convert_type_cast_expression';
import { replaceWith } from '../utils/replaceWith';
import { PluginPass } from '../types';

export function TypeCastExpression(path: NodePath<TypeCastExpression>, state: PluginPass) {
  replaceWith(path, convertTypeCastExpression(path.node, state));
}
