import { Suspense, useEffect, useState } from "react";
import { TurnScheduler } from "./pages";
import LoadingSpinner from "./pages/Loading";

function App() {
  // Initially set isLoading to true to display the loading spinner
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate an API request or any loading process
    setTimeout(() => {
      setIsLoading(false); // Set isLoading to false when loading is complete
    }, 2000); // Simulating 2 seconds of loading
  }, []);

  return (
    <div className="App">
      <Suspense fallback={<LoadingSpinner isLoading={true} />}>
        {/* Display the loading spinner until isLoading is false */}
        {isLoading ? (
          <LoadingSpinner isLoading={isLoading} />
        ) : (
          // Display the TurnScheduler component when loading is complete
          <TurnScheduler />
        )}
      </Suspense>
    </div>
  );
}

export default App;
