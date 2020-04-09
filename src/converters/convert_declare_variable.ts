import {
  DeclareVariable,
  isTypeAnnotation,
  tsTypeAnnotation,
  variableDeclaration,
  variableDeclarator,
} from '@babel/types';
import { convertFlowType } from './convert_flow_type';
import { baseNodeProps } from '../utils/baseNodeProps';
import { PluginPass } from '../types';

export function convertDeclareVariable(node: DeclareVariable, state: PluginPass) {
  const id = node.id;
  if (isTypeAnnotation(id.typeAnnotation)) {
    id.typeAnnotation = {
      ...tsTypeAnnotation(convertFlowType(id.typeAnnotation.typeAnnotation, state)),
      ...baseNodeProps(id.typeAnnotation),
    };
  }
  return variableDeclaration('var', [variableDeclarator(id)]);
}
