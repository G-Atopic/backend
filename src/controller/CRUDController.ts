import { CRUDType } from '../types';
import { Request, Response, NextFunction } from 'express';
const CRUDConfig: CRUDType.ConfigItem[] = [
  {
    name: 'create',
    body: true,
    params: false,
    status: 201,
  },
  {
    name: 'read',
    body: true,
    params: true,
    status: 200,
  },
  {
    name: 'update',
    body: true,
    params: true,
    status: 200,
  },
  {
    name: 'delete',
    body: true,
    params: true,
    status: 200,
  },
];

const genericCRUDControllerMaker = (
  itemName: CRUDType.CRUDRequests,
  ItemService: CRUDType.ItemService,
) => {
  const route = CRUDConfig.findIndex((request) => request.name === itemName);

  const CRUD = CRUDConfig.map(
    (configItem) => async (req: Request, res: Response, next: NextFunction) => {
      try {
        const item = await ItemService[configItem.name](req.body);
        res.status(configItem.status).json(item);
      } catch (error) {
        next(error);
      }
    },
  );

  return CRUD[route];
};

export { genericCRUDControllerMaker };
