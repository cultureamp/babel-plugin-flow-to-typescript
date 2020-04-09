import { PluginPass } from '../types';
import { Scope, TraversalContext } from '@babel/traverse';
import { File } from '@babel/types';

export function getScopeOfState(state: PluginPass): Scope | undefined {
  if ('scope' in state.file) {
    return ((state.file as unknown) as File & TraversalContext).scope;
  }
}
