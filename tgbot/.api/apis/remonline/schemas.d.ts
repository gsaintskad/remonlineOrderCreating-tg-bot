declare const AddGoodsAndServices: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly estimate_id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Estimate ID";
                };
            };
            readonly required: readonly ["estimate_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const Authentication: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly api_key: {
                readonly type: "string";
                readonly description: "Your API Key";
                readonly default: "69bcf53f2cb54c878573c535174fa93b";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly token: {
                    readonly type: "string";
                    readonly examples: readonly ["e227e0639227a9884e2cce7be7f356518971b876"];
                };
                readonly success: {
                    readonly type: "boolean";
                    readonly default: true;
                    readonly examples: readonly [true];
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "401": {
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "integer";
                    readonly default: 0;
                    readonly examples: readonly [111];
                };
                readonly success: {
                    readonly type: "boolean";
                    readonly default: true;
                    readonly examples: readonly [false];
                };
                readonly message: {
                    readonly type: "string";
                    readonly examples: readonly ["Unable to log you in. Check your api_key and try again."];
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const ChangeLeadStatus: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["lead_id", "status_id"];
        readonly properties: {
            readonly lead_id: {
                readonly type: "integer";
                readonly description: "Lead ID";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly status_id: {
                readonly type: "integer";
                readonly description: "Status ID";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const ChangeOrderStatus: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["order_id", "status_id"];
        readonly properties: {
            readonly order_id: {
                readonly type: "integer";
                readonly description: "Order ID";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly status_id: {
                readonly type: "integer";
                readonly description: "Status ID";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const CloseTask: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly task_id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Task ID";
                };
            };
            readonly required: readonly ["task_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const CommentOnTask: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["message"];
        readonly properties: {
            readonly is_private: {
                readonly type: "boolean";
                readonly description: "Is comment private?";
            };
            readonly message: {
                readonly type: "string";
                readonly description: "Comment text";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly task_id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Task ID";
                };
            };
            readonly required: readonly ["task_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const CreateAsset: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["uid"];
        readonly properties: {
            readonly uid: {
                readonly type: "string";
                readonly description: "Serial number of asset (VIN, IMEI)";
            };
            readonly reg_number: {
                readonly type: "string";
                readonly description: "Vehicle plate number";
            };
            readonly group: {
                readonly type: "string";
                readonly description: "Group of Asset";
            };
            readonly brand: {
                readonly type: "string";
                readonly description: "Brand of Asset";
            };
            readonly model: {
                readonly type: "string";
                readonly description: "Model of Asset";
            };
            readonly modification: {
                readonly type: "string";
                readonly description: "Modification of Asset";
            };
            readonly color: {
                readonly type: "string";
                readonly description: "Color of Asset";
            };
            readonly state: {
                readonly type: "string";
                readonly description: "Condition of Asset";
            };
            readonly cost: {
                readonly type: "string";
                readonly description: "Cost of Asset";
            };
            readonly year: {
                readonly type: "string";
                readonly description: "Year of Asset";
            };
            readonly owner_id: {
                readonly type: "integer";
                readonly description: "ID of Asset owner if asset owned by client";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly warehouse_id: {
                readonly type: "integer";
                readonly description: "Warehouse ID if asset owned by our company";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly custom_fields: {
                readonly type: "string";
                readonly description: "Custom fields {\"id\":\"value\"}";
                readonly format: "json";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly token: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "auth token";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const CreateClient: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly first_name: {
                readonly type: "string";
                readonly description: "Client first name";
            };
            readonly last_name: {
                readonly type: "string";
                readonly description: "Client last name";
            };
            readonly phone: {
                readonly type: "array";
                readonly description: "List of client phone numbers";
                readonly items: {
                    readonly type: "string";
                };
            };
            readonly email: {
                readonly type: "string";
                readonly description: "Client email";
            };
            readonly address: {
                readonly type: "string";
                readonly description: "Client address";
            };
            readonly notes: {
                readonly type: "string";
                readonly description: "Client notes";
            };
            readonly supplier: {
                readonly type: "boolean";
                readonly description: "Is client is a supplier";
            };
            readonly juridical: {
                readonly type: "boolean";
                readonly description: "Is client is a company";
            };
            readonly discount_code: {
                readonly type: "string";
                readonly description: "Client's discount card";
            };
            readonly discount_materials: {
                readonly type: "number";
                readonly description: "Client's materials discounts";
                readonly format: "float";
                readonly minimum: -3.402823669209385e+38;
                readonly maximum: 3.402823669209385e+38;
            };
            readonly discount_goods: {
                readonly type: "number";
                readonly description: "Client's product discount";
                readonly format: "float";
                readonly minimum: -3.402823669209385e+38;
                readonly maximum: 3.402823669209385e+38;
            };
            readonly discount_services: {
                readonly type: "number";
                readonly description: "Client's service discounts";
                readonly format: "float";
                readonly minimum: -3.402823669209385e+38;
                readonly maximum: 3.402823669209385e+38;
            };
            readonly ad_campaign_id: {
                readonly type: "integer";
                readonly description: "Ad Campaign ID";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly custom_fields: {
                readonly type: "string";
                readonly description: "Custom fields object";
                readonly format: "json";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly token: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [12345];
                            };
                        };
                    };
                };
                readonly success: {
                    readonly type: "boolean";
                    readonly default: true;
                    readonly examples: readonly [true];
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const CreateCommentOnClient: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["message"];
        readonly properties: {
            readonly is_private: {
                readonly type: "boolean";
                readonly description: "Is comment private?";
            };
            readonly message: {
                readonly type: "string";
                readonly description: "Comment text";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly client_id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Client ID";
                };
            };
            readonly required: readonly ["client_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const CreateCommentOnLead: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["message"];
        readonly properties: {
            readonly is_private: {
                readonly type: "boolean";
                readonly description: "Is comment private?";
            };
            readonly message: {
                readonly type: "string";
                readonly description: "Comment text";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly lead_id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Lead ID";
                };
            };
            readonly required: readonly ["lead_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const CreateCommentOnOrder: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["message"];
        readonly properties: {
            readonly is_private: {
                readonly type: "boolean";
                readonly description: "Is comment private?";
            };
            readonly message: {
                readonly type: "string";
                readonly description: "Comment text";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly order_id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Order ID";
                };
            };
            readonly required: readonly ["order_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const CreateLead: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["leadtype_id"];
        readonly properties: {
            readonly client_id: {
                readonly type: "integer";
                readonly description: "Client ID";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly contact_phone: {
                readonly type: "string";
                readonly description: "Lead contact number must be set with contact_name if client_id is absent";
            };
            readonly contact_name: {
                readonly type: "string";
                readonly description: "Lead contact name";
            };
            readonly leadtype_id: {
                readonly type: "integer";
                readonly description: "Lead type ID";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly is_juridical: {
                readonly type: "boolean";
                readonly description: "Does a lead contact is a legal entity";
            };
            readonly branch_id: {
                readonly type: "integer";
                readonly description: "Location ID";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly manager_id: {
                readonly type: "integer";
                readonly description: "Responsible manager ID";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly description: {
                readonly type: "string";
                readonly description: "Lead description";
            };
            readonly ad_campaign_id: {
                readonly type: "integer";
                readonly description: "Advertising campaign ID";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly is_urgent: {
                readonly type: "boolean";
                readonly description: "Is this Lead is urgent?";
            };
            readonly custom_fields: {
                readonly type: "string";
                readonly description: "pairs id: value";
                readonly format: "json";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly token: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [75];
                        };
                    };
                };
                readonly success: {
                    readonly type: "boolean";
                    readonly default: true;
                    readonly examples: readonly [true];
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const CreateOrder: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["branch_id", "order_type", "client_id"];
        readonly properties: {
            readonly branch_id: {
                readonly type: "integer";
                readonly description: "Location ID";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly order_type: {
                readonly type: "integer";
                readonly description: "Order type ID";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly client_id: {
                readonly type: "integer";
                readonly description: "Client ID";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly asset_id: {
                readonly type: "integer";
                readonly description: "Asset ID";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly packagelist: {
                readonly type: "string";
                readonly description: "Package list";
            };
            readonly appearance: {
                readonly type: "string";
                readonly description: "Appearance";
            };
            readonly malfunction: {
                readonly type: "string";
                readonly description: "Malfunctions";
            };
            readonly urgent: {
                readonly type: "boolean";
                readonly description: "Is order urgent";
            };
            readonly estimated_cost: {
                readonly type: "number";
                readonly description: "Estimated cost";
                readonly format: "float";
                readonly minimum: -3.402823669209385e+38;
                readonly maximum: 3.402823669209385e+38;
            };
            readonly assigned_at: {
                readonly type: "integer";
                readonly description: "Master call time";
                readonly format: "int64";
                readonly minimum: -9223372036854776000;
                readonly maximum: 9223372036854776000;
            };
            readonly estimated_done_at: {
                readonly type: "integer";
                readonly description: "Estimated fulfillment date and time";
                readonly format: "int64";
                readonly minimum: -9223372036854776000;
                readonly maximum: 9223372036854776000;
            };
            readonly manager: {
                readonly type: "integer";
                readonly description: "Responsible manager ID";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly engineer: {
                readonly type: "integer";
                readonly description: "Responsible specialist ID";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly manager_notes: {
                readonly type: "string";
                readonly description: "Manager's notes";
            };
            readonly warranty_date: {
                readonly type: "integer";
                readonly description: "Warranty end date";
                readonly format: "int64";
                readonly minimum: -9223372036854776000;
                readonly maximum: 9223372036854776000;
            };
            readonly custom_fields: {
                readonly type: "string";
                readonly description: "pairs of id : value";
                readonly format: "json";
            };
            readonly ad_campaign_id: {
                readonly type: "integer";
                readonly description: "ID of Ad campaign";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [12345];
                            };
                        };
                    };
                };
                readonly success: {
                    readonly type: "boolean";
                    readonly default: true;
                    readonly examples: readonly [true];
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const CreatePayment: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["payment", "direction"];
        readonly properties: {
            readonly payment: {
                readonly type: "number";
                readonly description: "Payment amount";
                readonly format: "float";
                readonly minimum: -3.402823669209385e+38;
                readonly maximum: 3.402823669209385e+38;
            };
            readonly direction: {
                readonly type: "integer";
                readonly description: "0 Income; 1 Expense";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly cashflowitem_id: {
                readonly type: "integer";
                readonly description: "Required if Cashflow Items is active";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly client_id: {
                readonly type: "integer";
                readonly description: "Client ID";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly employee_id: {
                readonly type: "integer";
                readonly description: "Cashier ID (using owner's api key if not set)";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly created_at: {
                readonly type: "string";
                readonly description: "Payment's data-time (use current time if not set)";
                readonly format: "date-time";
            };
            readonly description: {
                readonly type: "string";
                readonly description: "Payment's description";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly cashbox_id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Cashbox ID";
                };
            };
            readonly required: readonly ["cashbox_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const CreatePosting: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["branch_id", "warehouse_id", "supplier_id", "products", "cashflow"];
        readonly properties: {
            readonly branch_id: {
                readonly type: "integer";
                readonly description: "Location ID";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly warehouse_id: {
                readonly type: "integer";
                readonly description: "Warehouse ID";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly supplier_id: {
                readonly type: "integer";
                readonly description: "Supplier ID";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly description: {
                readonly type: "string";
                readonly description: "Description for the document";
            };
            readonly document_number: {
                readonly type: "string";
                readonly description: "Related invoice number";
            };
            readonly document_datetime: {
                readonly type: "string";
                readonly description: "Invoice date";
            };
            readonly products: {
                readonly type: "array";
                readonly items: {
                    readonly properties: {
                        readonly sn_accounting: {
                            readonly type: "boolean";
                            readonly description: "product with serial accounting?";
                            readonly default: false;
                        };
                        readonly quantity: {
                            readonly type: "number";
                            readonly format: "float";
                            readonly minimum: -3.402823669209385e+38;
                            readonly maximum: 3.402823669209385e+38;
                        };
                        readonly "sernums[]": {
                            readonly type: "array";
                            readonly description: "if serial product - up to 20 numbers";
                            readonly default: readonly [];
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                        readonly warranty: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly warranty_period: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly cell_id: {
                            readonly type: "integer";
                            readonly description: "necessary when bin/cell addressing used";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly cost: {
                            readonly type: "number";
                            readonly format: "float";
                            readonly minimum: -3.402823669209385e+38;
                            readonly maximum: 3.402823669209385e+38;
                        };
                        readonly entity_id: {
                            readonly type: "integer";
                            readonly description: "internal product id";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                    };
                    readonly required: readonly ["quantity", "entity_id"];
                    readonly type: "object";
                };
            };
            readonly cashflow: {
                readonly type: "object";
                readonly properties: {
                    readonly payment: {
                        readonly type: "number";
                        readonly description: "total sum of posting payment (only negative value)";
                        readonly default: -1;
                        readonly format: "float";
                        readonly minimum: -3.402823669209385e+38;
                        readonly maximum: 3.402823669209385e+38;
                    };
                    readonly cashbox: {
                        readonly type: "integer";
                        readonly description: "cachbox id";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly description: {
                        readonly type: "string";
                    };
                    readonly employee: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                };
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [3809076];
                        };
                        readonly id_label: {
                            readonly type: "string";
                            readonly examples: readonly ["F00312"];
                        };
                    };
                };
                readonly success: {
                    readonly type: "boolean";
                    readonly default: true;
                    readonly examples: readonly [true];
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const CreateProduct: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["category_id", "title"];
        readonly properties: {
            readonly category_id: {
                readonly type: "integer";
                readonly description: "Product category ID";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly title: {
                readonly type: "string";
                readonly description: "Product title";
            };
            readonly description: {
                readonly type: "string";
                readonly description: "Product description";
            };
            readonly code: {
                readonly type: "integer";
                readonly description: "Product code";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly article: {
                readonly type: "string";
                readonly description: "Product article";
            };
            readonly uom_id: {
                readonly type: "integer";
                readonly description: "Product uom ID";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly warranty: {
                readonly type: "boolean";
                readonly description: "If Product has warranty";
            };
            readonly warranty_period: {
                readonly type: "string";
                readonly description: "Product warranty period";
            };
            readonly barcodes: {
                readonly type: "array";
                readonly description: "Product barcodes";
                readonly items: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
            };
            readonly prices: {
                readonly type: "string";
                readonly description: "Product prices {\"id1\": 111.01, \"id2\":444}";
                readonly format: "json";
            };
            readonly is_serial: {
                readonly type: "boolean";
                readonly description: "If Product is serial";
            };
            readonly custom_fields: {
                readonly type: "string";
                readonly description: "Custom fields";
                readonly format: "json";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly token: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const CreateService: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["category_id", "title"];
        readonly properties: {
            readonly category_id: {
                readonly type: "integer";
                readonly description: "Service category ID";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly title: {
                readonly type: "string";
                readonly description: "Service title";
            };
            readonly is_labor: {
                readonly type: "boolean";
                readonly description: "If Service is Labor";
            };
            readonly uom_id: {
                readonly type: "integer";
                readonly description: "Service uom ID";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly cost: {
                readonly type: "number";
                readonly description: "Service cost";
                readonly format: "float";
                readonly minimum: -3.402823669209385e+38;
                readonly maximum: 3.402823669209385e+38;
            };
            readonly warranty: {
                readonly type: "boolean";
                readonly description: "If Service has warranty";
            };
            readonly warranty_period: {
                readonly type: "string";
                readonly description: "Service warranty period";
            };
            readonly barcodes: {
                readonly type: "array";
                readonly description: "Service barcodes";
                readonly items: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
            };
            readonly prices: {
                readonly type: "array";
                readonly description: "Product prices";
                readonly items: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const CreateTasks: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["title", "deadline", "assignees"];
        readonly properties: {
            readonly title: {
                readonly type: "string";
                readonly description: "Title";
            };
            readonly description: {
                readonly type: "string";
                readonly description: "Description";
            };
            readonly deadline: {
                readonly type: "string";
                readonly description: "Task Due Date";
                readonly format: "date-time";
            };
            readonly assignees: {
                readonly type: "array";
                readonly description: "Array of Employee IDs";
                readonly items: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
            };
            readonly rel_obj: {
                readonly type: "object";
                readonly description: "Related Object";
                readonly properties: {
                    readonly id: {
                        readonly type: "integer";
                        readonly description: "Object ID";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly type: {
                        readonly type: "integer";
                        readonly description: "Object Type (2=Order, 3=Lead, 4=Client, 6=Task, 9=Invoice)";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                };
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const CreateTransfer: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["source_warehouse_id", "target_warehouse_id"];
        readonly properties: {
            readonly description: {
                readonly type: "string";
            };
            readonly source_warehouse_id: {
                readonly type: "integer";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly target_warehouse_id: {
                readonly type: "integer";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly entities: {
                readonly properties: {
                    readonly "": {
                        readonly type: "array";
                        readonly items: {
                            readonly properties: {
                                readonly sn_accounting: {
                                    readonly type: "boolean";
                                    readonly default: false;
                                };
                                readonly cell_id: {
                                    readonly type: "integer";
                                    readonly format: "int32";
                                    readonly minimum: -2147483648;
                                    readonly maximum: 2147483647;
                                };
                                readonly entity: {
                                    readonly type: "integer";
                                    readonly format: "int32";
                                    readonly minimum: -2147483648;
                                    readonly maximum: 2147483647;
                                };
                            };
                            readonly type: "object";
                        };
                    };
                };
                readonly required: readonly [""];
                readonly type: "object";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                    readonly default: 0;
                    readonly examples: readonly [837186];
                };
                readonly success: {
                    readonly type: "boolean";
                    readonly default: true;
                    readonly examples: readonly [true];
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const CreateWriteOff: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["warehouse"];
        readonly properties: {
            readonly warehouse: {
                readonly type: "integer";
                readonly description: "warehouse ID";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly description: {
                readonly type: "string";
            };
            readonly entities: {
                readonly properties: {
                    readonly "": {
                        readonly type: "array";
                        readonly items: {
                            readonly properties: {
                                readonly entity: {
                                    readonly type: "integer";
                                    readonly format: "int32";
                                    readonly minimum: -2147483648;
                                    readonly maximum: 2147483647;
                                };
                                readonly sn_accounting: {
                                    readonly type: "boolean";
                                    readonly default: false;
                                };
                            };
                            readonly type: "object";
                        };
                    };
                };
                readonly required: readonly [""];
                readonly type: "object";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                    readonly default: 0;
                    readonly examples: readonly [4627872];
                };
                readonly success: {
                    readonly type: "boolean";
                    readonly default: true;
                    readonly examples: readonly [true];
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetAdCampaigns: {
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [32776];
                            };
                            readonly name: {
                                readonly type: "string";
                                readonly examples: readonly ["Листовка"];
                            };
                            readonly branch_ids: {
                                readonly type: "array";
                                readonly items: {};
                            };
                            readonly start_at: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [1596229200000];
                            };
                            readonly finish_at: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [1598907599000];
                            };
                        };
                    };
                };
                readonly count: {
                    readonly type: "integer";
                    readonly default: 0;
                    readonly examples: readonly [3];
                };
                readonly success: {
                    readonly type: "boolean";
                    readonly default: true;
                    readonly examples: readonly [true];
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetAssetById: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly asset_id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Asset ID";
                };
            };
            readonly required: readonly ["asset_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetAssetCustomFields: {
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetAssets: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "ids[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Assets id";
                };
                readonly "uid[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Serial numbers of assets (VIN, IMEI)";
                };
                readonly "warehouse_id[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Warehouses ID";
                };
                readonly "owner_id[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Assets owners ID";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetBundleEntities: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly bundle_id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Bundle ID";
                };
            };
            readonly required: readonly ["bundle_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [33901];
                            };
                            readonly title: {
                                readonly type: "string";
                                readonly examples: readonly ["Сканер"];
                            };
                            readonly entity_id: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [42740720];
                            };
                            readonly discount: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly sum: {
                                        readonly type: "integer";
                                        readonly default: 0;
                                        readonly examples: readonly [0];
                                    };
                                    readonly pst: {
                                        readonly type: "integer";
                                        readonly default: 0;
                                        readonly examples: readonly [0];
                                    };
                                };
                            };
                            readonly warranty: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly warranty: {
                                        readonly type: "integer";
                                        readonly default: 0;
                                        readonly examples: readonly [0];
                                    };
                                    readonly warranty_period: {
                                        readonly type: "integer";
                                        readonly default: 0;
                                        readonly examples: readonly [0];
                                    };
                                };
                            };
                            readonly price_id: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [7955];
                            };
                        };
                    };
                };
                readonly page: {
                    readonly type: "integer";
                    readonly default: 0;
                    readonly examples: readonly [1];
                };
                readonly count: {
                    readonly type: "integer";
                    readonly default: 0;
                    readonly examples: readonly [2];
                };
                readonly success: {
                    readonly type: "boolean";
                    readonly default: true;
                    readonly examples: readonly [true];
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetBundles: {
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [43];
                            };
                            readonly title: {
                                readonly type: "string";
                                readonly examples: readonly ["Сканер"];
                            };
                            readonly description: {
                                readonly type: "string";
                                readonly examples: readonly ["Сканер1"];
                            };
                            readonly price: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [70];
                            };
                        };
                    };
                };
                readonly page: {
                    readonly type: "integer";
                    readonly default: 0;
                    readonly examples: readonly [1];
                };
                readonly count: {
                    readonly type: "integer";
                    readonly default: 0;
                    readonly examples: readonly [12];
                };
                readonly success: {
                    readonly type: "boolean";
                    readonly default: true;
                    readonly examples: readonly [true];
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetCashboxTransactions: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly cashbox_id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Cashbox ID";
                };
            };
            readonly required: readonly ["cashbox_id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly sort_dir: {
                    readonly type: "string";
                    readonly enum: readonly ["asc", "desc"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                };
                readonly "created_at[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int64";
                        readonly minimum: -9223372036854776000;
                        readonly maximum: 9223372036854776000;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Creation date filter. Single or two values with a timestamp. These are from and to parameters. Example: [0, 1454277600000], [1454277500000]";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetCashboxes: {
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetCashflowItems: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly token: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                };
            };
            readonly required: readonly ["token"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetCashflowitems: {
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetClientCustomFields: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly juridical: {
                    readonly type: "boolean";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If true, the method returns custom fields for a company";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [6326298];
                            };
                            readonly name: {
                                readonly type: "string";
                                readonly examples: readonly ["Number test"];
                            };
                            readonly type: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [6];
                            };
                        };
                    };
                };
                readonly count: {
                    readonly type: "integer";
                    readonly default: 0;
                    readonly examples: readonly [4];
                };
                readonly success: {
                    readonly type: "boolean";
                    readonly default: true;
                    readonly examples: readonly [true];
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetClients: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly page: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly default: 1;
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Page number";
                };
                readonly "ids[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "List of client IDs.";
                };
                readonly "names[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "List of client names";
                };
                readonly "phones[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "List of client phone numbers";
                };
                readonly "emails[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "List of client emails";
                };
                readonly "created_at[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int64";
                        readonly minimum: -9223372036854776000;
                        readonly maximum: 9223372036854776000;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by date of creation of leads. An array of one or two values that contain a timestamp. If the array consists of one value, then it is the left border. Examples: [0, 1454277600000], [1454277500000].";
                };
                readonly "discount_codes[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "List of discount cards";
                };
                readonly "modified_at[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int64";
                        readonly minimum: -9223372036854776000;
                        readonly maximum: 9223372036854776000;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by date of client modification. Single or two values with a timestamp. These are from and to parameters. Example: [1454277600000, 1456783200000], [1454277500000]";
                };
                readonly "marketing_sources[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The list of ad campaign IDs";
                };
                readonly juridical: {
                    readonly type: "boolean";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Is client is a company";
                };
                readonly supplier: {
                    readonly type: "boolean";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Is client is a supplier";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly count: {
                    readonly type: "integer";
                    readonly default: 0;
                    readonly examples: readonly [1];
                };
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [1];
                            };
                            readonly name: {
                                readonly type: "string";
                                readonly examples: readonly ["Андрей А.А."];
                            };
                            readonly phone: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                    readonly examples: readonly ["(123) 456-78-90"];
                                };
                            };
                            readonly email: {
                                readonly type: "string";
                                readonly examples: readonly ["some@site.domain"];
                            };
                            readonly notes: {
                                readonly type: "string";
                                readonly examples: readonly ["Платит не вовремя."];
                            };
                            readonly address: {
                                readonly type: "string";
                                readonly examples: readonly ["г. Город, ул. Улица д.12, кв.34"];
                            };
                            readonly supplier: {
                                readonly type: "boolean";
                                readonly default: true;
                                readonly examples: readonly [false];
                            };
                            readonly juridical: {
                                readonly type: "boolean";
                                readonly default: true;
                                readonly examples: readonly [false];
                            };
                            readonly conflicted: {
                                readonly type: "boolean";
                                readonly default: true;
                                readonly examples: readonly [true];
                            };
                            readonly modified_at: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [1454278600000];
                            };
                            readonly created_at: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [1454278600000];
                            };
                            readonly discount_code: {
                                readonly type: "string";
                                readonly examples: readonly ["2900000000018"];
                            };
                            readonly discount_goods: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [0];
                            };
                            readonly discount_services: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [5];
                            };
                            readonly discount_materials: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [25];
                            };
                            readonly discount_goods_margin_id: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [136751];
                            };
                            readonly discount_materials_margin_id: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [136751];
                            };
                            readonly custom_fields: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly "1": {
                                        readonly type: "string";
                                        readonly examples: readonly ["Some custom value"];
                                    };
                                };
                            };
                            readonly ad_campaign: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly id: {
                                        readonly type: "integer";
                                        readonly default: 0;
                                        readonly examples: readonly [1];
                                    };
                                    readonly name: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Internet"];
                                    };
                                };
                            };
                        };
                    };
                };
                readonly success: {
                    readonly type: "boolean";
                    readonly default: true;
                    readonly examples: readonly [true];
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetClientsById: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly client_id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Client ID";
                };
            };
            readonly required: readonly ["client_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetCompanySettings: {
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetDirectories: {
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetDirectoriesOfAssets: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly parent_id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Parent directory ID. If not specified, the directories of Asset groups will be given.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetDirectoryItems: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly book_id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Directory ID";
                };
            };
            readonly required: readonly ["book_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetEmployees: {
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetEstimateGoodsAndServicesCopy: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly items: {
                readonly type: "array";
                readonly description: "List of product and service items";
                readonly items: {
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                            readonly description: "Document item type (\"Product\" or \"Service\")";
                            readonly enum: readonly ["product", "service"];
                        };
                        readonly id: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly quantity: {
                            readonly type: "number";
                            readonly format: "float";
                            readonly minimum: -3.402823669209385e+38;
                            readonly maximum: 3.402823669209385e+38;
                        };
                        readonly price: {
                            readonly type: "number";
                            readonly format: "float";
                            readonly minimum: -3.402823669209385e+38;
                            readonly maximum: 3.402823669209385e+38;
                        };
                        readonly cost: {
                            readonly type: "integer";
                            readonly format: "int64";
                            readonly minimum: -9223372036854776000;
                            readonly maximum: 9223372036854776000;
                        };
                    };
                    readonly type: "object";
                };
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly estimate_id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Estimate ID";
                };
            };
            readonly required: readonly ["estimate_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetEstimateStatuses: {
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetInvoices: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly page: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly default: 1;
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Page number";
                };
                readonly "ids[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "List of Invoice IDs";
                };
                readonly "id_labels[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Array of Invoices document numbers";
                };
                readonly "due_date[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int64";
                        readonly minimum: -9223372036854776000;
                        readonly maximum: 9223372036854776000;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by the Due Date of the invoice. An array of one or two values that contain a timestamp. If the array consists of one value, then it is the left border. Examples: [0, 1454277600000], [1454277500000].";
                };
                readonly "issue_date[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int64";
                        readonly minimum: -9223372036854776000;
                        readonly maximum: 9223372036854776000;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by the Issue Date of the invoice. An array of one or two values that contain a timestamp. If the array consists of one value, then it is the left border. Examples: [0, 1454277600000], [1454277500000].";
                };
                readonly "statuses[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Array of Invoice Status IDs. Draft - 0; Issued - 1; Paid - 2; Declined - 3.";
                };
                readonly "client_ids[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "List of Client IDs";
                };
                readonly "client_names[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "List of Client names";
                };
                readonly "client_phones[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "List of Client phone numbers";
                };
                readonly "payer_ids[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "List of Payer IDs";
                };
                readonly "payer_names[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "List of Payer names";
                };
                readonly "payer_phones[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "List of Payer phone numbers";
                };
                readonly "manager_ids[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "List of Manager IDs";
                };
                readonly "created_at[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int64";
                        readonly minimum: -9223372036854776000;
                        readonly maximum: 9223372036854776000;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by date of creation of Invoices. An array of one or two values that contain a timestamp. If the array consists of one value, then it is the left border. Examples: [0, 1454277600000], [1454277500000].";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetLeadCustomFields: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly leadtype_id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Specific lead type ID";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [6326298];
                            };
                            readonly name: {
                                readonly type: "string";
                                readonly examples: readonly ["Number test"];
                            };
                            readonly type: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [6];
                            };
                        };
                    };
                };
                readonly count: {
                    readonly type: "integer";
                    readonly default: 0;
                    readonly examples: readonly [4];
                };
                readonly success: {
                    readonly type: "boolean";
                    readonly default: true;
                    readonly examples: readonly [true];
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetLeadStatuses: {
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetLeadTypes: {
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [4];
                            };
                            readonly name: {
                                readonly type: "string";
                                readonly examples: readonly ["One"];
                            };
                        };
                    };
                };
                readonly count: {
                    readonly type: "integer";
                    readonly default: 0;
                    readonly examples: readonly [4];
                };
                readonly success: {
                    readonly type: "boolean";
                    readonly default: true;
                    readonly examples: readonly [true];
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetLeads: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "ids[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "List of Lead IDs";
                };
                readonly "id_labels[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Array of Leads document numbers";
                };
                readonly "statuses[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Array of Lead Status IDs";
                };
                readonly "managers[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Array of Employee IDs";
                };
                readonly "client_names[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "List of client names";
                };
                readonly "client_phones[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "List of Client phone numbers";
                };
                readonly "created_at[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int64";
                        readonly minimum: -9223372036854776000;
                        readonly maximum: 9223372036854776000;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by date of creation of leads. An array of one or two values that contain a timestamp. If the array consists of one value, then it is the left border. Examples: [0, 1454277600000], [1454277500000].";
                };
                readonly "modified_at[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int64";
                        readonly minimum: -9223372036854776000;
                        readonly maximum: 9223372036854776000;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by date of modification of leads. An array of one or two values that contain a timestamp. If the array consists of one value, then it is the left border. Examples: [0, 1454277600000], [1454277500000].";
                };
                readonly "closed_at[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int64";
                        readonly minimum: -9223372036854776000;
                        readonly maximum: 9223372036854776000;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by date of closing of leads. An array of one or two values that contain a timestamp. If the array consists of one value, then it is the left border. Examples: [0, 1454277600000], [1454277500000].";
                };
                readonly page: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly default: 1;
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetLocations: {
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetOrderById: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly order_id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Order ID";
                };
            };
            readonly required: readonly ["order_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetOrderCustomFields: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly ordertype_id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Specific order type ID";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [6326298];
                            };
                            readonly name: {
                                readonly type: "string";
                                readonly examples: readonly ["Number test"];
                            };
                            readonly type: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [6];
                            };
                        };
                    };
                };
                readonly count: {
                    readonly type: "integer";
                    readonly default: 0;
                    readonly examples: readonly [4];
                };
                readonly success: {
                    readonly type: "boolean";
                    readonly default: true;
                    readonly examples: readonly [true];
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetOrderPublicUrl: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly order_id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Order ID";
                };
            };
            readonly required: readonly ["order_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly url: {
                    readonly type: "string";
                    readonly examples: readonly ["https://web.remonline.app/static/dist/publicApproval.html?hash=0065f20200001b"];
                };
                readonly success: {
                    readonly type: "boolean";
                    readonly default: true;
                    readonly examples: readonly [true];
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetOrderStatuses: {
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [4];
                            };
                            readonly name: {
                                readonly type: "string";
                                readonly examples: readonly ["One"];
                            };
                        };
                    };
                };
                readonly count: {
                    readonly type: "integer";
                    readonly default: 0;
                    readonly examples: readonly [4];
                };
                readonly success: {
                    readonly type: "boolean";
                    readonly default: true;
                    readonly examples: readonly [true];
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetOrderStatusesCopy: {
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [4];
                            };
                            readonly name: {
                                readonly type: "string";
                                readonly examples: readonly ["One"];
                            };
                        };
                    };
                };
                readonly count: {
                    readonly type: "integer";
                    readonly default: 0;
                    readonly examples: readonly [4];
                };
                readonly success: {
                    readonly type: "boolean";
                    readonly default: true;
                    readonly examples: readonly [true];
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetOrderTypes: {
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [4];
                            };
                            readonly name: {
                                readonly type: "string";
                                readonly examples: readonly ["One"];
                            };
                        };
                    };
                };
                readonly count: {
                    readonly type: "integer";
                    readonly default: 0;
                    readonly examples: readonly [4];
                };
                readonly success: {
                    readonly type: "boolean";
                    readonly default: true;
                    readonly examples: readonly [true];
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetOrders: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly page: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly default: 1;
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Page number";
                };
                readonly sort_dir: {
                    readonly type: "string";
                    readonly enum: readonly ["asc", "desc"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Sorting direction";
                };
                readonly "types[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "List of order type IDs";
                };
                readonly "branches[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "List of location IDs";
                };
                readonly "brands[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Brands list";
                };
                readonly "ids[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "List of order IDs";
                };
                readonly "id_labels[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Array of order document numbers";
                };
                readonly "statuses[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Array of order status IDs";
                };
                readonly "managers[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Array of employee IDs";
                };
                readonly "engineers[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "List of company employee IDs";
                };
                readonly "clients_ids[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "List of client IDs";
                };
                readonly "client_names[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "List of client names";
                };
                readonly "client_phones[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "List of client phone numbers";
                };
                readonly "created_at[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int64";
                        readonly minimum: -9223372036854776000;
                        readonly maximum: 9223372036854776000;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by the Order creation date.  An array of one or two values that contain a timestamp. If the array consists of one value, then it is the left border. Examples: [0, 1454277600000], [1454277500000].";
                };
                readonly "modified_at[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int64";
                        readonly minimum: -9223372036854776000;
                        readonly maximum: 9223372036854776000;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by the last modification date of the Order. An array of one or two values that contain a timestamp. If the array consists of one value, then it is the left border. Examples: [0, 1454277600000], [1454277500000].";
                };
                readonly "done_at[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int64";
                        readonly minimum: -9223372036854776000;
                        readonly maximum: 9223372036854776000;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Completion date filter. Single or two values with a timestamp. These are from and to parameters. Example: [1454277600000, 1456783200000], [1454277500000]";
                };
                readonly "closed_at[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int64";
                        readonly minimum: -9223372036854776000;
                        readonly maximum: 9223372036854776000;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Order closing date filter. Single or two values with a timestamp. These are from and to parameters. Example:  [1456783200000, 1454925794507], [1454277500000].";
                };
                readonly "asset_uid[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "List of assets IDs";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [45623419];
                            };
                            readonly modified_at: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [1705320688000];
                            };
                            readonly uuid: {
                                readonly type: "string";
                                readonly examples: readonly ["852f9a47-caa7-430f-9df3-21bdc890fc08"];
                            };
                            readonly status: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly id: {
                                        readonly type: "integer";
                                        readonly default: 0;
                                        readonly examples: readonly [1814506];
                                    };
                                    readonly name: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Закрито"];
                                    };
                                    readonly color: {
                                        readonly type: "string";
                                        readonly examples: readonly ["#939699"];
                                    };
                                    readonly group: {
                                        readonly type: "integer";
                                        readonly default: 0;
                                        readonly examples: readonly [6];
                                    };
                                };
                            };
                            readonly created_at: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [1705052511000];
                            };
                            readonly done_at: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [1705054091000];
                            };
                            readonly duration: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [0];
                            };
                            readonly kindof_good: {
                                readonly type: "string";
                                readonly examples: readonly [""];
                            };
                            readonly serial: {
                                readonly type: "string";
                                readonly examples: readonly [""];
                            };
                            readonly packagelist: {
                                readonly type: "string";
                                readonly examples: readonly [""];
                            };
                            readonly appearance: {
                                readonly type: "string";
                                readonly examples: readonly [""];
                            };
                            readonly malfunction: {
                                readonly type: "string";
                                readonly examples: readonly [""];
                            };
                            readonly manager_notes: {
                                readonly type: "string";
                                readonly examples: readonly ["автовоз"];
                            };
                            readonly engineer_notes: {
                                readonly type: "string";
                                readonly examples: readonly [""];
                            };
                            readonly resume: {
                                readonly type: "string";
                                readonly examples: readonly [""];
                            };
                            readonly payed: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [96000];
                            };
                            readonly missed_payments: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [0];
                            };
                            readonly warranty_measures: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [0];
                            };
                            readonly urgent: {
                                readonly type: "boolean";
                                readonly default: true;
                                readonly examples: readonly [false];
                            };
                            readonly discount_sum: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [0];
                            };
                            readonly resources: {
                                readonly type: "array";
                                readonly items: {};
                            };
                            readonly custom_fields: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly f7096057: {
                                        readonly type: "string";
                                        readonly examples: readonly ["8045016240"];
                                    };
                                    readonly f7108510: {
                                        readonly type: "string";
                                        readonly examples: readonly ["YSA-SIN23111302"];
                                    };
                                    readonly f7111319: {
                                        readonly type: "string";
                                        readonly examples: readonly ["FOB"];
                                    };
                                    readonly f7111320: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Gdansk"];
                                    };
                                    readonly f7111378: {
                                        readonly type: "integer";
                                        readonly default: 0;
                                        readonly examples: readonly [1704672000000];
                                    };
                                    readonly f7111379: {
                                        readonly type: "integer";
                                        readonly default: 0;
                                        readonly examples: readonly [1710028800000];
                                    };
                                };
                            };
                            readonly estimated_cost: {
                                readonly type: "string";
                                readonly examples: readonly ["93000"];
                            };
                            readonly closed_at: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [1705320688000];
                            };
                            readonly estimated_done_at: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [1711359480000];
                            };
                            readonly id_label: {
                                readonly type: "string";
                                readonly examples: readonly ["A004"];
                            };
                            readonly price: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [96000];
                            };
                            readonly branch_id: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [150860];
                            };
                            readonly overdue: {
                                readonly type: "boolean";
                                readonly default: true;
                                readonly examples: readonly [false];
                            };
                            readonly status_overdue: {
                                readonly type: "boolean";
                                readonly default: true;
                                readonly examples: readonly [false];
                            };
                            readonly parts: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly id: {
                                            readonly type: "integer";
                                            readonly default: 0;
                                            readonly examples: readonly [63350687];
                                        };
                                        readonly entityId: {
                                            readonly type: "integer";
                                            readonly default: 0;
                                            readonly examples: readonly [39980056];
                                        };
                                        readonly engineerId: {
                                            readonly type: "integer";
                                            readonly default: 0;
                                            readonly examples: readonly [236089];
                                        };
                                        readonly title: {
                                            readonly type: "string";
                                            readonly examples: readonly ["Mercedes Benz EQE 350 Top LE4GM1CBXPN005543"];
                                        };
                                        readonly amount: {
                                            readonly type: "integer";
                                            readonly default: 0;
                                            readonly examples: readonly [1];
                                        };
                                        readonly price: {
                                            readonly type: "integer";
                                            readonly default: 0;
                                            readonly examples: readonly [96000];
                                        };
                                        readonly cost: {
                                            readonly type: "integer";
                                            readonly default: 0;
                                            readonly examples: readonly [54500];
                                        };
                                        readonly discount_value: {
                                            readonly type: "integer";
                                            readonly default: 0;
                                            readonly examples: readonly [0];
                                        };
                                        readonly taxes: {
                                            readonly type: "array";
                                            readonly items: {};
                                        };
                                        readonly warranty: {
                                            readonly type: "integer";
                                            readonly default: 0;
                                            readonly examples: readonly [0];
                                        };
                                        readonly warranty_period: {
                                            readonly type: "integer";
                                            readonly default: 0;
                                            readonly examples: readonly [0];
                                        };
                                    };
                                };
                            };
                            readonly operations: {
                                readonly type: "array";
                                readonly items: {};
                            };
                            readonly attachments: {
                                readonly type: "array";
                                readonly items: {};
                            };
                            readonly order_type: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly id: {
                                        readonly type: "integer";
                                        readonly default: 0;
                                        readonly examples: readonly [249381];
                                    };
                                    readonly name: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Заказ авто"];
                                    };
                                };
                            };
                            readonly client: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly id: {
                                        readonly type: "integer";
                                        readonly default: 0;
                                        readonly examples: readonly [30181056];
                                    };
                                    readonly name: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Огульчанская Олеся"];
                                    };
                                    readonly email: {
                                        readonly type: "string";
                                        readonly examples: readonly [""];
                                    };
                                    readonly phone: {
                                        readonly type: "array";
                                        readonly items: {
                                            readonly type: "string";
                                            readonly examples: readonly ["380677451909"];
                                        };
                                    };
                                    readonly notes: {
                                        readonly type: "string";
                                        readonly examples: readonly [""];
                                    };
                                    readonly address: {
                                        readonly type: "string";
                                        readonly examples: readonly [""];
                                    };
                                    readonly supplier: {
                                        readonly type: "boolean";
                                        readonly default: true;
                                        readonly examples: readonly [false];
                                    };
                                    readonly juridical: {
                                        readonly type: "boolean";
                                        readonly default: true;
                                        readonly examples: readonly [false];
                                    };
                                    readonly conflicted: {
                                        readonly type: "boolean";
                                        readonly default: true;
                                        readonly examples: readonly [false];
                                    };
                                    readonly modified_at: {
                                        readonly type: "integer";
                                        readonly default: 0;
                                        readonly examples: readonly [1704888924000];
                                    };
                                    readonly created_at: {
                                        readonly type: "integer";
                                        readonly default: 0;
                                        readonly examples: readonly [1704888924000];
                                    };
                                    readonly discount_code: {
                                        readonly type: "string";
                                        readonly examples: readonly [""];
                                    };
                                    readonly discount_goods: {
                                        readonly type: "integer";
                                        readonly default: 0;
                                        readonly examples: readonly [0];
                                    };
                                    readonly discount_services: {
                                        readonly type: "integer";
                                        readonly default: 0;
                                        readonly examples: readonly [0];
                                    };
                                    readonly discount_materials: {
                                        readonly type: "integer";
                                        readonly default: 0;
                                        readonly examples: readonly [0];
                                    };
                                    readonly custom_fields: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly f561220: {
                                                readonly type: "string";
                                                readonly examples: readonly [""];
                                            };
                                        };
                                    };
                                    readonly ad_campaign: {
                                        readonly type: "object";
                                        readonly properties: {};
                                    };
                                };
                            };
                            readonly manager_id: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [235882];
                            };
                            readonly engineer_id: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [236089];
                            };
                            readonly created_by_id: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [231956];
                            };
                            readonly closed_by_id: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [235881];
                            };
                            readonly ad_campaign: {
                                readonly type: "object";
                                readonly properties: {};
                            };
                            readonly asset: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly id: {
                                        readonly type: "integer";
                                        readonly default: 0;
                                        readonly examples: readonly [4399119];
                                    };
                                    readonly uid: {
                                        readonly type: "string";
                                        readonly examples: readonly ["LE4GM1CBXPN005543"];
                                    };
                                    readonly title: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Автомобіль Mersedes-Benz EQE 350 Top"];
                                    };
                                    readonly color: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Light grey"];
                                    };
                                    readonly state: {
                                        readonly type: "string";
                                        readonly examples: readonly ["New"];
                                    };
                                    readonly cost: {
                                        readonly type: "integer";
                                        readonly default: 0;
                                        readonly examples: readonly [0];
                                    };
                                    readonly group: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Автомобіль"];
                                    };
                                    readonly brand: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Mersedes-Benz"];
                                    };
                                    readonly model: {
                                        readonly type: "string";
                                        readonly examples: readonly ["EQE 350"];
                                    };
                                    readonly modification: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Top"];
                                    };
                                    readonly year: {
                                        readonly type: "string";
                                        readonly examples: readonly [""];
                                    };
                                    readonly owner: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly id: {
                                                readonly type: "integer";
                                                readonly default: 0;
                                                readonly examples: readonly [30362208];
                                            };
                                            readonly name: {
                                                readonly type: "string";
                                                readonly examples: readonly ["ЮСА"];
                                            };
                                        };
                                    };
                                    readonly warehouse: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly title: {
                                                readonly type: "string";
                                                readonly examples: readonly ["Client > ЮСА > Комірка 1"];
                                            };
                                            readonly id: {
                                                readonly type: "integer";
                                                readonly default: 0;
                                                readonly examples: readonly [3134051];
                                            };
                                            readonly cell_id: {
                                                readonly type: "integer";
                                                readonly default: 0;
                                                readonly examples: readonly [3161007];
                                            };
                                            readonly client_id: {
                                                readonly type: "integer";
                                                readonly default: 0;
                                                readonly examples: readonly [30362208];
                                            };
                                        };
                                    };
                                    readonly f3370046: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Відсутній"];
                                    };
                                };
                            };
                            readonly brand: {
                                readonly type: "string";
                                readonly examples: readonly ["Mersedes-Benz"];
                            };
                            readonly model: {
                                readonly type: "string";
                                readonly examples: readonly ["EQE 350"];
                            };
                        };
                    };
                };
                readonly page: {
                    readonly type: "integer";
                    readonly default: 0;
                    readonly examples: readonly [1];
                };
                readonly count: {
                    readonly type: "integer";
                    readonly default: 0;
                    readonly examples: readonly [22];
                };
                readonly success: {
                    readonly type: "boolean";
                    readonly default: true;
                    readonly examples: readonly [true];
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetOrdersCopy2: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly page: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly default: 1;
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Page number";
                };
                readonly sort_dir: {
                    readonly type: "string";
                    readonly enum: readonly ["asc", "desc"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Sorting direction";
                };
                readonly "types[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "List of estimate type IDs (same as order types)";
                };
                readonly "branches[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "List of location IDs";
                };
                readonly "ids[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "List of estimate IDs";
                };
                readonly "id_labels[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Array of estimate document numbers";
                };
                readonly "statuses[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Array of estimate status IDs";
                };
                readonly "managers[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Array of Employee IDs";
                };
                readonly "clients_ids[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "List of client IDs";
                };
                readonly "client_names[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "List of client names";
                };
                readonly "client_phones[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "List of Client phone numbers";
                };
                readonly "created_at[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int64";
                        readonly minimum: -9223372036854776000;
                        readonly maximum: 9223372036854776000;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by date of creation of leads. An array of one or two values that contain a timestamp. If the array consists of one value, then it is the left border. Examples: [0, 1454277600000], [1454277500000].";
                };
                readonly "modified_at[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int64";
                        readonly minimum: -9223372036854776000;
                        readonly maximum: 9223372036854776000;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by last modified date";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetPostings: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly page: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                };
                readonly "warehouse_ids[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "List of warehouse IDs";
                };
                readonly "supplier_ids[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "List of supplier IDs";
                };
                readonly "created_at[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int64";
                        readonly minimum: -9223372036854776000;
                        readonly maximum: 9223372036854776000;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Creation date filter. Single or two values with a timestamp. These are from and to parameters; Example: [0, 1454277600000], [1454277500000];";
                };
                readonly "ids[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "List of posting IDs";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetPrices: {
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetProductById: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly product_id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Product ID";
                };
            };
            readonly required: readonly ["product_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetProductCategories: {
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetProductSerialNumbers: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly warehouse_id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Warehouse ID";
                };
                readonly good_id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Product ID";
                };
            };
            readonly required: readonly ["warehouse_id", "good_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetProducts: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "ids[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Product ID";
                };
                readonly "categories[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Product category";
                };
                readonly title: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Product name (exact match).";
                };
                readonly "articles[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Product article";
                };
                readonly "barcodes[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Product barcode";
                };
                readonly q: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Search by text in title, article, code, barcode.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetSales: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly page: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Page number";
                };
                readonly "created_at[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int64";
                        readonly minimum: -9223372036854776000;
                        readonly maximum: 9223372036854776000;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by the Sale creation date. An array of one or two values that contain a timestamp. If the array consists of one value, then it is the left border. Examples: [0, 1454277600000], [1454277500000].";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetService: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "ids[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Service ID";
                };
                readonly "categories[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Service category";
                };
                readonly title: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Service name (exact match).";
                };
                readonly "barcodes[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Service barcode";
                };
                readonly q: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Search by text in title, code, barcode.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetServiceById: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly service_id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Service ID";
                };
            };
            readonly required: readonly ["service_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetServiceCategories: {
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetServices: {
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetServicesCopy1: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly title: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Service title";
                };
                readonly categories: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Product category IDs";
                };
                readonly barcode: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Product barcode";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetStock: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly warehouse_id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Warehouse ID";
                };
            };
            readonly required: readonly ["warehouse_id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly title: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Product title";
                };
                readonly "ids[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Product IDs";
                };
                readonly "categories[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Product category IDs";
                };
                readonly "articles[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Product SKUs";
                };
                readonly "barcodes[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Product barcodes";
                };
                readonly exclude_zero_residue: {
                    readonly type: "boolean";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Exclude products with zero stock balance";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [39564253];
                            };
                            readonly code: {
                                readonly type: "string";
                                readonly examples: readonly ["1улаоачлр64645634"];
                            };
                            readonly title: {
                                readonly type: "string";
                                readonly examples: readonly ["11G853666"];
                            };
                            readonly image: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                    readonly examples: readonly ["https://storage.remonline.app/warehouse_images/098192347efb41a8a5bdb66efbe6402c_500_500.jpeg?"];
                                };
                            };
                            readonly price: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly "347104": {
                                        readonly type: "integer";
                                        readonly default: 0;
                                        readonly examples: readonly [11400];
                                    };
                                    readonly "347105": {
                                        readonly type: "integer";
                                        readonly default: 0;
                                        readonly examples: readonly [15960];
                                    };
                                    readonly "347106": {
                                        readonly type: "integer";
                                        readonly default: 0;
                                        readonly examples: readonly [5700];
                                    };
                                    readonly "347925": {
                                        readonly type: "integer";
                                        readonly default: 0;
                                        readonly examples: readonly [11400];
                                    };
                                    readonly "351961": {
                                        readonly type: "integer";
                                        readonly default: 0;
                                        readonly examples: readonly [461700];
                                    };
                                };
                            };
                            readonly article: {
                                readonly type: "string";
                                readonly examples: readonly ["520000013"];
                            };
                            readonly residue: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [0];
                            };
                            readonly category: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly id: {
                                        readonly type: "integer";
                                        readonly default: 0;
                                        readonly examples: readonly [936357];
                                    };
                                    readonly title: {
                                        readonly type: "string";
                                        readonly examples: readonly ["ID4"];
                                    };
                                    readonly parent_id: {
                                        readonly type: "integer";
                                        readonly default: 0;
                                        readonly examples: readonly [936356];
                                    };
                                };
                            };
                            readonly description: {
                                readonly type: "string";
                                readonly examples: readonly ["Бампер структура основна"];
                            };
                            readonly custom_fields: {
                                readonly type: "object";
                                readonly properties: {};
                            };
                            readonly warranty: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [0];
                            };
                            readonly warranty_period: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [0];
                            };
                        };
                    };
                };
                readonly page: {
                    readonly type: "integer";
                    readonly default: 0;
                    readonly examples: readonly [1];
                };
                readonly count: {
                    readonly type: "integer";
                    readonly default: 0;
                    readonly examples: readonly [267];
                };
                readonly success: {
                    readonly type: "boolean";
                    readonly default: true;
                    readonly examples: readonly [true];
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetStockCopy: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly warehouse_id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Warehouse ID";
                };
            };
            readonly required: readonly ["warehouse_id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "categories[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Product category IDs";
                };
                readonly exclude_zero_residue: {
                    readonly type: "boolean";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Exclude products with zero stock balance";
                };
                readonly title: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Product title";
                };
                readonly article: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Product SKU";
                };
                readonly barcode: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Product barcode";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetTasks: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly page: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Page number";
                };
                readonly sort_dir: {
                    readonly type: "string";
                    readonly enum: readonly ["asc", "desc"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Sorting direction";
                };
                readonly "author_ids[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "List of Employee IDs";
                };
                readonly "assignee_ids[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "List of Employee IDs";
                };
                readonly "deadline_at[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly format: "date-time";
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by the Task Deadline date. An array of one or two values that contain a timestamp. If the array consists of one value, then it is the left border. Examples: [0, 1454277600000], [1454277500000].";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetTasksById: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly task_id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Task ID";
                };
            };
            readonly required: readonly ["task_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetTransfers: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly page: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                };
                readonly branch_id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by ID of location from which the transfer was made";
                };
                readonly warehouse_id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by ID of warehouse from which the transfer was made";
                };
                readonly "ids[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int64";
                        readonly minimum: -9223372036854776000;
                        readonly maximum: 9223372036854776000;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "List of transfers document IDs";
                };
            };
            readonly required: readonly ["branch_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetUnitsOfMeasurement: {
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetWarehouseBins: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly warehouse_id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Warehouse ID";
                };
            };
            readonly required: readonly ["warehouse_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetWarehouses: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly branch_id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Location ID";
                };
                readonly type: {
                    readonly type: "string";
                    readonly enum: readonly ["product", "asset"];
                    readonly default: "product";
                    readonly description: "Type of warehouses that will be returned.";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [87310];
                            };
                            readonly title: {
                                readonly type: "string";
                                readonly examples: readonly ["1111"];
                            };
                            readonly is_global: {
                                readonly type: "boolean";
                                readonly default: true;
                                readonly examples: readonly [false];
                            };
                            readonly type: {
                                readonly type: "string";
                                readonly examples: readonly ["product"];
                            };
                        };
                    };
                };
                readonly count: {
                    readonly type: "integer";
                    readonly default: 0;
                    readonly examples: readonly [38];
                };
                readonly success: {
                    readonly type: "boolean";
                    readonly default: true;
                    readonly examples: readonly [true];
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetWriteOffs: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly page: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                };
                readonly branch_id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by ID of location from which the transfer was made";
                };
                readonly warehouse_id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by ID of warehouse from which the transfer was made";
                };
                readonly "ids[]": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "integer";
                        readonly format: "int64";
                        readonly minimum: -9223372036854776000;
                        readonly maximum: 9223372036854776000;
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "List of transfers document IDs";
                };
            };
            readonly required: readonly ["branch_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const MergeClients: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["source", "target"];
        readonly properties: {
            readonly source: {
                readonly type: "array";
                readonly description: "IDs of clients which are merged";
                readonly items: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
            };
            readonly target: {
                readonly type: "integer";
                readonly description: "Main Client ID";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const MoveAsset: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly warehouse_id: {
                readonly type: "integer";
                readonly description: "Warehouse ID";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly asset_id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Asset ID";
                };
            };
            readonly required: readonly ["asset_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const ReopenTask: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly task_id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Task ID";
                };
            };
            readonly required: readonly ["task_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const UpdateAsset: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly uid: {
                readonly type: "string";
                readonly description: "Serial number of asset (VIN, IMEI)";
            };
            readonly reg_number: {
                readonly type: "string";
                readonly description: "Vehicle plate number";
            };
            readonly group: {
                readonly type: "string";
                readonly description: "Group of Asset";
            };
            readonly brand: {
                readonly type: "string";
                readonly description: "Brand of Asset";
            };
            readonly model: {
                readonly type: "string";
                readonly description: "Model of Asset";
            };
            readonly modification: {
                readonly type: "string";
                readonly description: "Modification of Asset";
            };
            readonly color: {
                readonly type: "string";
                readonly description: "Color of Asset";
            };
            readonly state: {
                readonly type: "string";
                readonly description: "Condition of Asset";
            };
            readonly cost: {
                readonly type: "string";
                readonly description: "Cost of Asset";
            };
            readonly year: {
                readonly type: "string";
                readonly description: "Year of Asset";
            };
            readonly owner_id: {
                readonly type: "integer";
                readonly description: "ID of Asset owner";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly warehouse_id: {
                readonly type: "integer";
                readonly description: "Warehouse ID";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly custom_fields: {
                readonly type: "string";
                readonly description: "Custom fields";
                readonly format: "json";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly asset_id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Asset ID";
                };
            };
            readonly required: readonly ["asset_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const UpdateClient: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly id: {
                readonly type: "integer";
                readonly description: "Client ID";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly first_name: {
                readonly type: "string";
                readonly description: "Client first name";
            };
            readonly last_name: {
                readonly type: "string";
                readonly description: "Client last name";
            };
            readonly phone: {
                readonly type: "array";
                readonly description: "List of client phone numbers";
                readonly items: {
                    readonly type: "string";
                };
            };
            readonly email: {
                readonly type: "string";
                readonly description: "List of client emails";
            };
            readonly address: {
                readonly type: "string";
                readonly description: "Client address";
            };
            readonly notes: {
                readonly type: "string";
                readonly description: "Client notes";
            };
            readonly supplier: {
                readonly type: "boolean";
                readonly description: "Is client is a supplier";
            };
            readonly juridical: {
                readonly type: "boolean";
                readonly description: "Is client is a company";
            };
            readonly ad_campaign_id: {
                readonly type: "integer";
                readonly description: "Ad Campaign ID";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly discount_code: {
                readonly type: "string";
                readonly description: "Client's discount card";
            };
            readonly discount_goods: {
                readonly type: "number";
                readonly description: "Client's product discount";
                readonly format: "float";
                readonly minimum: -3.402823669209385e+38;
                readonly maximum: 3.402823669209385e+38;
            };
            readonly discount_services: {
                readonly type: "number";
                readonly description: "Client's service discounts";
                readonly format: "float";
                readonly minimum: -3.402823669209385e+38;
                readonly maximum: 3.402823669209385e+38;
            };
            readonly discount_materials: {
                readonly type: "number";
                readonly description: "Client's materials discounts";
                readonly format: "float";
                readonly minimum: -3.402823669209385e+38;
                readonly maximum: 3.402823669209385e+38;
            };
            readonly custom_fields: {
                readonly type: "string";
                readonly description: "Custom fields object";
                readonly format: "json";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly token: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const UpdateLead: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["lead_id", "status_id"];
        readonly properties: {
            readonly lead_id: {
                readonly type: "integer";
                readonly description: "Lead ID";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly status_id: {
                readonly type: "integer";
                readonly description: "Status ID";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly client_id: {
                readonly type: "integer";
                readonly description: "Client ID";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly contact_phone: {
                readonly type: "string";
                readonly description: "Lead contact number";
            };
            readonly contact_name: {
                readonly type: "string";
                readonly description: "Lead contact name";
            };
            readonly leadtype_id: {
                readonly type: "integer";
                readonly description: "Lead type ID";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly is_juridical: {
                readonly type: "boolean";
                readonly description: "Does a lead contact is a legal entity";
            };
            readonly branch_id: {
                readonly type: "integer";
                readonly description: "Location ID";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly manager_id: {
                readonly type: "integer";
                readonly description: "Responsible manager ID";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly description: {
                readonly type: "string";
                readonly description: "Lead description";
            };
            readonly ad_campaign_id: {
                readonly type: "integer";
                readonly description: "Advertising campaign ID";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly is_urgent: {
                readonly type: "boolean";
                readonly description: "Is this Lead is urgent?";
            };
            readonly custom_fields: {
                readonly type: "string";
                readonly format: "json";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly token: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const UpdateProduct: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["category_id", "title"];
        readonly properties: {
            readonly category_id: {
                readonly type: "integer";
                readonly description: "Product category ID";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly title: {
                readonly type: "string";
                readonly description: "Product title";
            };
            readonly description: {
                readonly type: "string";
                readonly description: "Product description";
            };
            readonly code: {
                readonly type: "integer";
                readonly description: "Product code";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly article: {
                readonly type: "string";
                readonly description: "Product article";
            };
            readonly uom_id: {
                readonly type: "integer";
                readonly description: "Product uom ID";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly warranty: {
                readonly type: "boolean";
                readonly description: "If Product has warranty";
            };
            readonly warranty_period: {
                readonly type: "string";
                readonly description: "Product warranty period";
            };
            readonly barcodes: {
                readonly type: "array";
                readonly description: "Product barcodes";
                readonly items: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
            };
            readonly prices: {
                readonly type: "array";
                readonly description: "Product prices";
                readonly items: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
            };
            readonly custom_fields: {
                readonly type: "string";
                readonly description: "Custom fields";
                readonly format: "json";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly product_id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Product ID";
                };
            };
            readonly required: readonly ["product_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const UpdateService: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly category_id: {
                readonly type: "integer";
                readonly description: "Service category ID";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly title: {
                readonly type: "string";
                readonly description: "Service title";
            };
            readonly is_labor: {
                readonly type: "boolean";
                readonly description: "If Service is Labor";
            };
            readonly uom_id: {
                readonly type: "integer";
                readonly description: "Service uom ID";
                readonly format: "int32";
                readonly minimum: -2147483648;
                readonly maximum: 2147483647;
            };
            readonly cost: {
                readonly type: "number";
                readonly description: "Service cost";
                readonly format: "float";
                readonly minimum: -3.402823669209385e+38;
                readonly maximum: 3.402823669209385e+38;
            };
            readonly warranty: {
                readonly type: "boolean";
                readonly description: "If Service has warranty";
            };
            readonly warranty_period: {
                readonly type: "string";
                readonly description: "Service warranty period";
            };
            readonly barcodes: {
                readonly type: "array";
                readonly description: "Service barcodes";
                readonly items: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
            };
            readonly prices: {
                readonly type: "array";
                readonly description: "Product prices";
                readonly items: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly service_id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Service ID";
                };
            };
            readonly required: readonly ["service_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const UpdateTask: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["title", "deadline", "assignees"];
        readonly properties: {
            readonly title: {
                readonly type: "string";
                readonly description: "Title";
            };
            readonly description: {
                readonly type: "string";
                readonly description: "Description";
            };
            readonly deadline: {
                readonly type: "string";
                readonly description: "Task Due Date";
                readonly format: "date-time";
            };
            readonly assignees: {
                readonly type: "array";
                readonly description: "Array of Employee IDs";
                readonly items: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                };
            };
            readonly rel_obj: {
                readonly type: "object";
                readonly description: "Related Object";
                readonly properties: {
                    readonly id: {
                        readonly type: "integer";
                        readonly description: "Object ID";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                    readonly type: {
                        readonly type: "integer";
                        readonly description: "Object Type (2=Order, 3=Lead, 4=Client, 6=Task, 9=Invoice)";
                        readonly format: "int32";
                        readonly minimum: -2147483648;
                        readonly maximum: 2147483647;
                    };
                };
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly task_id: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Task ID";
                };
            };
            readonly required: readonly ["task_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
export { AddGoodsAndServices, Authentication, ChangeLeadStatus, ChangeOrderStatus, CloseTask, CommentOnTask, CreateAsset, CreateClient, CreateCommentOnClient, CreateCommentOnLead, CreateCommentOnOrder, CreateLead, CreateOrder, CreatePayment, CreatePosting, CreateProduct, CreateService, CreateTasks, CreateTransfer, CreateWriteOff, GetAdCampaigns, GetAssetById, GetAssetCustomFields, GetAssets, GetBundleEntities, GetBundles, GetCashboxTransactions, GetCashboxes, GetCashflowItems, GetCashflowitems, GetClientCustomFields, GetClients, GetClientsById, GetCompanySettings, GetDirectories, GetDirectoriesOfAssets, GetDirectoryItems, GetEmployees, GetEstimateGoodsAndServicesCopy, GetEstimateStatuses, GetInvoices, GetLeadCustomFields, GetLeadStatuses, GetLeadTypes, GetLeads, GetLocations, GetOrderById, GetOrderCustomFields, GetOrderPublicUrl, GetOrderStatuses, GetOrderStatusesCopy, GetOrderTypes, GetOrders, GetOrdersCopy2, GetPostings, GetPrices, GetProductById, GetProductCategories, GetProductSerialNumbers, GetProducts, GetSales, GetService, GetServiceById, GetServiceCategories, GetServices, GetServicesCopy1, GetStock, GetStockCopy, GetTasks, GetTasksById, GetTransfers, GetUnitsOfMeasurement, GetWarehouseBins, GetWarehouses, GetWriteOffs, MergeClients, MoveAsset, ReopenTask, UpdateAsset, UpdateClient, UpdateLead, UpdateProduct, UpdateService, UpdateTask };
