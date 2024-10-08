import React from "react";
import { Outlet, Link } from "react-router-dom";

export async function loader(){
  // const assets = await getAssets();
  // return { assets };
}

export default function Root() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <h5>Water Quality Management</h5>
          <form>
            <input type="search" placeholder="search" name="search" />
            <button type="submit">Search</button>
          </form>
          <div>
            <ul>
              <li>
                <Link to={`/asset/1`}>Add Asset</Link>
              </li>
              <li>
                <Link to={`/asset/1`}>Trade Asset</Link>
              </li>
              <li>
                <Link to={`/asset/1`}>Find Asset</Link>
              </li>
              <li>
                <Link to={`/asset/1`}>Remove Asset</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
