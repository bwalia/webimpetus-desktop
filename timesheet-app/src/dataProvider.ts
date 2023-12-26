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

const getHeaders = () => {
    const userString = localStorage.getItem('user') || "";
    let token = "", businessId = "";
    if (userString) {
        const userObj = JSON.parse(userString);
        token = userObj.access_token;
        businessId = userObj.user.uuid_business_id;
    } else {
        Promise.reject("Something went wrong! Please login again");
    }
    
    return { user: {token: `Bearer ${token}`, authenticated: !!token }, businessId: businessId}
}

const isUUID = (str: string): boolean => {
    const uuidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    return uuidPattern.test(str);
}
const options = {}

export const dataProvider: DataProvider = {
    getList: async (resource: string, params: ListParams) => {
        try {
            const { user, businessId } = getHeaders();
            const { page, perPage } = params.pagination;
            const { field, order } = params.sort;
            
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
            
            return json
        } catch (error: any) {
            // localStorage.removeItem('user');
            if (error.status === 401) {
                localStorage.removeItem("user");
                window.location.reload();
            }
            return Promise.reject("Failed");
        }
    },

    getOne: async (resource: any, params: { id: any; }) => {
        try {
            const { user, businessId } = getHeaders(); 
            const url = `${apiUrl}/${resource}/${params.id}`
            const { json } = await httpClient(url, { ...options, user });
            return Promise.resolve(json);
        } catch (error) {
            return Promise.reject("Failed");
        }
    },

    getMany: async (resource: any, params: { ids: any; }) => {
        const { user, businessId } = getHeaders();
        const query = {
            filter: JSON.stringify({ ids: params.ids }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        const { json } = await httpClient(url, { ...options, user });
        return { data: json };
    },

    getManyReference: async (resource: any, params: GetManyReferenceParams) => {
        const { user, businessId } = getHeaders();
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
        const { user, businessId } = getHeaders();
        const { json } = await httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
            user
        })
        console.log({json});
        
        return { data: json.data };
    },

    update: async (resource: any, params: { id: any; data: any; }) => {
        const { user, businessId } = getHeaders();
        let url = `${apiUrl}/${resource}/${params.id}`;
        if (isUUID(resource)) {
            url = `${apiUrl}/business/${businessId}/projects/${resource}/tasks/update-status`
        }
        const { json } = await httpClient(url, {
            method: 'PUT',
            body: JSON.stringify(params.data),
            user
        })
        return { data: json };
    },

    updateMany: async (resource: any, params: { ids: any; data: any; }) => {
        const { user, businessId } = getHeaders();
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
        const { user, businessId } = getHeaders();
        const url = `${apiUrl}/${resource}/${params.id}`;
        const { json } = await httpClient(url, {
            method: 'DELETE',
            user
        });
        return { data: json };
    },

    deleteMany: async (resource: any, params: DeleteManyParams) => {
        const { user, businessId } = getHeaders();
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