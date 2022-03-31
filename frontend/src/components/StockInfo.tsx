
export default function StockList (){






return (
    <div className="stock-list">
        <ul>
            {stock.map(stock =>
                <li key={stock.id}><TodoItem stock={stock} onTodoDeletion={fetchAll} onTodoChange={setTodos} /></li>)}
        </ul>
    </div>
)
}