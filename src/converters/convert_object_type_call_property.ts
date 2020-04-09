import {
  isFunctionTypeAnnotation,
  ObjectTypeCallProperty,
  tsCallSignatureDeclaration,
} from '@babel/types';
import { convertFunctionTypeAnnotation } from './convert_function_type_annotation';
import { PluginPass } from '../types';

export function convertObjectTypeCallProperty(
  callProperty: ObjectTypeCallProperty,
  state: PluginPass,
) {
  if (isFunctionTypeAnnotation(callProperty.value)) {
    const { typeParams, parameters, returnType } = convertFunctionTypeAnnotation(
      callProperty.value,
      state,
    );

    return tsCallSignatureDeclaration(typeParams, parameters, returnType);
  } else {
    throw new Error('ObjectCallTypeProperty case not implemented');
  }
}
