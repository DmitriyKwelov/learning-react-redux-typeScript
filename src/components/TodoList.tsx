import React, {FC, useEffect} from 'react';
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useAction} from "../hooks/useAction";

const TodoList: FC = () => {
    const {todos, loading, error, limit, page} = useTypedSelector(state => state.todo)
    const {fetchTodo, setTodoPage} = useAction()
    const pages = [1, 2, 3, 4, 5]

    useEffect(() => {
        fetchTodo(page, limit)
    }, [page])

    if (loading) {
        return <h1>Идёт загрузка</h1>
    }
    if (error) {
        return <h1>{error}</h1>
    }

    return (
        <div>
            {todos.map(todo =>
                <div key={todo.id}>{todo.id} - {todo.title}</div>
            )}
            <div style={{display: 'flex'}}>
                {pages.map(p =>
                    <div
                        onClick={() => setTodoPage(p)}
                        style={{border: p === page ? '2px solid red' : '1px solid black', padding: 10}}
                    >
                        {p}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TodoList;