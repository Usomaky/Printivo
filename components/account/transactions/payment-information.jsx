import React, { useEffect, useState } from "react";
import api from "@/services/api";
import { fetcher } from "@/utils/index";
import useSWR from "swr";
import FormDropDownMenu from "../../global/formDropDownMenu";
import Toastr from "toastr";

export default function PaymentInformation({ user }) {
  const [storeBanks, setStoreBanks] = useState(null);
  const [banks, setBanks] = useState([]);
  const [formdata, setFormData] = useState({
    bank_id: null,
    store_id: user?.store?.id,
    account_number: null,
    account_name: null,
  });

  const { data: banksData, error } = useSWR(`/banks.json?limit=100`, fetcher);

  useEffect(() => {
    getBankData();
  }, []);

  useEffect(() => {
    setBanks(banksData?.data);
  }, [banksData]);

  const storeId = user?.store?.id;

  const getBankData = async () => {
    try {
      const { data } = await api.get(`store-banks.json?store_id=${storeId}`);
      setStoreBanks(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSumbit = async (event) => {
    event.preventDefault();
    if (formdata.bank_id === null) {
      Toastr.warning("Select a bank");
      return false;
    }
    if (formdata.account_name === null) {
      Toastr.warning("Please an enter account name");
      return false;
    }
    if (formdata.account_number === null) {
      Toastr.warning("Please an enter account number");
      return false;
    }
    if (formdata.store_id === undefined) {
      Toastr.warning("Please an create a store before contiuning.");
      return false;
    }

    try {
      const { data } = await api.post("store-banks.json", formdata);
      if (data) {
        Toastr.success("Added Succesfully!");
        getBankData();
      }
    } catch (error) {
      console.log(error);
      if (error?.data?.message) {
        Toastr.error(error?.data?.message);
      }
    }
  };

  const deleteBank = async (id) => {
    if (confirm("Are you sure you want to delete bank !")) {
      try {
        const { data } = await api.delete(`store-banks/${id}.json`);
        if (data) {
          Toastr.success("Succesfully Deleted!");
          getBankData();
        }
      } catch (error) {
        console.log(error);
        if (error?.data?.message) {
          Toastr.error(error?.data?.message);
        }
      }
    } else {
      Toastr.info("Bank details was not deleted");
    }
  };

  return (
    <>
      <section className="w-full h-auto pb-12 ">
        <div className="c-store--owner__form  content-container">
          <form className="mx-auto py-14 px-8" onSubmit={handleSumbit}>
            <div className="form-inner mx-auto">
              <label htmlFor="storeName">Bank Name</label>
              {/* <input
                type="text"
                name="bank-name"
                required
                placeholder="Select a bank"
              /> */}
              <FormDropDownMenu
                placeholder={"Select a bank"}
                options={banks}
                value={(e) => setFormData({ ...formdata, bank_id: e.id })}
              />
              <label htmlFor="storeName">Account Name</label>
              <input
                type="text"
                name="account-name"
                required
                placeholder="Enter the name of the account"
                onChange={(e) =>
                  setFormData({ ...formdata, account_name: e.target.value })
                }
              />
              <label htmlFor="storeName">Account Number</label>
              <input
                type="text"
                name="account-number"
                required
                placeholder="Enter the account number"
                onChange={(e) =>
                  setFormData({ ...formdata, account_number: e.target.value })
                }
              />

              <button
                type="submit"
                className="block ml-auto bg-red-light font-sf px-6 py-3 rounded-sm text-white"
              >
                Add
              </button>
            </div>
          </form>
        </div>

        <div className="flex flex-col mt-5">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className=" overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 py-5">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-6 text-left text-xs font-medium text-blue-md uppercase tracking-wider"
                      >
                        Bank Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-6 text-left text-xs font-medium text-blue-md uppercase tracking-wider"
                      >
                        Account Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-6 text-left text-xs font-medium text-blue-md uppercase tracking-wider"
                      >
                        Account Number
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-6 text-left text-xs font-medium text-blue-md uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-6 text-left text-xs font-medium text-blue-md uppercase tracking-wider"
                      >
                        Date Added
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Action</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {storeBanks?.map((item) => (
                      <tr className="border-b hover:bg-gray-100 cursor-pointer">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-blue-md">
                            {item.bank_name}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-blue-md">
                            {item.account_name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-blue-md">
                            {item.account_number}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-md">
                          {item.active ? (
                            <span className="px-3  inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Active
                            </span>
                          ) : (
                            <span className="px-3  inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                              In-Active
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                          <div className="text-sm text-blue-md">
                            Nov 12, 2020, 10:00am, WAT
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            className=" bg-gray-200 font-sf p-3 rounded-sm text-blue-md"
                            onClick={() => deleteBank(item.id)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
