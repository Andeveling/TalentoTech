# Taller 01 - Talento Tech: HOC en React

Este proyecto es parte del **Taller 01 de Talento Tech** y su objetivo es crear un **Higher-Order Component (HOC)** en React para manejar la lógica de carga de datos desde una API. El HOC inyecta los datos, el estado de carga y los posibles errores en un componente envuelto, permitiendo que dicho componente solo se encargue de la presentación.

## Descripción del HOC

Un **HOC (Higher-Order Component)** es una función que toma un componente como argumento y devuelve un nuevo componente, añadiendo funcionalidades adicionales. En este caso, el HOC maneja la lógica de la carga de datos desde una API externa (en este caso, `https://jsonplaceholder.typicode.com/users/2/todos`), y pasa esos datos como `props` al componente que envuelve.

### Funcionalidades del HOC:
- **Carga de datos**: Realiza una petición a la API para obtener una lista de tareas (todos).
- **Manejo de estado**: Controla tres estados: 
  - `data`: Datos obtenidos de la API.
  - `loading`: Estado de carga, que es `true` mientras los datos se están obteniendo.
  - `error`: Manejo de posibles errores en la petición.
  
El componente envuelto (WrappedComponent) solo se encarga de recibir estos `props` y renderizar la UI.

### HOC: `withDataFetch`

El HOC `withDataFetch` realiza las siguientes tareas:
1. **Petición de datos**: Utiliza la función `fetch` para hacer una petición a una API.
2. **Manejo de errores**: Captura y gestiona cualquier error que ocurra durante la petición.
3. **Inyección de props**: Inyecta los datos (`data`), el estado de carga (`loading`) y los errores (`error`) al componente envuelto.

### Ejemplo de implementación del HOC:

```tsx
import type React from "react";
import { useState, useEffect, useCallback } from "react";

// Definir la estructura esperada de los datos
export interface Todo {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
}

// Props que el HOC añadirá
interface InjectedProps {
	data: Todo[] | null;
	loading: boolean;
	error: string | null;
}

// El HOC
const withDataFetch = <P extends object>(
	WrappedComponent: React.ComponentType<P & InjectedProps>,
) => {
	return function WithDataFetch(props: P) {
		const [data, setData] = useState<Todo[] | null>(null);
		const [loading, setIsLoading] = useState(true);
		const [error, setError] = useState<string | null>(null);

		const dataFetch = useCallback(async () => {
			try {
				setIsLoading(true);
				const response = await fetch(
					"https://jsonplaceholder.typicode.com/users/2/todos",
				);
				if (!response.ok) {
					throw new Error("Something went wrong");
				}
				const data: Todo[] = await response.json();
				setData(data);
			} catch (error) {
				if (error instanceof Error) {
					setError(error.message);
				} else {
					setError("An unknown error occurred");
				}
			} finally {
				setIsLoading(false);
			}
		}, []);

		useEffect(() => {
			dataFetch();
		}, [dataFetch]);

		// Pasamos los datos adicionales como props al WrappedComponent
		return (
			<WrappedComponent
				{...props}
				data={data}
				loading={loading}
				error={error}
			/>
		);
	};
};

export default withDataFetch;
```

## Componente de Lista de Tareas (`TodoList`)

El componente `TodoList` es un ejemplo de cómo usar el HOC `withDataFetch`. Este componente muestra una lista de tareas,  maneja los estados de carga y error.

### Ejemplo de `TodoList`:

```tsx
import type { Todo } from "./hoc/with-data-fetch";
import withDataFetch from "./hoc/with-data-fetch";

interface Props {
	data: Todo[] | null;
	loading: boolean;
	error: string | null;
}

// Componente que renderiza la lista de tareas
const TodoList = ({ data, loading, error }: Props) => {
	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<ul>
			{data?.map((todo) => (
				<li key={todo.id}>{todo.title}</li>
			))}
		</ul>
	);
}

const WrappedTodoList = withDataFetch(TodoList);

export default WrappedTodoList;
```

## Cómo ejecutar el proyecto

1. Clona el repositorio.
2. Instala las dependencias usando `npm install` o `yarn install`.
3. Ejecuta el proyecto con `npm start` o `yarn start`.

## Objetivos de Aprendizaje

1. **Comprender qué es un HOC en React** y cómo se puede usar para inyectar lógica de negocios en componentes sin modificar su estructura.
2. **Manejo de estado** utilizando hooks como `useState`, `useEffect` y `useCallback`.
3. **Manejo de errores en peticiones** asíncronas y cómo propagar estos errores a través de componentes.
4. **Renderizado condicional** basado en los estados de carga (`loading`) y error (`error`).

