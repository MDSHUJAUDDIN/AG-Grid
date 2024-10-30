import { Entity } from "../../models/Entity";
export const createNewEntity = (overrides: Partial<Entity> = {}): Entity => {
    return {
      entityName: "",
      parentId: "",
      status: true,
      countryInc: "",
      entityType: "",
      federalID: 0,
      functionalCurrency: "",
      dateInc: "",
      primaryContact: "",
      ...overrides

    };
  };
  