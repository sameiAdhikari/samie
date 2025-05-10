import styled from "styled-components";
import { HiXMark } from "react-icons/hi2";
import { createPortal } from "react-dom";
import { cloneElement, createContext, useContext, useState } from "react";
import useClickOutside from "../hooks/useClickOutside";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;
const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const open = (name) => setOpenName(name);
  const close = () => setOpenName("");

  return (
    <ModalContext.Provider value={{ open, close, openName }}>
      {children}
    </ModalContext.Provider>
  );
}
function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ name, children }) {
  const { close, openName } = useContext(ModalContext);
  const ref = useClickOutside(close);
  if (openName !== name) return null;

  return createPortal(
    // createPortal os use to display a model completely outside of dom tree in order to avoid conflict of overflow properties/ it takes two arguement 1) react jsx and 2) where exactly do you want to show basically html dom
    <Overlay>
      <StyledModal ref={ref}>
        <Button>
          <HiXMark onClick={close} />
        </Button>
        <div>{cloneElement(children, { onCloseModel: close })} </div>
        {/* <CreateCabinForm></CreateCabinForm> */}
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
