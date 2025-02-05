export const GlobalStyles: React.FC<{ color?: string }> = ({ color = "#7809C2" }) => (
  <style>
    {`
    * {
      font-family: "Raleway", sans-serif;
      padding: 0;
      margin: 0;
      box-sizing: border-box;
      font-weight: 500;
    }
    html, body {
      background-color: #1F1D22;
      height: 100%;
      width: 100%;
    }
    #root {
      height: 100%;
      width: 100%;
    }

    *::-webkit-scrollbar {
      height: 3px;
      width: 3px;
    }
    *::-webkit-scrollbar-track {
      border-radius: 5px;
      background-color: #2E2A34;
    }

    *::-webkit-scrollbar-track:hover {
      background-color: #2E2A34;
    }

    *::-webkit-scrollbar-track:active {
      background-color: #2E2A34;
    }

    *::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background-color: ${color};
    }

    *::-webkit-scrollbar-thumb:hover {
      background-color: ${color};
    }

    *::-webkit-scrollbar-thumb:active {
      background-color: ${color};
    }
    `}
  </style>
);
