import { NodePath } from '@babel/traverse';
import { ArrowFunctionExpression, isTypeParameterDeclaration, tsAnyKeyword } from '@babel/types';
import { transformFunctionParams } from '../transforms/transform_function_params';
import { PluginPass } from '../types';
import { convertTypeParameterDeclaration } from '../converters/convert_type_parameter_declaration';
import { replaceWith } from '../utils/replaceWith';

export function ArrowFunctionExpression(
  path: NodePath<ArrowFunctionExpression>,
  state: PluginPass,
) {
  transformFunctionParams(path.get('params'), state);
  // @ts-ignore todo: add babel type
  path.get('predicate').remove();
  if (isTypeParameterDeclaration(path.node.typeParameters)) {
    const tsTypeParameterDeclaration = convertTypeParameterDeclaration(
      path.node.typeParameters,
      state,
    );
    if (state.opts.isJSX) {
      // workaround for tsx files to differentiate type parameters from jsx
      tsTypeParameterDeclaration.params[0].constraint = tsAnyKeyword();
    }
    replaceWith(path.get('typeParameters'), tsTypeParameterDeclaration);
  }
}
