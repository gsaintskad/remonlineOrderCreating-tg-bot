interface Status {
  id: number;
  name: string;
  color: string;
}

interface OrderType {
  id: number;
  name: string;
}

interface Warehouse {
  title: string;
  id: number;
  cellId: number;
  clientId: string; // Or potentially `number | null` if it can be a number or absent
}

interface AssetCustomFields {
  [key: string]: string; // For fields like f3369990, f3369991
}

interface Asset {
  id: number;
  uid: string;
  title: string;
  color: string;
  state: string;
  cost: number;
  group: string;
  brand: string;
  model: string;
  modification: string;
  year: string; // Or number if it's always a numeric year
  owner: string;
  warehouse: Warehouse;
  groupIcon: string;
  deletedAt: string | null; // Assuming it can be a date string or null
  customFields: AssetCustomFields;
}

interface Discount {
  goodsPct: number;
  materialsPct: number;
  saleServicesPct: number;
  orderServicesPct: number;
}

interface ClientCustomFields {
  [key: string]: string; // For fields like f5370833, f6729251, etc.
}

interface Client {
  id: number;
  isOrganization: boolean;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string[];
  address: string;
  discountCode: string;
  discount: Discount;
  customFields: ClientCustomFields;
}

interface RootCustomFields {
  [key: string]: string; // For fields like f5294177, f5294178
}

export interface ServiceOrder {
  id: number;
  idLabel: string;
  status: Status;
  statusOverdue: boolean;
  createdAt: string; // Date string, consider using `Date` type after parsing
  createdById: number;
  modifiedAt: string; // Date string
  doneAt: string; // Date string
  closedAt: string; // Date string
  closedById: number;
  branchId: number;
  orderType: OrderType;
  managerId: number;
  assigneeId: number;
  asset: Asset;
  client: Client;
  payer: null; // Or `any` or a specific Payer interface if its structure is known
  adCampaign: null; // Or `any` or a specific AdCampaign interface
  scheduledFor: string; // Date string
  scheduledTo: string; // Date string
  resource: null; // Or `any` or a specific Resource interface
  malfunction: string;
  managerNotes: string;
  engineerNotes: string;
  resume: string;
  estimatedPrice: string; // Or number if it's always numeric
  dueDate: string; // Date string
  overdue: boolean;
  price: number;
  discountSum: number;
  payed: string; // Or number if it's always numeric
  warrantyDate: string; // Date string, consider `Date` type
  urgent: boolean;
  customFields: RootCustomFields;
  isDeductionRequired: boolean;
}
