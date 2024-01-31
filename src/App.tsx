import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { QuizQuestionsPage } from "./pages/QuizQuestionsPage";
import { ResultPage } from "./pages/ResultPage";

function App(): JSX.Element {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<QuizQuestionsPage />} />
          <Route path="/results" element={<ResultPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
