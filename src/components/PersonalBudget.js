import { useEffect, useState } from "react";
import BudgetForm from "./BudgetForm";
import BudgetTable from "./BudgetTable";
import Loader from "./Loader";
import Message from "./Message";
import axios from "axios";
import Balance from "./Balance";

const PersonalBudget = () => {
  const [db, setDb] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);

  let url = "http://localhost:3001/api/v1";

  useEffect(() => {
    setLoading(true);
    axios.get(`${url}/transactions`).then((res) => {
      console.log(res.data);
      if (!res.err) {
        setDb(res.data.slice(0, 10));
        setError(null);
      } else {
        setDb(null);
        setError(res);
      }
      setLoading(false);
    });
  }, [url]);

  useEffect(async () => {
    try {
      const res = await axios(`${url}/transactions`);
      const data2 = res;
      const total = data2.data.reduce(
        (acc, currentValue) =>
          currentValue.currentOption.toUpperCase() === "WITHDRAW"
            ? acc - currentValue.amount
            : acc + currentValue.amount,
        0
      );
      setBalance(total);
    } catch (err) {
      console.error(err);
    }
  }, [db]);

  const createData = (data) => {
    axios.post(`${url}/transactions`, data).then((res) => {
      if (!res.err) {
        const newData = [res.data, ...db];
        newData.pop();
        setDb(newData);
      } else {
        setError(res);
      }
    });
  };

  const updateData = (data) => {
    axios.put(`${url}/transactions/${data._id}`, data).then((res) => {
      if (!res.err) {
        let newData = db.map((el) => (el._id === data._id ? data : el));
        setDb(newData);
      } else {
        setError(res);
      }
    });
  };

  const deleteData = (id) => {
    let isDelete = window.confirm(
      `¿Estás seguro de eliminar el registro con el id '${id}'?`
    );
    if (isDelete) {
      let endpoint = `${url}/transactions/${id}`;
      let options = {
        headers: { "content-type": "application/json" },
      };

      axios.delete(endpoint, options).then((res) => {
        if (!res.err) {
          let newData = db.filter((el) => el._id !== id);
          setDb(newData);
        } else {
          setError(res);
        }
      });
    } else {
      return;
    }
  };

  return (
    <div>
      <div>
        <h1>PERSONAL BUDGET</h1>
      </div>
      <article>
        <Balance balance={balance} />
        <hr />
        <BudgetForm
          createData={createData}
          updateData={updateData}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
        />
        <hr />
        {loading && <Loader />}
        {error && (
          <Message
            msg={`Error ${error.status}: ${error.statusText}`}
            bgColor="#dc3545"
          />
        )}
        {db && (
          <BudgetTable
            data={db}
            setDataToEdit={setDataToEdit}
            deleteData={deleteData}
          />
        )}
      </article>
    </div>
  );
};

export default PersonalBudget;
