import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { QuizQuestionsPage, ResultPage } from "src/pages";

const App = (): React.ReactNode => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<QuizQuestionsPage />} />
          <Route path="/results" element={<ResultPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
