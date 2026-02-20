import MainApi from "../../MainApi";
import { useQuery } from "react-query";
import { moduleList } from "../../ApiRoutes";
import { onErrorResponse } from "../../api-error-response/ErrorResponses";

const getModule = async () => {
  try {
    const { data } = await MainApi.get(moduleList);
    console.log('API Response:', data);
    return data;
  } catch (error) {
    console.error('Error during API call:', error);
    throw error;  // Re-throw to trigger the onError handler
  }
};

export default function useGetModule() {
  return useQuery("module-list", getModule, {
    enabled: true,
    onError: onErrorResponse,
  });
}
