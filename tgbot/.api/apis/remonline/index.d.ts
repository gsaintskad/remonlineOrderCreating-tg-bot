import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core';
import Oas from 'oas';
import APICore from 'api/dist/core';
declare class SDK {
    spec: Oas;
    core: APICore;
    constructor();
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    config(config: ConfigOptions): void;
    /**
     * If the API you're using requires authentication you can supply the required credentials
     * through this method and the library will magically determine how they should be used
     * within your API request.
     *
     * With the exception of OpenID and MutualTLS, it supports all forms of authentication
     * supported by the OpenAPI specification.
     *
     * @example <caption>HTTP Basic auth</caption>
     * sdk.auth('username', 'password');
     *
     * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
     * sdk.auth('myBearerToken');
     *
     * @example <caption>API Keys</caption>
     * sdk.auth('myApiKey');
     *
     * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
     * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
     * @param values Your auth credentials for the API; can specify up to two strings or numbers.
     */
    auth(...values: string[] | number[]): this;
    /**
     * If the API you're using offers alternate server URLs, and server variables, you can tell
     * the SDK which one to use with this method. To use it you can supply either one of the
     * server URLs that are contained within the OpenAPI definition (along with any server
     * variables), or you can pass it a fully qualified URL to use (that may or may not exist
     * within the OpenAPI definition).
     *
     * @example <caption>Server URL with server variables</caption>
     * sdk.server('https://{region}.api.example.com/{basePath}', {
     *   name: 'eu',
     *   basePath: 'v14',
     * });
     *
     * @example <caption>Fully qualified server URL</caption>
     * sdk.server('https://eu.api.example.com/v14');
     *
     * @param url Server URL
     * @param variables An object of variables to replace into the server URL.
     */
    server(url: string, variables?: {}): void;
    /**
     * Method to obtain an authentication token.
     *
     * @summary Authentication
     * @throws FetchError<401, types.AuthenticationResponse401> 401
     */
    authentication(body?: types.AuthenticationBodyParam): Promise<FetchResponse<200, types.AuthenticationResponse200>>;
    /**
     * Get the list of leads.
     *
     * @summary Get Leads
     * @throws FetchError<400, types.GetLeadsResponse400> 400
     */
    getLeads(metadata?: types.GetLeadsMetadataParam): Promise<FetchResponse<200, types.GetLeadsResponse200>>;
    /**
     * Create new Lead. Parameters client_id or contact_phone + contact_name are required.
     *
     * @summary Create Lead
     * @throws FetchError<400, types.CreateLeadResponse400> 400
     */
    createLead(body: types.CreateLeadBodyParam, metadata?: types.CreateLeadMetadataParam): Promise<FetchResponse<200, types.CreateLeadResponse200>>;
    /**
     * Update existed lead.
     *
     * @summary Update Lead
     * @throws FetchError<400, types.UpdateLeadResponse400> 400
     */
    updateLead(body: types.UpdateLeadBodyParam, metadata?: types.UpdateLeadMetadataParam): Promise<FetchResponse<200, types.UpdateLeadResponse200>>;
    /**
     * Get the list of lead types.
     *
     * @summary Get Lead Types
     * @throws FetchError<400, types.GetLeadTypesResponse400> 400
     */
    getLeadTypes(): Promise<FetchResponse<200, types.GetLeadTypesResponse200>>;
    /**
     * Returns a list of lead statuses.
     *
     * @summary Get Lead Statuses
     * @throws FetchError<400, types.GetLeadStatusesResponse400> 400
     */
    getLeadStatuses(): Promise<FetchResponse<200, types.GetLeadStatusesResponse200>>;
    /**
     * Change a status of the lead.
     *
     * @summary Change Lead Status
     * @throws FetchError<400, types.ChangeLeadStatusResponse400> 400
     */
    changeLeadStatus(body: types.ChangeLeadStatusBodyParam): Promise<FetchResponse<200, types.ChangeLeadStatusResponse200>>;
    /**
     * Returns a list of lead custom fields.
     *
     * @summary Get Lead Custom Fields
     * @throws FetchError<400, types.GetLeadCustomFieldsResponse400> 400
     */
    getLeadCustomFields(metadata?: types.GetLeadCustomFieldsMetadataParam): Promise<FetchResponse<200, types.GetLeadCustomFieldsResponse200>>;
    /**
     * Returns a list of order custom fields.
     *
     * @summary Get Order Custom Fields
     * @throws FetchError<400, types.GetOrderCustomFieldsResponse400> 400
     */
    getOrderCustomFields(metadata?: types.GetOrderCustomFieldsMetadataParam): Promise<FetchResponse<200, types.GetOrderCustomFieldsResponse200>>;
    /**
     * Get the list of lead types.
     *
     * @summary Get Order Types
     * @throws FetchError<400, types.GetOrderTypesResponse400> 400
     */
    getOrderTypes(): Promise<FetchResponse<200, types.GetOrderTypesResponse200>>;
    /**
     * Get the list of orders.
     *
     * @summary Get Orders
     * @throws FetchError<400, types.GetOrdersResponse400> 400
     */
    getOrders(metadata?: types.GetOrdersMetadataParam): Promise<FetchResponse<200, types.GetOrdersResponse200>>;
    /**
     * Create new order.
     *
     * @summary Create Order
     * @throws FetchError<400, types.CreateOrderResponse400> 400
     */
    createOrder(body: types.CreateOrderBodyParam): Promise<FetchResponse<200, types.CreateOrderResponse200>>;
    /**
     * Change a status of the order.
     *
     * @summary Change Order Status
     * @throws FetchError<400, types.ChangeOrderStatusResponse400> 400
     */
    changeOrderStatus(body: types.ChangeOrderStatusBodyParam): Promise<FetchResponse<200, types.ChangeOrderStatusResponse200>>;
    /**
     * Get the list of order statuses.
     *
     * @summary Get Order Statuses
     * @throws FetchError<400, types.GetOrderStatusesResponse400> 400
     */
    getOrderStatuses(): Promise<FetchResponse<200, types.GetOrderStatusesResponse200>>;
    /**
     * Returns the list of company sales.
     *
     * @summary Get Sales
     * @throws FetchError<400, types.GetSalesResponse400> 400
     */
    getSales(metadata?: types.GetSalesMetadataParam): Promise<FetchResponse<200, types.GetSalesResponse200>>;
    /**
     * Get the list of cashboxes.
     *
     * @summary Get Cashboxes
     * @throws FetchError<400, types.GetCashboxesResponse400> 400
     */
    getCashboxes(): Promise<FetchResponse<200, types.GetCashboxesResponse200>>;
    /**
     * Get the list of cashbox payments.
     *
     * @summary Get Cashbox Transactions
     * @throws FetchError<400, types.GetCashboxTransactionsResponse400> 400
     */
    getCashboxTransactions(metadata: types.GetCashboxTransactionsMetadataParam): Promise<FetchResponse<200, types.GetCashboxTransactionsResponse200>>;
    /**
     * Get the list of invoices.
     *
     * @summary Get Invoices
     * @throws FetchError<400, types.GetInvoicesResponse400> 400
     */
    getInvoices(metadata?: types.GetInvoicesMetadataParam): Promise<FetchResponse<200, types.GetInvoicesResponse200>>;
    /**
     * Get the list of ad campaigns.
     *
     * @summary Get Ad Campaigns
     * @throws FetchError<400, types.GetAdCampaignsResponse400> 400
     */
    getAdCampaigns(): Promise<FetchResponse<200, types.GetAdCampaignsResponse200>>;
    /**
     * Get the list of clients.
     *
     * @summary Get Clients
     * @throws FetchError<400, types.GetClientsResponse400> 400
     */
    getClients(metadata?: types.GetClientsMetadataParam): Promise<FetchResponse<200, types.GetClientsResponse200>>;
    /**
     * Create new client.
     *
     * @summary Create Client
     * @throws FetchError<400, types.CreateClientResponse400> 400
     */
    createClient(body?: types.CreateClientBodyParam, metadata?: types.CreateClientMetadataParam): Promise<FetchResponse<200, types.CreateClientResponse200>>;
    /**
     * Update existed client.
     *
     * @summary Update Client
     * @throws FetchError<400, types.UpdateClientResponse400> 400
     */
    updateClient(body?: types.UpdateClientBodyParam, metadata?: types.UpdateClientMetadataParam): Promise<FetchResponse<200, types.UpdateClientResponse200>>;
    /**
     * Returns a list of client custom fields.
     *
     * @summary Get Client Custom Fields
     * @throws FetchError<400, types.GetClientCustomFieldsResponse400> 400
     */
    getClientCustomFields(metadata?: types.GetClientCustomFieldsMetadataParam): Promise<FetchResponse<200, types.GetClientCustomFieldsResponse200>>;
    /**
     * Get company settings.
     *
     * @summary Get Company Settings
     * @throws FetchError<400, types.GetCompanySettingsResponse400> 400
     */
    getCompanySettings(): Promise<FetchResponse<200, types.GetCompanySettingsResponse200>>;
    /**
     * Get the list of company locations.
     *
     * @summary Get Locations
     * @throws FetchError<400, types.GetLocationsResponse400> 400
     */
    getLocations(): Promise<FetchResponse<200, types.GetLocationsResponse200>>;
    /**
     * Get the list of company employees.
     *
     * @summary Get Employees
     * @throws FetchError<400, types.GetEmployeesResponse400> 400
     */
    getEmployees(): Promise<FetchResponse<200, types.GetEmployeesResponse200>>;
    /**
     * Returns the list of company services.
     *
     * @summary Get Services
     * @throws FetchError<400, types.GetServicesResponse400> 400
     */
    getServices(): Promise<FetchResponse<200, types.GetServicesResponse200>>;
    /**
     * Returns the list of company directories.
     *
     * @summary Get Directories
     * @throws FetchError<400, types.GetDirectoriesResponse400> 400
     */
    getDirectories(): Promise<FetchResponse<200, types.GetDirectoriesResponse200>>;
    /**
     * Returns the list of directory items.
     *
     * @summary Get Directory Items
     * @throws FetchError<400, types.GetDirectoryItemsResponse400> 400
     */
    getDirectoryItems(metadata: types.GetDirectoryItemsMetadataParam): Promise<FetchResponse<200, types.GetDirectoryItemsResponse200>>;
    /**
     * Returns the list of your company prices.
     *
     * @summary Get Prices
     * @throws FetchError<400, types.GetPricesResponse400> 400
     */
    getPrices(): Promise<FetchResponse<200, types.GetPricesResponse200>>;
    /**
     * Returns the list of goods warehouses.
     *
     * @summary Get Warehouses
     * @throws FetchError<400, types.GetWarehousesResponse400> 400
     */
    getWarehouses(metadata?: types.GetWarehousesMetadataParam): Promise<FetchResponse<200, types.GetWarehousesResponse200>>;
    /**
     * Returns the list of all product categories.
     *
     * @summary Get Product Categories
     * @throws FetchError<400, types.GetProductCategoriesResponse400> 400
     */
    getProductCategories(): Promise<FetchResponse<200, types.GetProductCategoriesResponse200>>;
    /**
     * Returns the list of products and their stock balances for a given warehouse.
     *
     * @summary Get Stock
     * @throws FetchError<400, types.GetStockResponse400> 400
     */
    getStock(metadata: types.GetStockMetadataParam): Promise<FetchResponse<200, types.GetStockResponse200>>;
    /**
     * Returns list of products postings.
     *
     * @summary Get Postings
     * @throws FetchError<400, types.GetPostingsResponse400> 400
     */
    getPostings(metadata?: types.GetPostingsMetadataParam): Promise<FetchResponse<200, types.GetPostingsResponse200>>;
    /**
     * This resource is used to create a posting of products.
     *
     * @summary Create Posting
     * @throws FetchError<400, types.CreatePostingResponse400> 400
     */
    createPosting(body: types.CreatePostingBodyParam): Promise<FetchResponse<200, types.CreatePostingResponse200>>;
    /**
     * Retrieve serial numbers of products and a list of bins they are located in.
     *
     * @summary Get Product Serial Numbers
     * @throws FetchError<400, types.GetProductSerialNumbersResponse400> 400
     */
    getProductSerialNumbers(metadata: types.GetProductSerialNumbersMetadataParam): Promise<FetchResponse<200, types.GetProductSerialNumbersResponse200>>;
    /**
     * Returns the list warehouse bins.
     *
     * @summary Get Warehouse Bins
     * @throws FetchError<400, types.GetWarehouseBinsResponse400> 400
     */
    getWarehouseBins(metadata: types.GetWarehouseBinsMetadataParam): Promise<FetchResponse<200, types.GetWarehouseBinsResponse200>>;
    /**
     * Returns list of transfers.
     *
     * @summary Get Transfers
     * @throws FetchError<400, types.GetTransfersResponse400> 400
     */
    getTransfers(metadata: types.GetTransfersMetadataParam): Promise<FetchResponse<200, types.GetTransfersResponse200>>;
    /**
     * Create transfer of products between warehouses/bins
     *
     * @summary Create Transfer
     * @throws FetchError<400, types.CreateTransferResponse400> 400
     */
    createTransfer(body: types.CreateTransferBodyParam): Promise<FetchResponse<200, types.CreateTransferResponse200>>;
    /**
     * Returns list of write-offs.
     *
     * @summary Get Write-Offs
     * @throws FetchError<400, types.GetWriteOffsResponse400> 400
     */
    getWriteOffs(metadata: types.GetWriteOffsMetadataParam): Promise<FetchResponse<200, types.GetWriteOffsResponse200>>;
    /**
     * This resource is used to create a write-off transaction of products.
     *
     * @summary Create Write-off
     * @throws FetchError<400, types.CreateWriteOffResponse400> 400
     */
    createWriteOff(body: types.CreateWriteOffBodyParam): Promise<FetchResponse<200, types.CreateWriteOffResponse200>>;
    /**
     * Get Estimate Statuses
     *
     * @throws FetchError<400, types.GetEstimateStatusesResponse400> 400
     */
    getEstimateStatuses(): Promise<FetchResponse<200, types.GetEstimateStatusesResponse200>>;
    /**
     * Get the list of order statuses.
     *
     * @summary Get Order Statuses *
     * @throws FetchError<400, types.GetOrderStatusesCopyResponse400> 400
     */
    getOrderStatusesCopy(): Promise<FetchResponse<200, types.GetOrderStatusesCopyResponse200>>;
    /**
     * Returns the list of products and their stock balances for a given warehouse.
     *
     * @summary Get Stock *
     * @throws FetchError<400, types.GetStockCopyResponse400> 400
     */
    getStockCopy(metadata: types.GetStockCopyMetadataParam): Promise<FetchResponse<200, types.GetStockCopyResponse200>>;
    /**
     * Returns the list of company services.
     *
     * @summary Get Services *
     * @throws FetchError<400, types.GetServicesCopy1Response400> 400
     */
    getServicesCopy1(metadata?: types.GetServicesCopy1MetadataParam): Promise<FetchResponse<200, types.GetServicesCopy1Response200>>;
    /**
     * Get the list of estimates.
     *
     * @summary Get Estimates
     * @throws FetchError<400, types.GetOrdersCopy2Response400> 400
     */
    getOrdersCopy2(metadata?: types.GetOrdersCopy2MetadataParam): Promise<FetchResponse<200, types.GetOrdersCopy2Response200>>;
    /**
     * Get Estimate Goods and Services
     *
     * @throws FetchError<400, types.AddGoodsAndServicesResponse400> 400
     */
    addGoodsAndServices(metadata: types.AddGoodsAndServicesMetadataParam): Promise<FetchResponse<200, types.AddGoodsAndServicesResponse200>>;
    /**
     * Create Estimate Item
     *
     * @throws FetchError<400, types.GetEstimateGoodsAndServicesCopyResponse400> 400
     */
    getEstimateGoodsAndServicesCopy(body: types.GetEstimateGoodsAndServicesCopyBodyParam, metadata: types.GetEstimateGoodsAndServicesCopyMetadataParam): Promise<FetchResponse<200, types.GetEstimateGoodsAndServicesCopyResponse200>>;
    getEstimateGoodsAndServicesCopy(metadata: types.GetEstimateGoodsAndServicesCopyMetadataParam): Promise<FetchResponse<200, types.GetEstimateGoodsAndServicesCopyResponse200>>;
    /**
     * Returns the list of your company units of measurement.
     *
     * @summary Get Units of measurement
     * @throws FetchError<400, types.GetUnitsOfMeasurementResponse400> 400
     */
    getUnitsOfMeasurement(): Promise<FetchResponse<200, types.GetUnitsOfMeasurementResponse200>>;
    /**
     * Get cashflow items
     *
     * @throws FetchError<400, types.GetCashflowItemsResponse400> 400
     */
    getCashflowItems(metadata: types.GetCashflowItemsMetadataParam): Promise<FetchResponse<200, types.GetCashflowItemsResponse200>>;
    /**
     * Create Payment
     *
     * @throws FetchError<400, types.CreatePaymentResponse400> 400
     */
    createPayment(body: types.CreatePaymentBodyParam, metadata: types.CreatePaymentMetadataParam): Promise<FetchResponse<200, types.CreatePaymentResponse200>>;
    /**
     * Get the list of cashbox payments.
     *
     * @summary Get Cashflow Items
     * @throws FetchError<400, types.GetCashflowitemsResponse400> 400
     */
    getCashflowitems(): Promise<FetchResponse<200, types.GetCashflowitemsResponse200>>;
    /**
     * Get the list of Assets.
     *
     * @summary Get Assets
     * @throws FetchError<400, types.GetAssetsResponse400> 400
     */
    getAssets(metadata?: types.GetAssetsMetadataParam): Promise<FetchResponse<200, types.GetAssetsResponse200>>;
    /**
     * Use this method to create new Assets.
     *
     * @summary Create Asset
     * @throws FetchError<400, types.CreateAssetResponse400> 400
     */
    createAsset(body: types.CreateAssetBodyParam, metadata?: types.CreateAssetMetadataParam): Promise<FetchResponse<200, types.CreateAssetResponse200>>;
    /**
     * Use this method to get information about a specific Asset by its ID.
     *
     * @summary Get Asset by ID
     * @throws FetchError<400, types.GetAssetByIdResponse400> 400
     */
    getAssetById(metadata: types.GetAssetByIdMetadataParam): Promise<FetchResponse<200, types.GetAssetByIdResponse200>>;
    /**
     * Use this method to update Assets.
     *
     * @summary Update Asset
     * @throws FetchError<400, types.UpdateAssetResponse400> 400
     */
    updateAsset(body: types.UpdateAssetBodyParam, metadata: types.UpdateAssetMetadataParam): Promise<FetchResponse<200, types.UpdateAssetResponse200>>;
    updateAsset(metadata: types.UpdateAssetMetadataParam): Promise<FetchResponse<200, types.UpdateAssetResponse200>>;
    /**
     * Use this method to get the ​​custom fields of assets.
     *
     * @summary Get Asset Custom Fields
     * @throws FetchError<400, types.GetAssetCustomFieldsResponse400> 400
     */
    getAssetCustomFields(): Promise<FetchResponse<200, types.GetAssetCustomFieldsResponse200>>;
    /**
     * Move Asset
     *
     * @throws FetchError<400, types.MoveAssetResponse400> 400
     */
    moveAsset(body: types.MoveAssetBodyParam, metadata: types.MoveAssetMetadataParam): Promise<FetchResponse<200, types.MoveAssetResponse200>>;
    moveAsset(metadata: types.MoveAssetMetadataParam): Promise<FetchResponse<200, types.MoveAssetResponse200>>;
    /**
     * Use this method to get the values ​​of assets groups-brands-models-modifications
     * directories.
     *
     * @summary Get Directories of Assets
     * @throws FetchError<400, types.GetDirectoriesOfAssetsResponse400> 400
     */
    getDirectoriesOfAssets(metadata?: types.GetDirectoriesOfAssetsMetadataParam): Promise<FetchResponse<200, types.GetDirectoriesOfAssetsResponse200>>;
    /**
     * Get the list of clients by its ID.
     *
     * @summary Get Client by ID
     * @throws FetchError<400, types.GetClientsByIdResponse400> 400
     */
    getClientsById(metadata: types.GetClientsByIdMetadataParam): Promise<FetchResponse<200, types.GetClientsByIdResponse200>>;
    /**
     * Merge existed clients.
     *
     * @summary Merge Clients
     * @throws FetchError<400, types.MergeClientsResponse400> 400
     */
    mergeClients(body: types.MergeClientsBodyParam): Promise<FetchResponse<200, types.MergeClientsResponse200>>;
    /**
     * Use this method to get information about a specific Order by its ID.
     *
     * @summary Get Order by ID
     * @throws FetchError<400, types.GetOrderByIdResponse400> 400
     */
    getOrderById(metadata: types.GetOrderByIdMetadataParam): Promise<FetchResponse<200, types.GetOrderByIdResponse200>>;
    /**
     * Returns the list of company Products.
     *
     * @summary Get Products
     * @throws FetchError<400, types.GetProductsResponse400> 400
     */
    getProducts(metadata?: types.GetProductsMetadataParam): Promise<FetchResponse<200, types.GetProductsResponse200>>;
    /**
     * Create new Product.
     *
     * @summary Create Product
     * @throws FetchError<400, types.CreateProductResponse400> 400
     */
    createProduct(body: types.CreateProductBodyParam, metadata?: types.CreateProductMetadataParam): Promise<FetchResponse<200, types.CreateProductResponse200>>;
    /**
     * Returns the Product information by its ID.
     *
     * @summary Get Product by ID
     * @throws FetchError<400, types.GetProductByIdResponse400> 400
     */
    getProductById(metadata: types.GetProductByIdMetadataParam): Promise<FetchResponse<200, types.GetProductByIdResponse200>>;
    /**
     * Update existed product.
     *
     * @summary Update Product
     * @throws FetchError<400, types.UpdateProductResponse400> 400
     */
    updateProduct(body: types.UpdateProductBodyParam, metadata: types.UpdateProductMetadataParam): Promise<FetchResponse<200, types.UpdateProductResponse200>>;
    /**
     * Returns the list of company Services.
     *
     * @summary Get Services
     * @throws FetchError<400, types.GetServiceResponse400> 400
     */
    getService(metadata?: types.GetServiceMetadataParam): Promise<FetchResponse<200, types.GetServiceResponse200>>;
    /**
     * Create new Service.
     *
     * @summary Create Service
     * @throws FetchError<400, types.CreateServiceResponse400> 400
     */
    createService(body: types.CreateServiceBodyParam): Promise<FetchResponse<200, types.CreateServiceResponse200>>;
    /**
     * Returns the list of all service categories.
     *
     * @summary Get Service Categories
     * @throws FetchError<400, types.GetServiceCategoriesResponse400> 400
     */
    getServiceCategories(): Promise<FetchResponse<200, types.GetServiceCategoriesResponse200>>;
    /**
     * Returns the Service information by its ID.
     *
     * @summary Get Service by ID
     * @throws FetchError<400, types.GetServiceByIdResponse400> 400
     */
    getServiceById(metadata: types.GetServiceByIdMetadataParam): Promise<FetchResponse<200, types.GetServiceByIdResponse200>>;
    /**
     * Create new Service.
     *
     * @summary Update Service
     * @throws FetchError<400, types.UpdateServiceResponse400> 400
     */
    updateService(body: types.UpdateServiceBodyParam, metadata: types.UpdateServiceMetadataParam): Promise<FetchResponse<200, types.UpdateServiceResponse200>>;
    updateService(metadata: types.UpdateServiceMetadataParam): Promise<FetchResponse<200, types.UpdateServiceResponse200>>;
    /**
     * Get Tasks
     *
     * @throws FetchError<400, types.GetTasksResponse400> 400
     */
    getTasks(metadata?: types.GetTasksMetadataParam): Promise<FetchResponse<200, types.GetTasksResponse200>>;
    /**
     * Create Task
     *
     * @throws FetchError<400, types.CreateTasksResponse400> 400
     */
    createTasks(body: types.CreateTasksBodyParam): Promise<FetchResponse<200, types.CreateTasksResponse200>>;
    /**
     * Get Task by ID
     *
     * @throws FetchError<400, types.GetTasksByIdResponse400> 400
     */
    getTasksById(metadata: types.GetTasksByIdMetadataParam): Promise<FetchResponse<200, types.GetTasksByIdResponse200>>;
    /**
     * Update Task
     *
     * @throws FetchError<400, types.UpdateTaskResponse400> 400
     */
    updateTask(body: types.UpdateTaskBodyParam, metadata: types.UpdateTaskMetadataParam): Promise<FetchResponse<200, types.UpdateTaskResponse200>>;
    /**
     * Close Task
     *
     * @throws FetchError<400, types.CloseTaskResponse400> 400
     */
    closeTask(metadata: types.CloseTaskMetadataParam): Promise<FetchResponse<200, types.CloseTaskResponse200>>;
    /**
     * Reopen Task
     *
     * @throws FetchError<400, types.ReopenTaskResponse400> 400
     */
    reopenTask(metadata: types.ReopenTaskMetadataParam): Promise<FetchResponse<200, types.ReopenTaskResponse200>>;
    /**
     * Create Comment on Task
     *
     * @throws FetchError<400, types.CommentOnTaskResponse400> 400
     */
    commentOnTask(body: types.CommentOnTaskBodyParam, metadata: types.CommentOnTaskMetadataParam): Promise<FetchResponse<200, types.CommentOnTaskResponse200>>;
    /**
     * Create Comment on Lead
     *
     * @throws FetchError<400, types.CreateCommentOnLeadResponse400> 400
     */
    createCommentOnLead(body: types.CreateCommentOnLeadBodyParam, metadata: types.CreateCommentOnLeadMetadataParam): Promise<FetchResponse<200, types.CreateCommentOnLeadResponse200>>;
    /**
     * Create Comment on Client
     *
     * @throws FetchError<400, types.CreateCommentOnClientResponse400> 400
     */
    createCommentOnClient(body: types.CreateCommentOnClientBodyParam, metadata: types.CreateCommentOnClientMetadataParam): Promise<FetchResponse<200, types.CreateCommentOnClientResponse200>>;
    /**
     * Create Comment on Order
     *
     * @throws FetchError<400, types.CreateCommentOnOrderResponse400> 400
     */
    createCommentOnOrder(body: types.CreateCommentOnOrderBodyParam, metadata: types.CreateCommentOnOrderMetadataParam): Promise<FetchResponse<200, types.CreateCommentOnOrderResponse200>>;
    /**
     * Returns a list of existing bundles.
     *
     * @summary Get Bundles
     * @throws FetchError<400, types.GetBundlesResponse400> 400
     */
    getBundles(): Promise<FetchResponse<200, types.GetBundlesResponse200>>;
    /**
     * Returns a list of entities within a particular bundle. If price of the entity is
     * default, it won't be returned in the response. If a different price is chosen, in case
     * it's of one of the existing price types, "price_id" field will be returned with a unique
     * identifier, and in case it was manually adjusted "custom_price" field will be returned.
     *
     * @summary Get Bundle Entities
     * @throws FetchError<400, types.GetBundleEntitiesResponse400> 400
     */
    getBundleEntities(metadata: types.GetBundleEntitiesMetadataParam): Promise<FetchResponse<200, types.GetBundleEntitiesResponse200>>;
    /**
     * Returns public URL for the particular order.
     *
     * @summary Get Order Public URL
     * @throws FetchError<400, types.GetOrderPublicUrlResponse400> 400
     */
    getOrderPublicUrl(metadata: types.GetOrderPublicUrlMetadataParam): Promise<FetchResponse<200, types.GetOrderPublicUrlResponse200>>;
}
declare const createSDK: SDK;
export = createSDK;
