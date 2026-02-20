import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedModule } from "redux/slices/utils";
import { useRouter } from "next/router";

const ForceSelectZipsyGo = ({ data }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const selectedModule = useSelector((state) => state.utilsData.selectedModule);

  useEffect(() => {
    const zipsyGoModule = data?.find(item => item.module_name === "Zipsy Go");
    if (zipsyGoModule && (!selectedModule || selectedModule.module_name !== "Zipsy Go")) {
      localStorage.setItem("module", JSON.stringify(zipsyGoModule));
      dispatch(setSelectedModule(zipsyGoModule));
      router.push("/home");
    }
  }, [data, selectedModule, dispatch, router]);

  return null; // This component is just for setting the module
};

export default ForceSelectZipsyGo;