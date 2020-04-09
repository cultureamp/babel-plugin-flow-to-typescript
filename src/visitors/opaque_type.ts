import { OpaqueType } from '@babel/types';
import { NodePath } from '@babel/traverse';
import { convertOpaqueType } from '../converters/convert_opaque_type';
import { replaceWith } from '../utils/replaceWith';
import { PluginPass } from '../types';

export function OpaqueType(path: NodePath<OpaqueType>, state: PluginPass) {
  replaceWith(path, convertOpaqueType(path.node, state));
}
