import {
  tsTypeAliasDeclaration,
  TSTypeAliasDeclaration,
  TypeAlias,
  isTypeParameterDeclaration,
} from '@babel/types';
import { convertFlowType } from './convert_flow_type';
import { convertTypeParameterDeclaration } from './convert_type_parameter_declaration';
import { baseNodeProps } from '../utils/baseNodeProps';
import { PluginPass } from '../types';

export function convertTypeAlias(node: TypeAlias, state: PluginPass): TSTypeAliasDeclaration {
  const typeParameters = node.typeParameters;
  const right = node.right;
  return tsTypeAliasDeclaration(
    node.id,
    isTypeParameterDeclaration(typeParameters)
      ? {
          ...convertTypeParameterDeclaration(typeParameters, state),
          ...baseNodeProps(typeParameters),
        }
      : null,
    { ...baseNodeProps(right), ...convertFlowType(right, state) },
  );
}
