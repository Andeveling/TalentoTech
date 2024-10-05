import type { Todo } from "./hoc/with-data-fetch";
import withDataFetch from "./hoc/with-data-fetch";

interface Props {
	data: Todo[] | null;
	loading: boolean;
	error: string | null;
}

// Componente que renderizará la lista de tareas
const TodoList = ({ data, loading, error }: Props) => {

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div>
			<ol>
				{data?.map((todo) => (
					<li key={todo.id}>{todo.title}</li>
				))}
			</ol>
		</div>
	);
};

const WrappedTodoList = withDataFetch(TodoList);

export default WrappedTodoList;
