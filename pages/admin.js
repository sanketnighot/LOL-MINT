import { useState } from "react";
import { useContract, useSigner } from "wagmi";
import { contract1Address, contract1ABI } from "../src/admin/contract1";
import { contract2Address, contract2ABI } from "../src/admin/contract2";

const Admin = () => {
  const { data: signer } = useSigner();
  const [loading, setLoading] = useState(false);

  const contract1 = useContract({
    addressOrName: contract1Address,
    contractInterface: contract1ABI,
    signerOrProvider: signer,
  });

  const contract2 = useContract({
    addressOrName: contract2Address,
    contractInterface: contract2ABI,
    signerOrProvider: signer,
  });

  const withdrawFromOne = async () => {
    setLoading(true);
    try {
      await (await contract1.withdrawAmount()).wait();
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const withdrawFromSec = async () => {
    setLoading(true);
    try {
      await (await contract2.withdraw()).wait();
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="mt-4 text-center text-xl text-green-500">
      <span>Admin</span>
      {loading ? (
        "LOADING.....1"
      ) : (
        <div
          onClick={withdrawFromOne}
          className="cursor-pointer bg-red-500 text-white p-4 border-2"
        >
          GET FUND FROM CONTRACT 1
        </div>
      )}

      {loading ? (
        "LOADING.....2"
      ) : (
        <div
          onClick={withdrawFromSec}
          className="mt-8 cursor-pointer bg-pink-500 text-white p-4 border-2"
        >
          GET FUND FROM CONTRACT 2
        </div>
      )}
    </div>
  );
};

export default Admin;
