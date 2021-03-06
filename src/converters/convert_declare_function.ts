import {
  DeclareFunction,
  tsDeclareFunction,
  isTypeAnnotation,
  isFunctionTypeAnnotation,
  identifier,
} from '@babel/types';

import { convertFunctionTypeAnnotation } from './convert_function_type_annotation';
import { baseNodeProps } from '../utils/baseNodeProps';
import { PluginPass } from '../types';

export function convertDeclareFunction(node: DeclareFunction, state: PluginPass) {
  if (!isTypeAnnotation(node.id.typeAnnotation)) throw new Error('typeAnnotation is missing');

  const typeAnnotation = node.id.typeAnnotation.typeAnnotation;
  if (!isFunctionTypeAnnotation(typeAnnotation)) {
    throw new Error('typeAnnotation is not FunctionTypeAnnotation');
  }

  const { typeParams, parameters, returnType } = convertFunctionTypeAnnotation(
    typeAnnotation,
    state,
  );
  const id = { ...identifier(node.id.name), ...baseNodeProps(node.id) };
  return tsDeclareFunction(id, typeParams, parameters, returnType);
}
