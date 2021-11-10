import BudgetTableRow from "./BudgetTableRow";

const BudgetTable = ({ data, setDataToEdit, deleteData }) => {
  return (
    <div>
      <h3>TRANSACTION RECORD</h3>
      <table>
        <thead>
          <tr>
            <th>AMOUNT</th>
            <th>CONCEPT</th>
            <th>TYPE</th>
            <th>DATE</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((el) => (
              <BudgetTableRow
                key={el._id}
                el={el}
                setDataToEdit={setDataToEdit}
                deleteData={deleteData}
              />
            ))
          ) : (
            <tr>
              <td colSpan="3">No Transactions to show...</td>
            </tr>
          )}
        </tbody>
      </table>
      <hr />
    </div>
  );
};

export default BudgetTable;
