import { TypeAlias } from '@babel/types';
import { NodePath } from '@babel/traverse';
import { convertTypeAlias } from '../converters/convert_type_alias';
import { replaceWith } from '../utils/replaceWith';
import { PluginPass } from '../types';

export function TypeAlias(path: NodePath<TypeAlias>, state: PluginPass) {
  replaceWith(path, convertTypeAlias(path.node, state));
}
