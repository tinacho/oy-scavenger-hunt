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
    []
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
    color: "var(--text-invert)",
  },
  SUCCESS: {
    backgroundColor: "var(--positive)",
    color: "var(--text-invert)",
  },
};
const FeedbackDisplayBox = styled.div`
  position: fixed;
  width: 100%;
  min-height: 60px;
  padding: 30px;
  background-color: ${(props) => MODE_MAPPER[props.mode].backgroundColor};
  color: ${(props) => MODE_MAPPER[props.mode].color};
  display: flex;
  justify-content: space-between;
`;

const FeedbackDisplayMessage = styled.div`
  flex-grow: 1;
`;

const FeedbackDisplayClose = styled.button``;

const defaultCb = () => {};

function FeedbackDisplay() {
  const context = useContext(FeedbackContext);

  const setup = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(
    ({ message, mode = "INFO", timeout = 3000, onClose = defaultCb }) => {
      console.log({ message, mode, timeout, onClose });

      setup.current = {
        message,
        mode,
        timeout,
        onClose,
      };
      setIsOpen(true);
    },
    []
  );

  const close = useCallback(() => {
    console.log("closing feedback consumer");
    setup.current = {};
    setIsOpen(false);
  }, []);

  useEffect(() => {
    context.registerConsumer({
      open,
      close,
    });
  }, []);

  if (isOpen) {
    return (
      <FeedbackDisplayBox {...setup.current}>
        <FeedbackDisplayMessage>{setup.current.message}</FeedbackDisplayMessage>
        <FeedbackDisplayClose>close</FeedbackDisplayClose>
      </FeedbackDisplayBox>
    );
  }

  return null;
}

export { FeedbackDisplay, FeedbackProvider, FeedbackContext, useFeedback };
