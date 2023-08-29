"use client";
import { FaDownload } from "react-icons/fa";
// import { PayslipTableProp, StaffDetails } from "@/app/interface/Staff";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
// import { setCurrentProfile } from "@/app/redux/slices/profile.slice";
import moment from "moment";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { TableOptionsDropdown } from "../Dropdowns/AllDropdowns";

interface TableRowItem {
  id: number;
  year: number;
  userGain: number;
  userLost: number;
}

interface TableProp {
  title?: string;
  tableRow?: TableRowItem[];
}

/* 
Upload History Table
*/
export const UploadHistoryTable = ({ title, tableRow }: TableProp) => {
  //   const router = useRouter();
  const isEmptyData = tableRow?.length === 0;
  //   const dispatch = useDispatch();
  //   const handleClick = () => {

  return (
    <>
      <div className="mx-1 pt-2 relative flex flex-col min-w-0 break-words bg-white mb-6 shadow-xl rounded-lg mt-4">
        <div className="w-[100%] flex flex-row justify-between items-center font-bold text-left text-xl">
          <h3 className="ml-4 mt-4 mb-2 text-xl font-semibold leading-normal text-gray-700">
            {title}
          </h3>
        </div>
        <table className="divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                S/N
              </th>
              <th className="w-full px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                File
              </th>
              {/* <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Upload Date
              </th> */}
              <th className="py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {!isEmptyData ? (
              tableRow?.map((item: any, index: any) => (
                <tr
                  key={index}
                  className={`hover:bg-gray-200 transition-all duration-200 ease-in cursor-pointer ${
                    index % 2 ? "bg-gray-100" : null
                  }`}
                >
                  <td className="px-6 py-2 whitespace-no-wrap">
                    <div className="text-sm leading-5 font-medium text-gray-900">
                      {index + 1}
                    </div>
                  </td>
                  <td className="px-6 py-2 whitespace-no-wrap">
                    <div className="text-sm leading-5 text-gray-500">
                      <a href={item.path} target="_blank">
                        {moment(item.date).format("MMMM YYYY")} Payroll{" "}
                      </a>
                    </div>
                  </td>
                  {/* <td
                    className="px-6 py-2 whitespace-no-wrap"
                  >
                    <div className="text-sm leading-5 text-gray-500"> {moment(item.date).format('MMMM YYYY')}</div>
                  </td> */}

                  <td className="whitespace-no-wrap p-4 text-black">
                    <a href={item.path} target="_blank">
                      <FaDownload />
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="bg-gray font-medium uppercase text-center text-gray-500 p-4"
                >
                  Data not found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

/* 
Tables for Dashboard Cards
*/
export const CardTable = ({ tableRow }: TableProp) => {
  //   const router = useRouter();
  const isEmptyData = tableRow?.length === 0;
  //   const dispatch = useDispatch();
  //   const handleClick = () => {

  return (
    <>
      <div className="w-[95%] mx-auto overflow-x-auto pt-2 relative flex flex-col min-w-0 break-words bg-white dark:bg-gray-900 mb-6 shadow-xl rounded-lg mt-4">
        <table className="divide-y divide-gray-200 dark:divide-gray-600">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-100 dark:bg-gray-600 text-left text-xs leading-4 font-medium dark:text-gray-100 text-gray-500 uppercase tracking-wider">
                S/N
              </th>
              <th className="px-6 py-3 bg-gray-100 dark:bg-gray-600 text-left text-xs leading-4 font-medium dark:text-gray-100 text-gray-500 uppercase tracking-wider">
                Column 1
              </th>
              <th className="px-6 py-3 bg-gray-100 dark:bg-gray-600 text-left text-xs leading-4 font-medium dark:text-gray-100 text-gray-500 uppercase tracking-wider">
                Column 2
              </th>
              <th className="px-6 py-3 bg-gray-100 dark:bg-gray-600 text-left text-xs leading-4 font-medium dark:text-gray-100 text-gray-500 uppercase tracking-wider">
                Column 3
              </th>
              <th className="py-3 bg-gray-100 dark:bg-gray-600 text-left text-xs leading-4 font-medium dark:text-gray-100 text-gray-500 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody>
            {!isEmptyData ? (
              tableRow?.map((item: any, index: any) => (
                <tr
                  key={index}
                  className={`hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 ease-in cursor-pointer ${
                    index % 2 ? "bg-gray-100 dark:bg-gray-800" : null
                  }`}
                >
                  <td className="px-6 py-2 whitespace-no-wrap">
                    <div className="text-sm leading-5 font-medium text-gray-900 dark:text-gray-100">
                      {index + 1}
                    </div>
                  </td>
                  <td className="px-6 py-2 whitespace-no-wrap">
                    <div className="text-sm leading-5 text-gray-500 dark:text-gray-100">
                      <a href={item.path} target="_blank">
                        {item.outletName}
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-2 whitespace-no-wrap">
                    <div className="text-sm leading-5 text-gray-500 dark:text-gray-100">
                      <a href={item.path} target="_blank">
                        {item.userGain}
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-2 whitespace-no-wrap">
                    <div className="text-sm leading-5 text-gray-500 dark:text-gray-100">
                      <a href={item.path} target="_blank">
                        {item.userLost}
                      </a>
                    </div>
                  </td>
                  <td className="whitespace-no-wrap p-4 text-black dark:text-white">
                    <TableOptionsDropdown />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="bg-gray font-medium uppercase text-center text-gray-500 p-4"
                >
                  Data not found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
