type CRUDRequests = 'create' | 'read' | 'update' | 'delete';

type ConfigItem = {
  name: CRUDRequests;
  body: boolean;
  params: boolean;
  status: 200 | 201;
};
type ItemService = { [key in CRUDRequests]: (body: unknown) => unknown };
export { CRUDRequests, ConfigItem, ItemService };
