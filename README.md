<a name="readme-top"></a>

<div align="center">
  <h1>StarUML 的中文 Java 扩展</h1>
  <h4>Java 代码生成和逆向工具。</h4>
  <p>
    <a href="stargazers">
      <img src="https://shields.io/github/stars/SeagullOddy/staruml-java-cn?style=flat" />
    </a>
    <a href="LICENSE">
      <img src="https://shields.io/github/license/SeagullOddy/staruml-java-cn" />
    </a>
  </p>
  <p>
    <a href="#简洁">简介</a> •
    <a href="#使用">使用</a> •
    <a href="#更新日志">更新日志</a> •
    <a href="#许可">许可</a>
  </p>
</div>

<details>
  <summary>目录</summary>
  <ol>
    <li><a href="#简介">简介</a></li>
    <li><a href="#使用">使用</a></li>
    <li><a href="#更新日志">更新日志</a></li>
    <li><a href="#转换规则">转换规则</a></li>
    <li><a href="#许可">许可</a></li>
  </ol>
</details>

## 简介

本 [StarUML](https://staruml.io) 扩展支持用 UML 模型生成 Java 代码，以及将 Java 代码逆向为 UML模型。

> :warning: 本扩展基于 [Java Extension for StarUML](https://github.com/staruml/staruml-java) 扩展二次开发。本扩展的功能不完善，如果您需要完美的 Java 代码生成/逆向功能，请查看其他更专业的工具。

> :white_check_mark: 本扩展基于 Java 1.7 规范。

## 使用

1. 在 StarUML 的扩展管理器中输入仓库地址 `https://github.com/SeagullOddy/staruml-java-cn` 来安装本扩展
2. Java 代码生成
   <details>
    <summary>详细步骤</summary>
    <ol>
      <li>点击菜单栏的<code>工具 > Java > 生成代码……</code></li>
      <li>选择一个用来生成 Java 代码的模型（或包）</li>
      <li>选择存放代码的目录</li>
      <li>完成！生成的代码会被存放在你选择的目录中</li>
    </ol>
   </details>
3. Java 代码逆向
   <details>
    <summary>详细步骤</summary>
    <ol>
      <li>点击菜单栏的<code>工具 > Java > 代码逆向……</code></li>
      <li>选择一个存放着代码的目录</li>
      <li>完成！逆向出来的模型会被存放在名为 <code>Java 逆向</code> 的模型中</li>
    </ol>
   </details>

## 更新日志

### v0.0.0

- 翻译扩展为中文
- 更改默认设置，开箱即用
  - `preferences/preference.json`
    - "java.gen.javaDoc": `true` -> `false`
    - "java.rev.association": `true` -> `false`
    - "java.rev.typeHierarchy": `true` -> `false`
    - "java.rev.packageOverview": `true` -> `false`
    - "java.rev.packageStructure": `true` -> `false`
- 优化代码生成逻辑
  - 移除：不再默认导入 java.io、java.util 包
  - 移除：类中不再生成默认构造方法
  - 移除：方法中不再默认生成 TODO 注释
  - 移除：void 方法中不再生成 return 语句
  - 优化：不再生成空注释
  - 修复：继承并实现抽象类中抽象方法（或接口中的方法）时，出现方法重复生成的问题
- 优化代码逆向逻辑
  - 移除：将 _UMLOperation_ 逆向为构造方法时添加构造型 `<<constructor>>`

## 转换规则

### UML 模型转换为 Java 代码

下面是 UML 模型元素转换为 Java 源代码的规则。

#### UMLPackage

- 转换为 _Java Package_

#### UMLClass

- 转换为 _Java Class_
- `visibility` 特征转换为可见性修饰符 `public`，`protected`，`private` 或无修饰符
- `isAbstract` 特征为真时，生成 `abstract` 修饰符
- `isFinalSpecialization` 或 `isLeaf` 特征为真时，生成 `final` 修饰符
- 所有包含的类型（_UMLClass_，_UMLInterface_，_UMLEnumeration_）均转换为内部类型定义
- 文档特征转换为 Java 文档注释（要求启用偏好设置中的 **“生成 Java 文档注释”**）

#### UMLAttribute

- 转换为 _Java Field_
- `visibility` 特征转换为可见性修饰符 `public`，`protected`，`private` 或无修饰符
- `name` 特征转换为字段标识符
- `type` 特征转换为字段类型
- `multiplicity` 特征转换为数组类型
- `isStatic` 特征为真时，生成 `static` 修饰符
- `isLeaf` 特征为真时，生成 `final` 修饰符
- `defaultValue` 特征转换为初始值
- 文档特征转换为 Java 文档注释（要求启用偏好设置中的 **“生成 Java 文档注释”**）

#### UMLOperation

- 转换为 _Java Methods_
- `visibility` 特征转换为可见性修饰符 `public`，`protected`，`private` 或无修饰符
- `name` 特征转换为方法标识符
- `isAbstract` 特征为真时，生成 `abstract` 修饰符
- `isStatic` 特征为真时，生成 `static` 修饰符
- _UMLParameter_ 转换为 _Java Method Parameters_
- _UMLParameter_ 的名称特征转换为参数标识符
- _UMLParameter_ 的类型特征转换为参数类型
- `direction` 特性为 `return` 的 _UMLParameter_ 转换为方法的返回值类型，没有这个参数时方法的返回值类型为 `void`
- `isReadOnly` 特性为真的 _UMLParameter_ 转换为带 `final` 修饰符的参数
- 文档特征转换为 Java 文档注释（要求启用偏好设置中的 **“生成 Java 文档注释”**）

#### UMLInterface

- 转换为 _Java Interface_
- `visibility` 特征转换为可见性修饰符 `public`，`protected`，`private` 或无修饰符
- 文档特征转换为 Java 文档注释（要求启用偏好设置中的 **“生成 Java 文档注释”**）

#### UMLEnumeration

- 转换为 _Java Enum_
- `visibility` 特征转换为可见性修饰符 `public`，`protected`，`private` 或无修饰符
- _UMLEnumerationLiteral_ 转换为枚举中的常量

#### UMLAssociationEnd

- 转换为 _Java Field_
- `visibility` 特征转换为可见性修饰符 `public`，`protected`，`private` 或无修饰符
- `name` 特征转换为字段标识符
- `type` 特征转换为字段类型
- If `multiplicity` is one of `0..*`, `1..*`, `*`, then collection type (`java.util.List<>` when `isOrdered` = `true` or `java.util.Set<>`) is used
- `defaultValue` 特征转换为初始值
- 文档特征转换为 Java 文档注释（要求启用偏好设置中的 **“生成 Java 文档注释”**）

#### UMLGeneralization

- 转换为 _Java Extends_
- 只允许在 _UMLClass_ 指向 _UMLClass_ 或 _UMLInterface_ 指向 _UMLInterface_ 时使用

#### UMLInterfaceRealization

- 转换为 _Java Implements_
- 只允许在 _UMLClass_ 指向 _UMLInterface_ 时使用

### Java 代码转换为 UML 模型

下面是 Java 源代码转换为 UML 模型元素的规则。

#### Java Package

- 转换为 _UMLPackage_

#### Java Class

- 转换为 _UMLClass_
- 类名转换为 `name` 特征
- 类型参数（泛型）转换为 _UMLTemplateParameter_
- 可见性修饰符 `public`，`protected` 和 `private` 转换为 `visibility` 特征
- `abstract` 修饰符转换为 `isAbstract` 特征
- `final` 修饰符转换为 `isLeaf` 特征
- 所有包含的类型（_UMLClass_，_UMLInterface_，_UMLEnumeration_）均转换为内部类型定义
- Java 文档注释转换为文档特征

#### Java Field (to UMLAttribute)

- 转换为 _UMLAttribute_（如果关闭了偏好设置中的 **“使用关联”**）
- Field type to `type` property

  - Primitive Types : `type` property has the primitive type name as string
  - `T[]`(array), `java.util.List<T>`, `java.util.Set<T>` or its decendants: `type` property refers to `T` with multiplicity `*`
  - `T` (User-Defined Types) : `type` property refers to the `T` type
  - Otherwise : `type` property has the type name as string

- 可见性修饰符 `public`，`protected` 和 `private` 转换为 `visibility` 特征
-  `static` 修饰符转换为 `isStatic` 特征
-  `final` 修饰符转换为 `isLeaf` 特征
- `transient` modifier to a Tag with `name="transient"` and `checked=true`
- `volatile` modifier to a Tag with `name="volatile"` and `checked=true`
- 初始值转换为 `defaultValue` 特征
- Java 文档注释转换为文档特征

#### Java Field (to UMLAssociation)

- 转换为（Directed） _UMLAssociation_（如果开启了偏好设置中的 **“使用关联”**，并且有一个 UML 类型的元素 _UMLClass_，_UMLInterface_ 或 _UMLEnumeration_ 对应于字段类型）
- Field type to `end2.reference` property

  - `T[]`(array), `java.util.List<T>`, `java.util.Set<T>` or its decendants: `reference` property refers to `T` with multiplicity `*`
  - `T` (User-Defined Types) : `reference` property refers to the `T` type
  - Otherwise : 转换为 _UMLAttribute_, not _UMLAssociation_

- 可见性修饰符 `public`，`protected` 和 `private` 转换为 `visibility` 特征
- Java 文档注释转换为文档特征

#### Java Method

- 转换为 _UMLOperation_
- 类型参数（泛型）转换为 _UMLTemplateParameter_
- 可见性修饰符 `public`，`protected` 和 `private` 转换为 `visibility` 特征
-  `static` 修饰符转换为 `isStatic` 特征
-  `abstract` 修饰符转换为 `isAbstract` 特征
-  `final` 修饰符转换为 `isLeaf` 特征
- `synchronized` modifier to `concurrency="concurrent"` property
- `native` modifier to a Tag with `name="native"` and `checked=true`
- `strictfp` modifier to a Tag with `name="strictfp"` and `checked=true`
- `throws` clauses to `raisedExceptions` property
- Java 文档注释转换为文档特征

#### Java Interface

- 转换为 _UMLInterface_
- 类名转换为 `name` 特征
- 类型参数（泛型）转换为 _UMLTemplateParameter_
- 可见性修饰符 `public`，`protected` 和 `private` 转换为 `visibility` 特征
- Java 文档注释转换为文档特征

#### Java Enum

- 转换为 _UMLEnumeration_
- Enum name to `name` property
- 类型参数（泛型）转换为 _UMLTemplateParameter_
- 可见性修饰符 `public`，`protected` 和 `private` 转换为 `visibility` 特征
- Enum constants are 转换为 _UMLEnumerationLiteral_
- Java 文档注释转换为文档特征

#### Java AnnotationType

- 转换为 _UMLClass_ with stereotype `<<annotationType>>`
- Annotation type elements to _UMLOperation_ (Default value to a Tag with `name="default"`)
- Java 文档注释转换为文档特征

## 许可

[MIT](LICENSE)。


