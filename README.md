
[![Node.js Package](https://github.com/gabriellhuver/nodejs-openapi-java-object-parser/actions/workflows/npm-publish.yml/badge.svg?branch=main)](https://github.com/gabriellhuver/nodejs-openapi-java-object-parser/actions/workflows/npm-publish.yml)

# Java-to-OpenAPI

Java-to-OpenAPI is a command-line interface (CLI) tool that converts Java classes into OpenAPI 3 specifications in YAML format. This tool is useful for developers who want to automatically generate OpenAPI documentation from Java classes.

## Installation

You can use java-to-openapi directly with npx, without the need for prior installation:

```bash
npx java-to-openapi <source-directory> <output-file>
```

## Usage

### Basic Command

To use the tool, run the command:

```bash
npx java-to-openapi <source-directory> <output-file>
```

- `<source-directory>`: The path to the directory containing the .java files.
- `<output-file>`: The path and name of the output YAML file.

### Example

If you have a `src/example` folder with your Java classes and want to generate an `api-spec.yaml` file in the project root, run:

```bash
npx java-to-openapi ./src/example ./api-spec.yaml
```

## File Structure

```plaintext
src/
└── example/
    ├── Produto.java
    └── Categoria.java
```

## Features

- **Java Class Conversion**: Analyzes Java classes and automatically generates the corresponding OpenAPI 3 specification.
- **Primitive Type Support**: Converts common Java types (int, String, boolean, etc.) to their OpenAPI equivalents.
- **List Support**: Identifies and converts lists (List<T>) to arrays in OpenAPI.
- **Recursiveness**: Processes .java files in subdirectories recursively.

## Supported Class Examples

The tool supports both simple and complex classes, including those containing lists or references to other classes.

### Example Java Class:

```java
import java.util.List;

public class Produto {
    private int id;
    private String nome;
    private double preco;
    private boolean emEstoque;
    private Categoria categoria;
    private List<String> tags;
    private List<Categoria> categoriasRelacionadas;

    // Getters and Setters omitted for brevity
}
```

### YAML Output:

```yaml
openapi: 3.0.0
info:
  title: API Documentation
  version: 1.0.0
components:
  schemas:
    Produto:
      type: object
      properties:
        id:
          type: integer
        nome:
          type: string
        preco:
          type: number
        emEstoque:
          type: boolean
        categoria:
          $ref: '#/components/schemas/Categoria'
        tags:
          type: array
          items:
            type: string
        categoriasRelacionadas:
          type: array
          items:
            $ref: '#/components/schemas/Categoria'
    Categoria:
      type: object
      properties:
        id:
          type: integer
        nome:
          type: string
```

## Contributing

If you find any bugs or have suggestions for improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## Author

Developed by Gabriell Huver.
