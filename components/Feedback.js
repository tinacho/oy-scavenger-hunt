import styled from "styled-components";
const {
  useMemo,
  createContext,
  useContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} = require("react");
import { CloseIcon } from "@/components/icons";

const FeedbackContext = createContext();

// the provider is just a link from the consumer to the context, we don't have any state in here to prevent big tree
// updates as the provider is at the base of the app
function FeedbackProvider({ children }) {
  const consumer = useRef(null);

  const messageConsumer = useCallback((method) => {
    return (...args) => consumer.current[method](...args);
  }, []);

  const value = useMemo(
    () => ({
      registerConsumer: (instance) => (consumer.current = instance),
      open: messageConsumer("open"),
      close: messageConsumer("close"),
    }),
    [messageConsumer]
  );

  return (
    <FeedbackContext.Provider value={value}>
      {children}
    </FeedbackContext.Provider>
  );
}

function useFeedback() {
  return useContext(FeedbackContext);
}

//// FEEDBACK DISPLAY IMPLEMENTATION
const MODE_MAPPER = {
  INFO: {
    backgroundColor: "var(--light-secondary)",
    color: "var(--text-invert)",
  },
  ERROR: {
    backgroundColor: "var(--negative)",
    color: "var(--text-primary)",
  },
  SUCCESS: {
    backgroundColor: "var(--positive-dark)",
    color: "var(--text-primary)",
  },
};

const FeedbackDisplayBox = styled.div`
  position: fixed;
  width: 100%;
  min-height: 120px;
  padding: 0 30px;
  background-color: ${(props) => MODE_MAPPER[props.mode].backgroundColor};
  color: ${(props) => MODE_MAPPER[props.mode].color};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.2;
  z-index: 10;
`;

const FeedbackDisplayMessage = styled.div`
  flex-grow: 1;
`;

const FeedbackDisplayClose = styled.button``;

const StyledClose = styled(CloseIcon)`
  width: 35px;
  height: 35px;
  margin-left: 20px;
`;

const defaultCb = () => {};

function FeedbackDisplay() {
  const context = useContext(FeedbackContext);
  const [isOpen, setIsOpen] = useState(false);
  const [setup, setSetup] = useState(null);
  const timeoutRef = useRef(null);

  const close = useCallback(() => {
    clearTimeout(timeoutRef.current);
    setSetup(null);
    setIsOpen(false);
  }, []);

  const open = useCallback(
    ({ message, mode = "INFO", timeout = 3000, onClose = defaultCb }) => {
      clearTimeout(timeoutRef.current);
      if (timeout !== null) {
        timeoutRef.current = setTimeout(close, timeout);
      }
      setSetup({
        message,
        mode,
        timeout,
        onClose,
      });
      setIsOpen(true);
    },
    []
  );

  useEffect(() => {
    context.registerConsumer({
      open,
      close,
    });
  }, []);

  if (isOpen) {
    return (
      <FeedbackDisplayBox {...setup}>
        <FeedbackDisplayMessage>{setup.message}</FeedbackDisplayMessage>
        <FeedbackDisplayClose
          onClick={(e) => {
            // @TINA: is that needed? i wasnt sure with overlaying buttons and fixed position
            e.preventDefault(); // prevent clicking through to the navbar
            close();
          }}
        >
          <StyledClose />
        </FeedbackDisplayClose>
      </FeedbackDisplayBox>
    );
  }

  return null;
}

export { FeedbackDisplay, FeedbackProvider, FeedbackContext, useFeedback };
