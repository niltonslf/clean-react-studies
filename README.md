# Structure

```
├── data
├──── usecases
├── domain
├──── models
├──── usecases
├── infra
├── presentation
├── main
└── validation

```

## Infra

- Implementações de frameworks/libs externas
- Depende da camada de Data

## Data

- Implementação dos casos de uso especificados no domain
- Depende da camada de domain

## Domain

- Local onde é mantido as regras de negócios
- É independente das demais camadas

## presentation

- Componentes visuais da aplicação

## validation

- camada de validação de formulário

## main

- camada responsável por chamar todas as outras camadas
- depende de todas as camadas
