// to debug stuff like api calls

import { useFeedback } from "@/components/Feedback";

function DebugView(props) {
  const feedback = useFeedback();

  console.log(props.data);
  return (
    <div>
      <h1>debug view</h1>
      <h2>Home</h2>
      <button onClick={feedback.open}>open feedback</button>
      <button onClick={feedback.close}>close feedback</button>
    </div>
  );
}

export default DebugView;
