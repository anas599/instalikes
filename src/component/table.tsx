interface TableProps {
  text: string;
  details: string;
}

const Table: React.FC<TableProps> = ({ text, details }) => {
  return (
    <div className="relative overflow-x-auto rounded-full">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <tbody>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
            <th
              scope="row"
              className="mx-6 my-4 font-medium text-center text-gray-900 whitespace-nowrap dark:text-white"
              style={{ width: "50%" }}
            >
              {text}
            </th>
            <td className="px-4 py-2 text-center" style={{ width: "50%" }}>
              {details}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
