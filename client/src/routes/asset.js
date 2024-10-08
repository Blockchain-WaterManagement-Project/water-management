import React from "react";
import { Form } from "react-router-dom";
import { FaStar, FaRegStar } from "react-icons/fa";

export default function Asset() {
  const waterNFt = {
    avatar: "https://robohash.org/1.png?size=200x200",
    name: "Bill Adson",
    myAsset: false,
  };

  return (
    <div className="d-flex flex-row p-2">
      <div className="d-flex border-2" style={{ maxWidth: "350px" }}>
        <div className="">
          <img
            key={waterNFt.avatar}
            src={`https://robohash.org/${waterNFt.id}.png?size=200x200`}
            className="d-block mx-auto rounded img-fluid"
          />
        </div>
        <div className="">
          <h5>
            {waterNFt.name ? <>{waterNFt.name}</> : <i>No Name</i>}{" "}
            <MyAsset nft={waterNFt} />
          </h5>
          {/* fetch data from IPFS */}
          {/* functionalities */}
          <div className="d-flex justify-content-center gap-3 ml-3 mb-3 p-2">
            <Form action="trade">
              <button type="submit" className="btn btn-success pl-3 pr-3">
                Trade
              </button>
            </Form>
            <Form action="view">
              <button type="submit" className="btn btn-secondary pl-3 pl-3">
                View
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

function MyAsset({ nft }) {
  const myAsset = nft.myAsset;

  return (
    <Form method="post">
      <button
        name="myAsset"
        value={myAsset ? "false" : "true"}
        aria-label={myAsset ? "Remove from Tradeable" : "Add to Tradeable"}
        className="text-center p-2 border-0"
      >
        {myAsset ? <FaStar /> : <FaRegStar />}
      </button>
    </Form>
  );
}
