import WrappedTodoList from "./components/todo-list";
import "./App.css";

function App() {
	return (
		<main>
			<h1>Todo list con HOC</h1>
			<div className="grid-container">
				<div className="grid-item">
					<h1>Todo List 1</h1>
					<WrappedTodoList />
				</div>
				<div className="grid-item">
					<h1>Todo List 2</h1>
					<WrappedTodoList />
				</div>
			</div>
		</main>
	);
}

export default App;
