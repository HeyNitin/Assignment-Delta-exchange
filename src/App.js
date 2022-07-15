import { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import { TableData } from "./TableData";

export default function App() {
  const [data, setData] = useState([]);

  // I'm using cors-anywhere as proxy, as api call is blocked by cors.

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { result }
        } = await axios.get(
          "https://cors-anywhere.herokuapp.com/https://api.delta.exchange/v2/products"
        );
        setData(result.slice(0, 35));
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>Symbols</th>
            <th>Description</th>
            <th>Underlying Asset</th>
            <th>Mark Price</th>
          </tr>
        </thead>
        {data.map(({ symbol, description, underlying_asset }) => (
          <TableData
            key={symbol}
            symbol={symbol}
            description={description}
            underlying_asset={underlying_asset}
          />
        ))}
      </table>
    </div>
  );
}
