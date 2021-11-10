import moment from "moment";
import "../assets/css/BudgetTableRow.css";

const BudgetTableRow = ({ el, setDataToEdit, deleteData }) => {
  let { amount, concept, _id, currentOption, createdAt } = el;

  function formatNumber(number) {
    return new Intl.NumberFormat("ES-AR", {
      style: "currency",
      currency: "ARS",
    }).format(number);
  }

  return (
    <tr
      key={_id}
      className={
        currentOption === "Income" ? "incomeColor td" : "withdrawColor td"
      }
    >
      <td>{formatNumber(amount)}</td>
      <td>{concept}</td>
      <td>{currentOption}</td>
      <td>{moment(createdAt).format("DD/MM/YYYY")}</td>
      <td>
        <button onClick={() => setDataToEdit(el)}>Edit</button>
        <button onClick={() => deleteData(_id)}>Delete</button>
      </td>
    </tr>
  );
};

export default BudgetTableRow;
