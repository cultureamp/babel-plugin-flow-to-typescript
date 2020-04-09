import {
  TSTypeParameterDeclaration,
  tsTypeParameterDeclaration,
  TypeParameterDeclaration,
} from '@babel/types';
import { convertTypeParameter } from './convert_type_parameter';
import { baseNodeProps } from '../utils/baseNodeProps';
import { PluginPass } from '../types';

export function convertTypeParameterDeclaration(
  node: TypeParameterDeclaration,
  state: PluginPass,
): TSTypeParameterDeclaration {
  const params = node.params.map(p => ({
    ...baseNodeProps(p),
    ...convertTypeParameter(p, state),
  }));

  return tsTypeParameterDeclaration(params);
}
