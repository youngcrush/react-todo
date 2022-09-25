import { useState } from 'react';
function TodoForm (props) {
    const [value, setValue] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        value && props.addTask(value)
        setValue("");
    };
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={value}
                placeholder="Enter a title for this task…"
                onChange={e => setValue(e.target.value)}
            />
            <button type="submit">Add</button>
        </form>
    );
}

export default TodoForm;