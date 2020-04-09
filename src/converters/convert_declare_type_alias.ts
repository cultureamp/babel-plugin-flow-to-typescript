import { DeclareTypeAlias, tsTypeAliasDeclaration, TypeAlias } from '@babel/types';
import { convertTypeParameterDeclaration } from './convert_type_parameter_declaration';
import { convertFlowType } from './convert_flow_type';
import { PluginPass } from '../types';

export function convertDeclareTypeAlias(node: DeclareTypeAlias | TypeAlias, state: PluginPass) {
  let tp = null;
  if (node.typeParameters) {
    tp = convertTypeParameterDeclaration(node.typeParameters, state);
  }
  const t = convertFlowType(node.right, state);
  return tsTypeAliasDeclaration(node.id, tp, t);
}
