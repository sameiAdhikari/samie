import styled from "styled-components";
import PropTypes from "prop-types";
import { formatCurrency } from "../../utils/helpers";

import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import useCreateCabin from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { Table } from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const [isDeleting, deleteCabin] = useDeleteCabin();
  const { createCabin } = useCreateCabin();

  const {
    id: cabinId,
    name,
    image,
    regularPrice,
    maxCapacity,
    discount,
    description,
  } = cabin;

  function handleDuplicate() {
    const data = {
      name: `copy of ${name}`,
      image,
      regularPrice,
      discount,
      description,
      maxCapacity,
    };
    createCabin(data);
  }
  return (
    <Table.Row>
      <Img src={image}></Img>
      <Cabin> {name}</Cabin>
      <div> fit up to {maxCapacity} person</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? <Discount>{discount} </Discount> : <span>&mdash;</span>}
      <div>
        <Modal>
          <Menus>
            <Menus.Toggle id={cabinId}></Menus.Toggle>
            <Menus.List id={cabinId}>
              <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
                Duplicate
              </Menus.Button>

              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="Cabin"
                disabled={isDeleting}
                onConfirm={() => deleteCabin(cabinId)}
              ></ConfirmDelete>
            </Modal.Window>
          </Menus>
        </Modal>
      </div>
    </Table.Row>
  );
}
CabinRow.propTypes = {
  cabin: PropTypes.object,
};
export default CabinRow;
