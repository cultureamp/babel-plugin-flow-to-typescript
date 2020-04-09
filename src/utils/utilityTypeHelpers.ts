import {
  identifier,
  tsTypeParameterInstantiation,
  tsTypeReference,
  tsNumberKeyword,
  tsStringKeyword,
  tsUnknownKeyword,
  tsUnionType,
} from '@babel/types';

export const emptyFlowObjectType = () =>
  tsTypeReference(
    identifier('Record'),
    tsTypeParameterInstantiation([
      tsUnionType([tsStringKeyword(), tsNumberKeyword()]),
      tsUnknownKeyword(),
    ]),
  );
