import { useExpenses } from "./expenses";
import { dateFormatter } from "./utils/date-formatter";
import "./expense.css";

function App() {
  const [expenses, isLoading, hasError, errMsg] = useExpenses();

  return (
    <div>
      {isLoading ? <>Loading</> : <></>}
      {hasError ? <>{errMsg} </> : <></>}
      {expenses && (
        <>
          <h4> Expenses</h4>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Merchant</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(expenses.transactions).map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.id}</td>
                  <td>{dateFormatter(expense.date)}</td>
                  <td>{expense.amount}</td>
                  <td>{expense.merchant}</td>
                  <td>{expense.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default App;
