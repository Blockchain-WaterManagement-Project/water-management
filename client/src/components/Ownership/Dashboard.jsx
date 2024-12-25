import { Link } from 'react-router-dom';

export const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Data Management Dashboard</h1>

      <nav>
        <ul>
          <li>
            <Link to="/asset/tokenize">Create Record</Link>
          </li>
          <li>
            <Link to="/asset/read">Read Records</Link>
          </li>
          <li>
            <Link to="/asset/update">Update Record</Link>
          </li>
          <li>
            <Link to="/asset/delete">Delete Record</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};