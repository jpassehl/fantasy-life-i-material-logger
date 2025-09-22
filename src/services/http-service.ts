import apiCilent from "./api-cilent";

interface Entity {
  id: number;
}

//<T> is a generic type parameter here - its a placeholder for a type
class HttpService {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll<T>() {
    const controller = new AbortController();
    const request = apiCilent.get<T[]>(this.endpoint, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort };
  }

  delete(id: number) {
    return apiCilent.delete(this.endpoint + "/" + id);
  }
  create<T>(entity: T) {
    return apiCilent.post(this.endpoint, entity);
  }
  update<T extends Entity>(entity: T) {
    return apiCilent.patch(this.endpoint + "/" + entity.id, entity);
  }
}

const create = (endpoint: string) => new HttpService(endpoint);

export default create;
