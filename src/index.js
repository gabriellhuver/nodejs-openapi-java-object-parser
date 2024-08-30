const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

function parseJavaClass(javaFilePath) {
    const classContent = fs.readFileSync(javaFilePath, 'utf8');
    
    // Extrair o nome da classe
    const classNameMatch = classContent.match(/class\s+(\w+)/);
    const className = classNameMatch ? classNameMatch[1] : 'UnknownClass';

    const properties = [];
    const methods = [];

    // Extrair campos (atributos)
    const propertyMatches = classContent.match(/private\s+(\w+)\s+(\w+);/g);
    if (propertyMatches) {
        propertyMatches.forEach(prop => {
            const match = prop.match(/private\s+(\w+)\s+(\w+);/);
            properties.push({
                type: match[1],
                name: match[2]
            });
        });
    }

    // Extrair métodos
    const methodMatches = classContent.match(/public\s+(\w+)\s+(\w+)\(.*\)\s*\{/g);
    if (methodMatches) {
        methodMatches.forEach(method => {
            const match = method.match(/public\s+(\w+)\s+(\w+)\(.*\)\s*\{/);
            methods.push({
                returnType: match[1],
                name: match[2]
            });
        });
    }

    return {
        className,
        properties,
        methods
    };
}

function generateOpenApiYaml(parsedClasses) {
    const openApiSpec = {
        openapi: "3.0.0",
        info: {
            title: "API Documentation",
            version: "1.0.0"
        },
        paths: {},
        components: {
            schemas: {}
        }
    };

    parsedClasses.forEach(parsedClass => {
        const schema = {
            type: "object",
            properties: {}
        };

        parsedClass.properties.forEach(prop => {
            const propType = mapJavaTypeToOpenApiType(prop.type);

            if (parsedClasses.find(cls => cls.className === prop.type)) {
                // Se o tipo é uma classe mapeada, faça uma referência
                schema.properties[prop.name] = {
                    $ref: `#/components/schemas/${prop.type}`
                };
            } else {
                // Caso contrário, mapeie para um tipo simples
                schema.properties[prop.name] = {
                    type: propType
                };
            }
        });

        openApiSpec.components.schemas[parsedClass.className] = schema;
    });

    return yaml.dump(openApiSpec);
}

function mapJavaTypeToOpenApiType(javaType) {
    switch (javaType) {
        case 'int':
        case 'Integer':
            return 'integer';
        case 'String':
            return 'string';
        case 'boolean':
        case 'Boolean':
            return 'boolean';
        case 'float':
        case 'double':
            return 'number';
        default:
            return 'string'; // Padrão
    }
}

function processJavaFilesInDirectory(directoryPath) {
    const javaFiles = fs.readdirSync(directoryPath).filter(file => file.endsWith('.java'));
    const parsedClasses = javaFiles.map(file => {
        const filePath = path.join(directoryPath, file);
        return parseJavaClass(filePath);
    });
    
    return parsedClasses;
}

const directoryPath = 'C:\\Users\\Ghaal\\Documents\\GitHub\\nodejs-openapi-java-object-parser\\src\\example'; // Substitua pelo caminho da sua pasta
const parsedClasses = processJavaFilesInDirectory(directoryPath);
const yamlContent = generateOpenApiYaml(parsedClasses);

fs.writeFileSync('api-spec.yaml', yamlContent);

console.log('YAML gerado com sucesso!');
