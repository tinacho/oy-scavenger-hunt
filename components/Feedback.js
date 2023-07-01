// concept

function myComponent() {
  const feedback = useFeedback()

  feedback.open({
    message: 'hans',
    mode: 'ERROR',
    timeout: 2000, // when set to null has to be closed manually
    onClose: (closedByUser) => console.log('closed ' + closedByUser ? 'by user' : 'after timeout') // optional
  })

  // simple neutral info message visible for 3 s
  feedback.open({
    message: 'huhu',
  })

  feedback.open({
    message: 'amazing!',
    mode: 'SUCCESS',
    timeout: null,
    onClose: () => {
      console.log('continue with user flow')
    }
  })

  feedback.isOpen() // true/false
  feedback.close() // force close programmatically

}