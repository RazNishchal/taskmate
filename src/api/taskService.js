export const taskService = {
    fetchInitial: async () => {
        const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
        const data = await res.json();
        return data.map(todo => ({
            id: todo.id,
            title: todo.title,
            dueDate: "2025-12-31",
            status: todo.completed ? 'Done' : 'Pending'
        }));
    }
};