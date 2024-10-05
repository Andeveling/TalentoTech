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
