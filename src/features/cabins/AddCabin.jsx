// import { useState } from "react";
import Button from "../../ui/Button";
// import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

// function AddCabin() {
//   const [showForm, setShowForm] = useState(false);
//   //   const toggleForm = (state) => setShowForm(!state);

//   return (
//     <div>
//       <Button onClick={() => setShowForm(!showForm)}>add new cabin</Button>
//       {showForm && (
//         <Modal onClick={(state) => setShowForm(!state)}>
//           <CreateCabinForm onCloseModel={() => setShowForm(!showForm)} />
//         </Modal>
//       )}
//       {/* {showForm && <CreateCabinForm />} */}
//     </div>
//   );
// }

// export default AddCabin;

function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button>add new cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddCabin;
