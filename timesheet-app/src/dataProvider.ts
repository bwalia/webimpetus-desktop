import { fetchUtils, DataProvider } from 'react-admin';
import { stringify } from 'query-string';

const apiUrl = import.meta.env.VITE_LOCAL_API_URL;
const httpClient = fetchUtils.fetchJson;

type Identifier = string | number;
interface PaginationPayload {
    page: number;
    perPage: number;
}
interface SortPayload {
    field: string;
    order: 'ASC' | 'DESC';
}

interface ListParams {
    pagination: PaginationPayload;
    sort: SortPayload;
    filter: any;
    meta?: any;
}

interface GetManyReferenceParams {
    target: string;
    id: Identifier;
    pagination: PaginationPayload;
    sort: SortPayload;
    filter: any;
    meta?: any;
}

interface RaRecord<IdentifierType extends Identifier = Identifier>
    extends Record<string, any> {
    id: IdentifierType;
}

interface DeleteManyParams<RecordType extends RaRecord = any> {
    ids: RecordType['id'][];
    meta?: any;
}
const userString = localStorage.getItem('user') || "";
let token = "", businessId = "";
if (userString) {
    const userObj = JSON.parse(userString);
    token = userObj.access_token;
    businessId = userObj.user.uuid_business_id;
} else {
    Promise.reject("Something went wrong! Please login again");
}

const user = { token: `Bearer ${token}`, authenticated: !!token }
const options = {}

export const dataProvider: DataProvider = {
    getList: async (resource: string, params: ListParams) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        console.log({params});
        
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([page * perPage, (page - 1) * perPage]),
            filter: JSON.stringify(params.filter),
        };
        let url = `${apiUrl}/${resource}?${stringify(query)}`;
        if (resource === "projects") {
            url = `${apiUrl}/business/${businessId}/${resource}?${stringify(query)}`;
        } else if (resource === "tasks") {
            const { projectId } = params.meta
            url = `${apiUrl}/business/${businessId}/projects/${projectId}/${resource}?${stringify(query)}`;
        }
        const { json, headers } = await httpClient(url, { ...options, user });
        const contentRange = headers.get('content-range')?.split('/').pop() || "0";
        console.log({ json });

        return json
    },

    getOne: async (resource: any, params: { id: any; }) => {
        try {            
            const url = `${apiUrl}/${resource}/${params.id}`
            const { json } = await httpClient(url, { ...options, user });
            return Promise.resolve(json);
        } catch (error) {
            return Promise.reject("Failed");
        }
    },

    getMany: async (resource: any, params: { ids: any; }) => {
        const query = {
            filter: JSON.stringify({ ids: params.ids }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        const { json } = await httpClient(url, { ...options, user });
        return { data: json };
    },

    getManyReference: async (resource: any, params: GetManyReferenceParams) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        const { json, headers } = await httpClient(url, { ...options, user });
        const contentRange = headers.get('content-range')?.split('/').pop() || "0";
        return {
            data: json,
            total: parseInt(contentRange, 10),
        };
    },

    create: async (resource: any, params: { data: any; }) => {
        const { json } = await httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
            user
        })
        return { data: json };
    },

    update: async (resource: any, params: { id: any; data: any; }) => {
        const url = `${apiUrl}/${resource}/${params.id}`;
        const { json } = await httpClient(url, {
            method: 'PUT',
            body: JSON.stringify(params.data),
            user
        })
        return { data: json };
    },

    updateMany: async (resource: any, params: { ids: any; data: any; }) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        const { json } = await httpClient(url, {
            method: 'PUT',
            body: JSON.stringify(params.data),
            user
        })
        return { data: json };
    },

    delete: async (resource: any, params: { id: any; }) => {
        const url = `${apiUrl}/${resource}/${params.id}`;
        const { json } = await httpClient(url, {
            method: 'DELETE',
            user
        });
        return { data: json };
    },

    deleteMany: async (resource: any, params: DeleteManyParams) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        const { json } = await httpClient(url, {
            method: 'DELETE',
            body: JSON.stringify({ ids: params.ids }),
            user
        });
        return { data: json };
    },
};
export default dataProvider;