// import React, { useState } from "react";
// import axios from "axios";

// const Careers = () => {
//   const [input, setInput] = useState(""); // State to store user input
//   const [response, setResponse] = useState(""); // State to store API response
//   const [loading, setLoading] = useState(false); // State to handle loading state
//   const [questionCount, setQuestionCount] = useState(0); // State to track question count
//   const [question, setQuestion] = useState(""); // State to store the current question
//   const [correctAnswer, setCorrectAnswer] = useState(""); // State to store the correct answer
//   const [feedback, setFeedback] = useState(""); // State to store feedback
//   const [sessionActive, setSessionActive] = useState(false); // State to track if the session is active
//   const [correctAnswers, setCorrectAnswers] = useState(0); // State to track correct answers
//   const [incorrectAnswers, setIncorrectAnswers] = useState(0); // State to track incorrect answers
//   const totalQuestions = 5; // Total number of questions

//   const generateQuestion = async () => {
//     const url =
//       "https://sohaibsaleem89-ai-interview-chatbot2.hf.space/run/predict";

//     const payload = {
//       data: ["Generate a short, relevant question related to React."],
//     };
//     try {
//       const response = await axios.post(url, payload, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       console.log("response", response);
//       if (response.status === 200) {
//         const result = response.data.data[0];
//         setQuestion(result);
//         return result;
//       } else {
//         console.error("Failed to generate question:", response.statusText);
//         return null;
//       }
//     } catch (error) {
//       console.error(
//         "Error generating question:",
//         error.response?.data || error.message
//       );
//       return null;
//     }
//   };

//   const generateCorrectAnswer = async (question) => {
//     const url =
//       "https://sohaibsaleem89-ai-interview-chatbot2.hf.space/run/predict";
//     const payload = {
//       data: [
//         `Provide a concise answer for the following question: ${question}`,
//       ], // Adjust the prompt as needed
//     };

//     try {
//       const response = await axios.post(url, payload, {
//         headers: { "Content-Type": "application/json" },
//       });

//       if (response.status === 200) {
//         const result = response.data.data[0]; // Extract the correct answer
//         setCorrectAnswer(result); // Set the correct answer in state
//         return result; // Return the result for further use
//       } else {
//         console.error(
//           "Failed to generate correct answer:",
//           response.statusText
//         );
//         return null;
//       }
//     } catch (error) {
//       console.error("Error generating correct answer:", error);
//       return null;
//     }
//   };

//   // Function to start the interview session
//   const startInterview = async () => {
//     setSessionActive(true);
//     const generatedQuestion = await generateQuestion();
//     if (generatedQuestion) {
//       await generateCorrectAnswer(generatedQuestion);
//       setQuestionCount(1); // Start the question count
//     }
//   };

//   // Function to handle answer submission
//   const handleSubmitAnswer = async () => {
//     setLoading(true);
//     try {
//       // Simulate feedback for demonstration
//       setFeedback("Your answer is correct!");
//       setCorrectAnswers((prev) => prev + 1);
//     } catch (error) {
//       console.error("Error checking answer:", error);
//     } finally {
//       setLoading(false);
//       setInput(""); // Clear the input field

//       // Generate a new question if the session is still active
//       if (questionCount < totalQuestions) {
//         const generatedQuestion = await generateQuestion();
//         if (generatedQuestion) {
//           await generateCorrectAnswer(generatedQuestion);
//           setQuestionCount((prev) => prev + 1); // Increment the question count
//         }
//       } else {
//         setSessionActive(false); // End the session
//       }
//     }
//   };

//   return (
//     <div style={styles.container}>
//       {/* Header */}
//       <h1 style={styles.header}>AI Interview Chatbot</h1>

//       {/* Start Interview Button */}
//       {!sessionActive && (
//         <button onClick={startInterview} style={styles.button}>
//           Start Interview
//         </button>
//       )}

//       {/* Progress Indicator */}
//       {sessionActive && (
//         <div style={styles.progressContainer}>
//           <p style={styles.progressText}>
//             Question {questionCount} of {totalQuestions}
//           </p>
//           <div style={styles.progressBar}>
//             <div
//               style={{
//                 ...styles.progressFill,
//                 width: `${(questionCount / totalQuestions) * 100}%`,
//               }}
//             ></div>
//           </div>
//         </div>
//       )}

//       {/* Chatbot Question */}
//       {sessionActive && questionCount <= totalQuestions && (
//         <div style={styles.questionContainer}>
//           <p style={styles.questionText}>
//             Question {questionCount}: {question}
//           </p>
//         </div>
//       )}

//       {/* Input Area */}
//       {sessionActive && questionCount <= totalQuestions && (
//         <textarea
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type your answer here..."
//           style={styles.textarea}
//         />
//       )}

//       {/* Submit Answer Button */}
//       {sessionActive && questionCount <= totalQuestions && (
//         <button
//           onClick={handleSubmitAnswer}
//           disabled={loading || !input.trim()}
//           style={styles.button}
//         >
//           {loading ? "Loading..." : "Submit Answer"}
//         </button>
//       )}

//       {/* Feedback Area */}
//       {feedback && (
//         <div style={styles.responseContainer}>
//           <h2 style={styles.responseHeader}>Feedback:</h2>
//           <p style={styles.responseText}>{feedback}</p>
//         </div>
//       )}

//       {/* Interview Summary */}
//       {!sessionActive && questionCount === totalQuestions && (
//         <div style={styles.summaryContainer}>
//           <h2 style={styles.summaryHeader}>Interview Summary:</h2>
//           <p style={styles.summaryText}>Correct Answers: {correctAnswers}</p>
//           <p style={styles.summaryText}>
//             Incorrect Answers: {incorrectAnswers}
//           </p>
//           {correctAnswers >= totalQuestions * 0.75 ? (
//             <p style={styles.successText}>
//               Congratulations! You performed exceptionally well.
//             </p>
//           ) : correctAnswers >= totalQuestions * 0.5 ? (
//             <p style={styles.warningText}>
//               Good job! You did well, but there's room for improvement.
//             </p>
//           ) : (
//             <p style={styles.errorText}>
//               Keep practicing! You can do better next time.
//             </p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// // Styles
// const styles = {
//   container: {
//     maxWidth: "600px",
//     margin: "0 auto",
//     padding: "20px",
//     fontFamily: "Arial, sans-serif",
//     backgroundColor: "#f9f9f9",
//     borderRadius: "10px",
//     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//   },
//   header: {
//     textAlign: "center",
//     color: "#333",
//     marginBottom: "20px",
//   },
//   progressContainer: {
//     marginBottom: "20px",
//   },
//   progressText: {
//     fontSize: "16px",
//     color: "#555",
//     marginBottom: "5px",
//   },
//   progressBar: {
//     width: "100%",
//     height: "10px",
//     backgroundColor: "#e0e0e0",
//     borderRadius: "5px",
//     overflow: "hidden",
//   },
//   progressFill: {
//     height: "100%",
//     backgroundColor: "#007bff",
//     transition: "width 0.3s ease",
//   },
//   questionContainer: {
//     marginBottom: "20px",
//   },
//   questionText: {
//     fontSize: "18px",
//     color: "#333",
//   },
//   textarea: {
//     width: "100%",
//     height: "100px",
//     padding: "10px",
//     fontSize: "16px",
//     borderRadius: "5px",
//     border: "1px solid #ccc",
//     marginBottom: "20px",
//     resize: "none",
//   },
//   button: {
//     width: "100%",
//     padding: "10px",
//     fontSize: "16px",
//     backgroundColor: "#007bff",
//     color: "#fff",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//     transition: "background-color 0.3s ease",
//   },
//   buttonDisabled: {
//     backgroundColor: "#ccc",
//     cursor: "not-allowed",
//   },
//   responseContainer: {
//     marginTop: "20px",
//     padding: "15px",
//     backgroundColor: "#fff",
//     borderRadius: "5px",
//     border: "1px solid #ddd",
//   },
//   responseHeader: {
//     fontSize: "20px",
//     color: "#333",
//     marginBottom: "10px",
//   },
//   responseText: {
//     fontSize: "16px",
//     color: "#555",
//   },
//   summaryContainer: {
//     marginTop: "20px",
//     padding: "15px",
//     backgroundColor: "#fff",
//     borderRadius: "5px",
//     border: "1px solid #ddd",
//   },
//   summaryHeader: {
//     fontSize: "20px",
//     color: "#333",
//     marginBottom: "10px",
//   },
//   summaryText: {
//     fontSize: "16px",
//     color: "#555",
//   },
//   successText: {
//     fontSize: "16px",
//     color: "green",
//   },
//   warningText: {
//     fontSize: "16px",
//     color: "orange",
//   },
//   errorText: {
//     fontSize: "16px",
//     color: "red",
//   },
// };

// export default Careers;
