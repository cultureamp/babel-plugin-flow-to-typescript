import { NodePath } from '@babel/traverse';
import {
  isIdentifier,
  isNullableTypeAnnotation,
  isTSFunctionType,
  isTypeAnnotation,
  tsNullKeyword,
  tsParenthesizedType,
  tsTypeAnnotation,
  tsUndefinedKeyword,
  tsUnionType,
  Identifier,
  RestElement,
  AssignmentPattern,
  ArrayPattern,
  ObjectPattern,
  TSParameterProperty,
  Node,
} from '@babel/types';
import { convertFlowType } from '../converters/convert_flow_type';
import { PluginPass } from '../types';
import { replaceWith } from '../utils/replaceWith';

export function transformFunctionParams(
  paramsPath: OneOrMany<
    | NodePath<
        | Identifier
        | RestElement
        | AssignmentPattern
        | ArrayPattern
        | ObjectPattern
        | TSParameterProperty
      >
    | NodePath<Node>
  >,
  state: PluginPass,
) {
  let hasRequiredAfter = false;
  const params = paramsPath instanceof Array ? paramsPath : [paramsPath];
  for (let i = params.length - 1; i >= 0; i--) {
    const paramNode = params[i];
    if (paramNode.isPattern()) {
      if (paramNode.isAssignmentPattern() && isIdentifier(paramNode.node.left)) {
        // argument with default value can not be optional in typescript
        paramNode.node.left.optional = false;
      }
      if (!paramNode.isAssignmentPattern()) {
        hasRequiredAfter = true;
      }
    }
    if (paramNode.isIdentifier()) {
      const param = paramNode.node;

      if (param.typeAnnotation && isTypeAnnotation(param.typeAnnotation)) {
        if (isNullableTypeAnnotation(param.typeAnnotation.typeAnnotation)) {
          param.optional = !hasRequiredAfter;
          if (param.optional) {
            let tsType = convertFlowType(param.typeAnnotation.typeAnnotation.typeAnnotation, state);
            if (isTSFunctionType(tsType)) {
              tsType = tsParenthesizedType(tsType);
            }
            const typeAnnotation = tsUnionType([tsType, tsNullKeyword()]);
            replaceWith(paramNode.get('typeAnnotation'), tsTypeAnnotation(typeAnnotation));
          } else {
            hasRequiredAfter = true;
          }
        } else {
          if (param.optional && hasRequiredAfter) {
            param.optional = false;
            let tsType = convertFlowType(param.typeAnnotation.typeAnnotation, state);
            if (isTSFunctionType(tsType)) {
              tsType = tsParenthesizedType(tsType);
            }
            const typeAnnotation = tsUnionType([tsType, tsUndefinedKeyword(), tsNullKeyword()]);
            replaceWith(paramNode.get('typeAnnotation'), tsTypeAnnotation(typeAnnotation));
          }
          if (!param.optional) {
            hasRequiredAfter = true;
          }
        }
      }
    }
  }
}
