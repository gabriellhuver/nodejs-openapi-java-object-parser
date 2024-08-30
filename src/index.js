const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

function parseJavaClass(javaFilePath) {
    const classContent = fs.readFileSync(javaFilePath, 'utf8');
    
    const classNameMatch = classContent.match(/class\s+(\w+)/);
    const className = classNameMatch ? classNameMatch[1] : 'UnknownClass';

    const properties = [];
    const methods = [];

    const propertyMatches = classContent.match(/private\s+([\w<>]+)\s+(\w+);/g);
    if (propertyMatches) {
        propertyMatches.forEach(prop => {
            const match = prop.match(/private\s+([\w<>]+)\s+(\w+);/);
            properties.push({
                type: match[1],
                name: match[2]
            });
        });
    }

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

            if (propType === 'array') {
                const itemType = extractListItemType(prop.type);
                if (parsedClasses.find(cls => cls.className === itemType)) {
                    schema.properties[prop.name] = {
                        type: 'array',
                        items: {
                            $ref: `#/components/schemas/${itemType}`
                        }
                    };
                } else {
                    schema.properties[prop.name] = {
                        type: 'array',
                        items: {
                            type: mapJavaTypeToOpenApiType(itemType)
                        }
                    };
                }
            } else if (parsedClasses.find(cls => cls.className === prop.type)) {
                schema.properties[prop.name] = {
                    $ref: `#/components/schemas/${prop.type}`
                };
            } else {
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
    if (javaType.startsWith('List<')) {
        return 'array';
    }
    
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
            return 'string';
    }
}

function extractListItemType(listType) {
    const match = listType.match(/List<(\w+)>/);
    return match ? match[1] : 'string';
}

function processJavaFilesInDirectory(directoryPath) {
    let javaFiles = [];

    function readDirectoryRecursively(currentPath) {
        const items = fs.readdirSync(currentPath);

        items.forEach(item => {
            const fullPath = path.join(currentPath, item);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                readDirectoryRecursively(fullPath);
            } else if (stat.isFile() && fullPath.endsWith('.java')) {
                javaFiles.push(fullPath);
            }
        });
    }

    readDirectoryRecursively(directoryPath);
    
    const parsedClasses = javaFiles.map(file => parseJavaClass(file));
    return parsedClasses;
}

function generateYamlFromDirectory(directoryPath, outputFilePath) {
    const parsedClasses = processJavaFilesInDirectory(directoryPath);
    const yamlContent = generateOpenApiYaml(parsedClasses);
    fs.writeFileSync(outputFilePath, yamlContent);
    console.log('YAML gerado com sucesso!');
}

module.exports = {
    parseJavaClass,
    generateOpenApiYaml,
    processJavaFilesInDirectory,
    generateYamlFromDirectory
};
