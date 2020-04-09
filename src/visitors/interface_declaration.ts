import { InterfaceDeclaration } from '@babel/types';
import { NodePath } from '@babel/traverse';

import { convertInterfaceDeclaration } from '../converters/convert_interface_declaration';
import { replaceWith } from '../utils/replaceWith';
import { PluginPass } from '../types';

export function InterfaceDeclaration(path: NodePath<InterfaceDeclaration>, state: PluginPass) {
  replaceWith(path, convertInterfaceDeclaration(path.node, state));
}
