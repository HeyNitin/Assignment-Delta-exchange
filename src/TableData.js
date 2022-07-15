import { useEffect, useState } from "react";

const TableData = ({ symbol, description, underlying_asset }) => {
  const [markPrice, setMarkPrice] = useState("");
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    let socket = new WebSocket("wss://production-esocket.delta.exchange");

    socket.onopen = function (e) {
      socket.send(
        JSON.stringify({
          type: "subscribe",
          payload: {
            channels: [
              {
                name: "v2/ticker",
                symbols: [symbol]
              }
            ]
          }
        })
      );
    };
    socket.onmessage = function (event) {
      const res = JSON.parse(event.data).mark_price;
      if (res) {
        setMarkPrice(res);
        setLoader(false);
      }
    };

    socket.onerror = function (error) {
      setLoader(true);
      console.log(error);
    };
  }, [symbol]);

  return (
    <tbody>
      <tr>
        <td className="column">{symbol}</td>
        <td>{description}</td>
        <td>{underlying_asset.symbol}</td>
        <td>{loader ? "Loading..." : markPrice}</td>
      </tr>
    </tbody>
  );
};

export { TableData };
