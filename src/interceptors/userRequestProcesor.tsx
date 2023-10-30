import { useQuery, useMutation } from 'react-query';


export const useRequestProcessor = () => {
    // const queryClient = useQueryClient();

    const query = (key: string | [], queryFunction: any, options: any = {}) => {
        return useQuery<any>({
            queryKey: key,
            queryFn: queryFunction,
            ...options,
        });
    }



    const mutate = (mutKey: string | [], mutationFunction: any, options: any = {}) => {
        return useMutation<any>({
            mutationKey: mutKey,
            mutationFn: mutationFunction,
            ...options,
        });
    }

    return { query, mutate };
}