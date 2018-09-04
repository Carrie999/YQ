/* @flow */

// 从 parser 目录下的 index.js 文件中导入 parse 函数
import { parse } from './parser/index'
import { optimize } from './optimizer'
// 从 codegen 目录下的 index.js 文件中导入 generate 函数
import { generate } from './codegen/index'
import { createCompilerCreator } from './create-compiler'

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
export const createCompiler = createCompilerCreator(function baseCompile (
  template,
  options
) {
  // console.log(template.trim(), options)
  // 使用 parse 函数将模板解析为 AST
  const ast = parse(template.trim(), options)
 
  // ast对象进行优化，找出ast对象中所有的最大静态子树
  if (options.optimize !== false) {
    optimize(ast, options)
  }
  // console.log(ast)
  // 根据给定的AST生成最终的目标平台的代码
  const code = generate(ast, options)
  // console.log(code)
  return {
    ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
})
