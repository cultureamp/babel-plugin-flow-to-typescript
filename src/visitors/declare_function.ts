import { DeclareFunction } from '@babel/types';
import { NodePath } from '@babel/traverse';

import { convertDeclareFunction } from '../converters/convert_declare_function';
import { replaceWith } from '../utils/replaceWith';
import { PluginPass } from '../types';

export function DeclareFunction(path: NodePath<DeclareFunction>, state: PluginPass) {
  const replacement = convertDeclareFunction(path.node, state);
  replacement.declare = !state.get('isModuleDeclaration');
  replaceWith(path, replacement);
}
