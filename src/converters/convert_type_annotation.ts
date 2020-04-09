import { tsTypeAnnotation, TSTypeAnnotation, TypeAnnotation } from '@babel/types';
import { convertFlowType } from './convert_flow_type';
import { baseNodeProps } from '../utils/baseNodeProps';
import { PluginPass } from '../types';

export function convertTypeAnnotation(node: TypeAnnotation, state: PluginPass): TSTypeAnnotation {
  return tsTypeAnnotation({
    ...convertFlowType(node.typeAnnotation, state),
    ...baseNodeProps(node.typeAnnotation),
  });
}
