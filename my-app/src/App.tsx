import { MantineProvider, Tabs } from "@mantine/core";
import "@mantine/core/styles.css";

import "./App.css";
import ProblemOne from "./ProblemOne";
import ProblemTwo from "./ProblemTwo";
import { useState } from "react";

function App() {
  const [activeTab, setActiveTab] = useState<string | null>("first");

  return (
    <>
      <div className="w-xl h-screen">
        <MantineProvider>
          <div>
            <Tabs value={activeTab} onChange={setActiveTab}>
              <div className="py-6">
                <Tabs.List>
                  <Tabs.Tab value="first">First tab</Tabs.Tab>
                  <Tabs.Tab value="second">Second tab</Tabs.Tab>
                </Tabs.List>
              </div>

              <Tabs.Panel value="first">
                <ProblemOne />
              </Tabs.Panel>

              <Tabs.Panel value="second">
                <ProblemTwo />
              </Tabs.Panel>
            </Tabs>
          </div>
        </MantineProvider>
      </div>
    </>
  );
}

export default App;
