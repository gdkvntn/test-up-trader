import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FormTask from "../components/FormTask";
import Table from "../components/Table";

export default function Tasks() {
  let { id } = useParams();

  return (
    <div className="tasks">
      <FormTask id={id} />
      <Table idPrj={id} />
    </div>
  );
}
