import create from "./http-service";

export interface MaterialFormWrapper {
  id?: number;
  name: string;
  crafted: boolean;
  gatheredFrom?: string;
  lifeRequired?: string;
  category: string;
}

export interface Material {
  id: number;
  name: string;
  crafted: boolean;
  gatheredFrom?: string[];
  lifeRequired?: string;
  category: string;
}

export default create("/material");
