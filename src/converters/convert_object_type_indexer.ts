import { identifier, ObjectTypeIndexer, tsIndexSignature, tsTypeAnnotation } from '@babel/types';
import { PluginPass } from '../types';
import { convertFlowType } from './convert_flow_type';

export function convertObjectTypeIndexer(indexer: ObjectTypeIndexer, state: PluginPass) {
  const tsIndex = indexer.id || identifier('x');
  const tsIndexType = convertFlowType(indexer.key, state);
  const tsValueType = convertFlowType(indexer.value, state);
  tsIndex.typeAnnotation = tsTypeAnnotation(tsIndexType);
  const tsIndexSignatureType = tsTypeAnnotation(tsValueType);
  return tsIndexSignature([tsIndex], tsIndexSignatureType);
}
