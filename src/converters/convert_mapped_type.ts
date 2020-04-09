import {
  isGenericTypeAnnotation,
  isIdentifier,
  isTSTypeAliasDeclaration,
  isTSUnionType,
  ObjectTypeAnnotation,
  TSMappedType,
  identifier,
  tsMappedType,
  tsTypeParameter,
} from '@babel/types';
import { PluginPass } from '../types';
import { getScopeOfState } from '../utils/getScopeOfState';
import { convertFlowType } from './convert_flow_type';

/**
 * Use this to determine whether an object is a mapped type, and return the union type that represents it
 *  - If there is only one indexer, and it is a union type
 */
export function convertMappedType(
  node: ObjectTypeAnnotation,
  state: PluginPass,
): false | TSMappedType {
  //If there is not only one indexer, cya later
  if (!(node.indexers && node.indexers.length === 1)) return false;
  const indexer = node.indexers[0];
  const key = indexer.key;
  const scope = getScopeOfState(state);
  const binding =
    scope && isGenericTypeAnnotation(key) && isIdentifier(key.id) && scope.bindings[key.id.name];
  if (
    !(
      binding &&
      isTSTypeAliasDeclaration(binding.path.node) &&
      isTSUnionType(binding.path.node.typeAnnotation)
    )
  ) {
    return false;
  }
  const tsIndex = indexer.id || identifier('x');
  const tsIndexType = convertFlowType(indexer.key, state);
  const tsValueType = convertFlowType(indexer.value, state);
  const mappedType = tsMappedType(
    tsTypeParameter(tsIndexType, undefined, tsIndex.name),
    tsValueType,
  );
  if (indexer.variance?.kind === 'plus') {
    mappedType.readonly = true;
  } else if (indexer.variance?.kind === 'minus') {
    throw Error('Minus variance not supported!');
  }

  return mappedType;
}
