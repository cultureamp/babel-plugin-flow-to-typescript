import { NodePath } from '@babel/traverse';
import {
  DeclareModuleExports,
  identifier,
  tsExportAssignment,
  tsTypeAnnotation,
  variableDeclaration,
  variableDeclarator,
} from '@babel/types';
import { convertFlowType } from '../converters/convert_flow_type';
import { baseNodeProps } from '../utils/baseNodeProps';
import { PluginPass } from '../types';

export function DeclareModuleExports(path: NodePath<DeclareModuleExports>, state: PluginPass) {
  const node = path.node;

  const tsType = convertFlowType(node.typeAnnotation.typeAnnotation, state);

  const aliasId = identifier('__exports');

  path.replaceWithMultiple([
    variableDeclaration('const', [
      variableDeclarator({
        ...aliasId,
        typeAnnotation: { ...tsTypeAnnotation(tsType), ...baseNodeProps(node.typeAnnotation) },
      }),
    ]),
    tsExportAssignment(aliasId),
  ]);
}
