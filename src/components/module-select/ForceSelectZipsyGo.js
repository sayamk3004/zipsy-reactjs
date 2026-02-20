import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedModule } from "redux/slices/utils";
import { useRouter } from "next/router";

const ForceSelectZipsyGo = ({ data }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const selectedModule = useSelector((state) => state.utilsData.selectedModule);

  useEffect(() => {
    const zipsyGoModule = data?.find(item => item.type === "zipsy_go");
    console.log(zipsyGoModule);
    if (zipsyGoModule && (!selectedModule || selectedModule.type !== "zipsy_go")) {
      localStorage.setItem("module", JSON.stringify(zipsyGoModule));
      dispatch(setSelectedModule(zipsyGoModule));
      router.push("/home");
    }
  }, [data, selectedModule, dispatch, router]);

  return null; // This component is just for setting the module
};

export default ForceSelectZipsyGo;