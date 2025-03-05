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
      overflow: auto;
    }
    #root {
      height: 100%;
      width: 100%;
    }

    /* Estilização padrão da scrollbar */
    *::-webkit-scrollbar {
      height: 3px;
      width: 3px;
    }
    *::-webkit-scrollbar-track {
      border-radius: 5px;
      background-color: #2E2A34;
    }
    *::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background-color: ${color};
    }

    /* Tornar a scrollbar invisível em dispositivos móveis */
    @media (max-width: 768px) {
      * {
        scrollbar-width: none; /* Firefox */
      }
      *::-webkit-scrollbar {
        display: none; /* Chrome, Safari e Edge */
        width: 0;
        height: 0;
      }
    }
    `}
  </style>
);
