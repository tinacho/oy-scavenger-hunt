// concept

const {
  useMemo,
  createContext,
  useContext,
  useCallback,
  useEffect,
  useRef,
} = require("react");

// function myComponent() {
//   const feedback = useFeedback();

//   feedback.open({
//     message: "hans",
//     mode: "ERROR",
//     timeout: 2000, // when set to null has to be closed manually
//     onClose: (closedByUser) =>
//       console.log("closed " + closedByUser ? "by user" : "after timeout"), // optional
//   });

//   // simple neutral info message visible for 3 s
//   feedback.open({
//     message: "huhu",
//   });

//   feedback.open({
//     message: "amazing!",
//     mode: "SUCCESS",
//     timeout: null,
//     onClose: () => {
//       console.log("continue with user flow");
//     },
//   });

//   feedback.isOpen(); // true/false
//   feedback.close(); // force close programmatically
// }

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
      isOpen: messageConsumer("isOpen"),
    }),
    []
  );

  return (
    <FeedbackContext.Provider value={value}>
      {children}
    </FeedbackContext.Provider>
  );
}

function FeedbackDisplay() {
  const context = useContext(FeedbackContext);

  console.log(context);

  const open = useCallback(() => {
    console.log("opening feedback consumer");
  }, []);

  const close = useCallback(() => {
    console.log("closing feedback consumer");
  }, []);

  useEffect(() => {
    context.registerConsumer({
      open,
      close,
    });
  }, []);

  return null;
}

// const open = useCallback(
//   ({ message, mode = "INFO", timeout = 3000, onClose = defaultCb }) => {
//     console.log({ message, mode, timeout, onClose });
//     f.open;
//   },
//   []
// );

// return useMemo(
//   () => ({
//     open,
//   }),
//   [open]
// );

// const defaultCb = () => {};

function useFeedback() {
  return useContext(FeedbackContext);
}

export { FeedbackDisplay, FeedbackProvider, FeedbackContext, useFeedback };
