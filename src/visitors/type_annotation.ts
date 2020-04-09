import { TypeAnnotation } from '@babel/types';
import { NodePath } from '@babel/traverse';
import { convertTypeAnnotation } from '../converters/convert_type_annotation';
import { replaceWith } from '../utils/replaceWith';
import { PluginPass } from '../types';

export function TypeAnnotation(path: NodePath<TypeAnnotation>, state: PluginPass) {
  replaceWith(path, convertTypeAnnotation(path.node, state));
}
