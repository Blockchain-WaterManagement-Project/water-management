function Transaction(){
    const Button = ({type}) =>{
        return <button className={"transaction-button"+type}>{type}</button>;
    }

    return(
        <div className="transaction">
            <h3 className="transaction-title">
                Latest Transactions
            </h3>
            <table className="transaction-table">
                <tr className="table-row">
                    <th className="table-header">
                        User #from
                    </th>
                    <th className="table-header">
                        User #to 
                    </th>
                    <th className="table-header">
                        Date
                    </th>
                    <th className="table-header">
                        Gas 
                    </th>
                    <th className="table-header">
                        Status
                    </th>
                </tr>
                <tr className="table-row">
                    <td className="table-data data-from">
                        0x00.....00
                    </td>
                    <td className="table-data data-to">
                        0x00.....01
                    </td>
                    <td className="table-data data-date">
                        2025-02-16
                    </td>
                    <td className="table-data data-gas">
                        $0.10000
                    </td>
                    <td className="table-data data-status">
                        <Button type={"Approved"} />
                    </td>
                </tr>
            </table>
        </div>
    )
}

export default Transaction;