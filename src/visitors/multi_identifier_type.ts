import { NodePath } from '@babel/core';
import {
  Identifier,
  QualifiedTypeIdentifier as BabelQualifiedTypeIdentifier,
  TSQualifiedName,
  isTSQualifiedName,
  isQualifiedTypeIdentifier,
} from '@babel/types';
import { PluginPass } from '../types';
import { identifierReplacements } from '../converters/identifier_replacements';

const nameOfId = (id: BabelQualifiedTypeIdentifier | TSQualifiedName | Identifier): string =>
  isTSQualifiedName(id)
    ? `${nameOfId(id.left)}.${id.right.name}`
    : isQualifiedTypeIdentifier(id)
    ? `${nameOfId(id.qualification)}.${id.id.name}`
    : id.name;

/* const replaceName = (path: NodePath<BabelQualifiedTypeIdentifier | TSQualifiedName | Identifier>, name: string) => {
    if(isQualifiedTypeIdentifier(path)) {
        path.replaceWith(tsQualifiedName(ts.))
    }
} */

export function MultiIdentifierType(
  path: NodePath<TSQualifiedName> | NodePath<BabelQualifiedTypeIdentifier> | NodePath<Identifier>,
  _state: PluginPass,
) {
  const name = nameOfId(path.node);
  const replacement = identifierReplacements[name];
  if (replacement) {
    //TODO: Finish this
  }
}
