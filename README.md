Aqui está um exemplo de README para sua ferramenta `java-to-openapi`:

---

# Java-to-OpenAPI

**Java-to-OpenAPI** é uma ferramenta de linha de comando (CLI) que converte classes Java em especificações OpenAPI 3 no formato YAML. Esta ferramenta é útil para desenvolvedores que desejam gerar automaticamente a documentação OpenAPI a partir de classes Java.

## Instalação

Você pode usar o `java-to-openapi` diretamente com `npx`, sem a necessidade de instalação prévia:

```bash
npx java-to-openapi <source-directory> <output-file>
```

## Uso

### Comando Básico

Para usar a ferramenta, execute o comando:

```bash
npx java-to-openapi <source-directory> <output-file>
```

- `<source-directory>`: O caminho para o diretório contendo os arquivos `.java`.
- `<output-file>`: O caminho e nome do arquivo YAML de saída.

### Exemplo

Se você tem uma pasta `src/example` com suas classes Java e deseja gerar um arquivo `api-spec.yaml` na raiz do projeto, execute:

```bash
npx java-to-openapi ./src/example ./api-spec.yaml
```

### Estrutura de Arquivos

```bash
src/
└── example/
    ├── Produto.java
    └── Categoria.java
```

## Funcionalidades

- **Conversão de Classes Java**: Analisa classes Java e gera automaticamente a especificação OpenAPI 3 correspondente.
- **Suporte a Tipos Primitivos**: Converte tipos Java comuns (`int`, `String`, `boolean`, etc.) para seus equivalentes OpenAPI.
- **Suporte a Listas**: Identifica e converte listas (`List<T>`) para arrays no OpenAPI.
- **Recursividade**: Processa arquivos `.java` em subdiretórios de forma recursiva.

## Exemplos de Classes Suportadas

A ferramenta suporta classes simples e complexas, incluindo aquelas que contêm listas ou referências a outras classes.

**Exemplo de Classe Java**:

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

    // Getters e Setters omitidos para brevidade
}
```

**Saída YAML**:

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

## Contribuindo

Se você encontrar bugs ou tiver sugestões para melhorias, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Autor

Desenvolvido por **Gabriell Huver**.

---

Este README fornece uma visão geral do que a ferramenta faz, como usá-la, e exemplos práticos para garantir que os usuários possam começar a usar a ferramenta rapidamente.
