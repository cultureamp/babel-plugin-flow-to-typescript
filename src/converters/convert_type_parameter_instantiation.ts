import {
  TSTypeParameterInstantiation,
  tsTypeParameterInstantiation,
  TypeParameterInstantiation,
} from '@babel/types';
import { baseNodeProps } from '../utils/baseNodeProps';
import { convertFlowType } from './convert_flow_type';
import { PluginPass } from '../types';

export function convertTypeParameterInstantiation(
  node: TypeParameterInstantiation,
  state: PluginPass,
): TSTypeParameterInstantiation {
  const params = node.params.map(p => ({
    ...baseNodeProps(p),
    ...convertFlowType(p, state),
  }));

  return tsTypeParameterInstantiation(params);
}
