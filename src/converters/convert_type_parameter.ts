import { tsTypeParameter, TSTypeParameter, TypeParameter } from '@babel/types';
import { convertFlowType } from './convert_flow_type';
import { baseNodeProps } from '../utils/baseNodeProps';
import { PluginPass } from '../types';

export function convertTypeParameter(node: TypeParameter, state: PluginPass): TSTypeParameter {
  return tsTypeParameter(
    node.bound && {
      ...baseNodeProps(node.bound.typeAnnotation),
      ...convertFlowType(node.bound.typeAnnotation, state),
    },
    node.default && {
      ...baseNodeProps(node.default),
      ...convertFlowType(node.default, state),
    },
    node.name!,
  );
}
