import { OpaqueType, tsTypeAliasDeclaration, TSTypeAliasDeclaration } from '@babel/types';
import { warnOnlyOnce } from '../util';
import { convertFlowType } from './convert_flow_type';
import { baseNodeProps } from '../utils/baseNodeProps';
import { PluginPass } from '../types';

export function convertOpaqueType(node: OpaqueType, state: PluginPass): TSTypeAliasDeclaration {
  if (node.supertype) {
    warnOnlyOnce('Subtyping constraints in opaque type in Flow is ignored in TypeScript');
  }
  const tsNode = tsTypeAliasDeclaration(node.id, null, {
    ...convertFlowType(node.impltype, state),
    ...baseNodeProps(node.impltype),
  });
  tsNode.declare = false;

  return tsNode;
}
