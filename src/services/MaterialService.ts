import create from "./http-service";

export interface Material {
  id?: number;
  name: string;
  type: string;
  gatherable: boolean;
  gatheredFrom: string[];
  lifeRequired: string;
  category: string;
}

export default create("/material");
