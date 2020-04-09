import { NodePath } from '@babel/core';
import { tsTypeAnnotation, VariableDeclarator, isIdentifier } from '@babel/types';
import { PluginPass } from '../types';
import { emptyFlowObjectType } from '../utils/utilityTypeHelpers';

export function transformEmptyObjectVariable(
  path: NodePath<VariableDeclarator>,
  _state: PluginPass,
) {
  if (isIdentifier(path.node.id)) {
    path.node.id.typeAnnotation = tsTypeAnnotation(emptyFlowObjectType());
  }
}
