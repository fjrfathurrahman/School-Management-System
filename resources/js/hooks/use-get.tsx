import { IClass, IMajor } from '@/types/response';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface ResAcademic {
    classes: IClass[];
    majors: IMajor[];
}

function useGetAcademic() {
    return useQuery<ResAcademic>({
        queryKey: ['academic', 'classes', 'majors'],
        queryFn: async () => (await axios.get('/api/v1/academic')).data,
    });
}

export { useGetAcademic };
