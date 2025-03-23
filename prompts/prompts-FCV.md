# Prompts

## Prompt 1 - Claude Sonet 3.7

Asume el rol de un frontend software developer. 
Tengo un proyecto frontend sin tests y necesito generar un prompt para añadirlos. 
El prompt está destinado a Cursor, por lo que necesito que sea lo más claro y conciso posible, como si estuviera destinado a un desarrollador junior sin experiencia. Es importante que no des detalles técnicos específicos solo instrucciones. El output debe ser en md.

Debes crear pruebas E2E con cypress para verificar los siguientes escenarios:
1. **Carga de la Página de Position:**
   * Verifica que el título de la posición se muestra correctamente.
   * Verifica que se muestran las columnas correspondientes a cada fase del proceso de contratación.
   * Verifica que las tarjetas de los candidatos se muestran en la columna correcta según su fase actual.
2. **Cambio de Fase de un Candidato:**
   * Simula el arrastre de una tarjeta de candidato de una columna a otra.
   * Verifica que la tarjeta del candidato se mueve a la nueva columna.
   * Verifica que la fase del candidato se actualiza correctamente en el backend mediante el endpoint `PUT /candidate/:id`.


## Prompt 2 - Cursor modo agente + Claude Sonet 3.7 - context @frontend

# Prompt para Pruebas E2E con Cypress

## Contexto
Necesitamos implementar pruebas end-to-end (E2E) con Cypress para nuestra aplicación frontend de gestión de candidatos. Estas pruebas deben verificar la funcionalidad principal de la página de Position y la capacidad de cambiar candidatos entre diferentes fases del proceso.

## Casos de Prueba

### 1. Verificación de la Carga de la Página de Position
Implementa una prueba que:
- Visite la página de Position
- Verifique que el título de la posición aparece correctamente
- Compruebe que todas las columnas de fases están presentes
- Verifique que las tarjetas de candidatos aparecen en las columnas correctas según su fase actual

### 2. Cambio de Fase de un Candidato
Implementa una prueba que:
- Visite la página de Position
- Seleccione una tarjeta de candidato
- Arrastre esta tarjeta desde su columna actual a una nueva columna
- Verifique que la tarjeta aparece visualmente en la nueva columna
- Intercepte y verifique la llamada al endpoint `PUT /candidate/:id` para confirmar que se actualiza la fase del candidato en el backend

## Consideraciones
- Utiliza selectores estables (data-testid, data-cy) para los elementos del DOM
- Implementa esperas adecuadas para las operaciones asíncronas
- Simula correctamente las operaciones de arrastrar y soltar
- Verifica tanto el estado visual como las llamadas API

## Estructura Sugerida
Organiza las pruebas en un archivo `position.spec.js` dentro de la carpeta de pruebas E2E de Cypress.


## Prompt 3
