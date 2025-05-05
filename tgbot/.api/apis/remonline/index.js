"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var oas_1 = __importDefault(require("oas"));
var core_1 = __importDefault(require("api/dist/core"));
var openapi_json_1 = __importDefault(require("./openapi.json"));
var SDK = /** @class */ (function () {
    function SDK() {
        this.spec = oas_1.default.init(openapi_json_1.default);
        this.core = new core_1.default(this.spec, 'remonline/1.0 (api/6.1.2)');
    }
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    SDK.prototype.config = function (config) {
        this.core.setConfig(config);
    };
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
    SDK.prototype.auth = function () {
        var _a;
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        (_a = this.core).setAuth.apply(_a, values);
        return this;
    };
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
    SDK.prototype.server = function (url, variables) {
        if (variables === void 0) { variables = {}; }
        this.core.setServer(url, variables);
    };
    /**
     * Method to obtain an authentication token.
     *
     * @summary Authentication
     * @throws FetchError<401, types.AuthenticationResponse401> 401
     */
    SDK.prototype.authentication = function (body) {
        return this.core.fetch('/token/new', 'post', body);
    };
    /**
     * Get the list of leads.
     *
     * @summary Get Leads
     * @throws FetchError<400, types.GetLeadsResponse400> 400
     */
    SDK.prototype.getLeads = function (metadata) {
        return this.core.fetch('/lead/', 'get', metadata);
    };
    /**
     * Create new Lead. Parameters client_id or contact_phone + contact_name are required.
     *
     * @summary Create Lead
     * @throws FetchError<400, types.CreateLeadResponse400> 400
     */
    SDK.prototype.createLead = function (body, metadata) {
        return this.core.fetch('/lead/', 'post', body, metadata);
    };
    /**
     * Update existed lead.
     *
     * @summary Update Lead
     * @throws FetchError<400, types.UpdateLeadResponse400> 400
     */
    SDK.prototype.updateLead = function (body, metadata) {
        return this.core.fetch('/lead/', 'put', body, metadata);
    };
    /**
     * Get the list of lead types.
     *
     * @summary Get Lead Types
     * @throws FetchError<400, types.GetLeadTypesResponse400> 400
     */
    SDK.prototype.getLeadTypes = function () {
        return this.core.fetch('/lead/types/', 'get');
    };
    /**
     * Returns a list of lead statuses.
     *
     * @summary Get Lead Statuses
     * @throws FetchError<400, types.GetLeadStatusesResponse400> 400
     */
    SDK.prototype.getLeadStatuses = function () {
        return this.core.fetch('/statuses/leads/', 'get');
    };
    /**
     * Change a status of the lead.
     *
     * @summary Change Lead Status
     * @throws FetchError<400, types.ChangeLeadStatusResponse400> 400
     */
    SDK.prototype.changeLeadStatus = function (body) {
        return this.core.fetch('/lead/status/', 'post', body);
    };
    /**
     * Returns a list of lead custom fields.
     *
     * @summary Get Lead Custom Fields
     * @throws FetchError<400, types.GetLeadCustomFieldsResponse400> 400
     */
    SDK.prototype.getLeadCustomFields = function (metadata) {
        return this.core.fetch('/lead/custom-fields/', 'get', metadata);
    };
    /**
     * Returns a list of order custom fields.
     *
     * @summary Get Order Custom Fields
     * @throws FetchError<400, types.GetOrderCustomFieldsResponse400> 400
     */
    SDK.prototype.getOrderCustomFields = function (metadata) {
        return this.core.fetch('/order/custom-fields/', 'get', metadata);
    };
    /**
     * Get the list of lead types.
     *
     * @summary Get Order Types
     * @throws FetchError<400, types.GetOrderTypesResponse400> 400
     */
    SDK.prototype.getOrderTypes = function () {
        return this.core.fetch('/order/types/', 'get');
    };
    /**
     * Get the list of orders.
     *
     * @summary Get Orders
     * @throws FetchError<400, types.GetOrdersResponse400> 400
     */
    SDK.prototype.getOrders = function (metadata) {
        return this.core.fetch('/order/', 'get', metadata);
    };
    /**
     * Create new order.
     *
     * @summary Create Order
     * @throws FetchError<400, types.CreateOrderResponse400> 400
     */
    SDK.prototype.createOrder = function (body) {
        return this.core.fetch('/order/', 'post', body);
    };
    /**
     * Change a status of the order.
     *
     * @summary Change Order Status
     * @throws FetchError<400, types.ChangeOrderStatusResponse400> 400
     */
    SDK.prototype.changeOrderStatus = function (body) {
        return this.core.fetch('/order/status/', 'post', body);
    };
    /**
     * Get the list of order statuses.
     *
     * @summary Get Order Statuses
     * @throws FetchError<400, types.GetOrderStatusesResponse400> 400
     */
    SDK.prototype.getOrderStatuses = function () {
        return this.core.fetch('/statuses/', 'get');
    };
    /**
     * Returns the list of company sales.
     *
     * @summary Get Sales
     * @throws FetchError<400, types.GetSalesResponse400> 400
     */
    SDK.prototype.getSales = function (metadata) {
        return this.core.fetch('/retail/sales/', 'get', metadata);
    };
    /**
     * Get the list of cashboxes.
     *
     * @summary Get Cashboxes
     * @throws FetchError<400, types.GetCashboxesResponse400> 400
     */
    SDK.prototype.getCashboxes = function () {
        return this.core.fetch('/cashbox/', 'get');
    };
    /**
     * Get the list of cashbox payments.
     *
     * @summary Get Cashbox Transactions
     * @throws FetchError<400, types.GetCashboxTransactionsResponse400> 400
     */
    SDK.prototype.getCashboxTransactions = function (metadata) {
        return this.core.fetch('/cashbox/report/{cashbox_id}', 'get', metadata);
    };
    /**
     * Get the list of invoices.
     *
     * @summary Get Invoices
     * @throws FetchError<400, types.GetInvoicesResponse400> 400
     */
    SDK.prototype.getInvoices = function (metadata) {
        return this.core.fetch('/invoice/', 'get', metadata);
    };
    /**
     * Get the list of ad campaigns.
     *
     * @summary Get Ad Campaigns
     * @throws FetchError<400, types.GetAdCampaignsResponse400> 400
     */
    SDK.prototype.getAdCampaigns = function () {
        return this.core.fetch('/marketing/campaigns/', 'get');
    };
    /**
     * Get the list of clients.
     *
     * @summary Get Clients
     * @throws FetchError<400, types.GetClientsResponse400> 400
     */
    SDK.prototype.getClients = function (metadata) {
        return this.core.fetch('/clients/', 'get', metadata);
    };
    /**
     * Create new client.
     *
     * @summary Create Client
     * @throws FetchError<400, types.CreateClientResponse400> 400
     */
    SDK.prototype.createClient = function (body, metadata) {
        return this.core.fetch('/clients/', 'post', body, metadata);
    };
    /**
     * Update existed client.
     *
     * @summary Update Client
     * @throws FetchError<400, types.UpdateClientResponse400> 400
     */
    SDK.prototype.updateClient = function (body, metadata) {
        return this.core.fetch('/clients/', 'put', body, metadata);
    };
    /**
     * Returns a list of client custom fields.
     *
     * @summary Get Client Custom Fields
     * @throws FetchError<400, types.GetClientCustomFieldsResponse400> 400
     */
    SDK.prototype.getClientCustomFields = function (metadata) {
        return this.core.fetch('/clients/custom-fields/', 'get', metadata);
    };
    /**
     * Get company settings.
     *
     * @summary Get Company Settings
     * @throws FetchError<400, types.GetCompanySettingsResponse400> 400
     */
    SDK.prototype.getCompanySettings = function () {
        return this.core.fetch('/settings/company', 'get');
    };
    /**
     * Get the list of company locations.
     *
     * @summary Get Locations
     * @throws FetchError<400, types.GetLocationsResponse400> 400
     */
    SDK.prototype.getLocations = function () {
        return this.core.fetch('/branches/', 'get');
    };
    /**
     * Get the list of company employees.
     *
     * @summary Get Employees
     * @throws FetchError<400, types.GetEmployeesResponse400> 400
     */
    SDK.prototype.getEmployees = function () {
        return this.core.fetch('/employees/', 'get');
    };
    /**
     * Returns the list of company services.
     *
     * @summary Get Services
     * @throws FetchError<400, types.GetServicesResponse400> 400
     */
    SDK.prototype.getServices = function () {
        return this.core.fetch('/books/service-operations/', 'get');
    };
    /**
     * Returns the list of company directories.
     *
     * @summary Get Directories
     * @throws FetchError<400, types.GetDirectoriesResponse400> 400
     */
    SDK.prototype.getDirectories = function () {
        return this.core.fetch('/book/list/', 'get');
    };
    /**
     * Returns the list of directory items.
     *
     * @summary Get Directory Items
     * @throws FetchError<400, types.GetDirectoryItemsResponse400> 400
     */
    SDK.prototype.getDirectoryItems = function (metadata) {
        return this.core.fetch('/book-item/list/{book_id}', 'get', metadata);
    };
    /**
     * Returns the list of your company prices.
     *
     * @summary Get Prices
     * @throws FetchError<400, types.GetPricesResponse400> 400
     */
    SDK.prototype.getPrices = function () {
        return this.core.fetch('/margins/', 'get');
    };
    /**
     * Returns the list of goods warehouses.
     *
     * @summary Get Warehouses
     * @throws FetchError<400, types.GetWarehousesResponse400> 400
     */
    SDK.prototype.getWarehouses = function (metadata) {
        return this.core.fetch('/warehouse/', 'get', metadata);
    };
    /**
     * Returns the list of all product categories.
     *
     * @summary Get Product Categories
     * @throws FetchError<400, types.GetProductCategoriesResponse400> 400
     */
    SDK.prototype.getProductCategories = function () {
        return this.core.fetch('/warehouse/categories/', 'get');
    };
    /**
     * Returns the list of products and their stock balances for a given warehouse.
     *
     * @summary Get Stock
     * @throws FetchError<400, types.GetStockResponse400> 400
     */
    SDK.prototype.getStock = function (metadata) {
        return this.core.fetch('/warehouse/goods/{warehouse_id}', 'get', metadata);
    };
    /**
     * Returns list of products postings.
     *
     * @summary Get Postings
     * @throws FetchError<400, types.GetPostingsResponse400> 400
     */
    SDK.prototype.getPostings = function (metadata) {
        return this.core.fetch('/warehouse/postings/', 'get', metadata);
    };
    /**
     * This resource is used to create a posting of products.
     *
     * @summary Create Posting
     * @throws FetchError<400, types.CreatePostingResponse400> 400
     */
    SDK.prototype.createPosting = function (body) {
        return this.core.fetch('/warehouse/postings/', 'post', body);
    };
    /**
     * Retrieve serial numbers of products and a list of bins they are located in.
     *
     * @summary Get Product Serial Numbers
     * @throws FetchError<400, types.GetProductSerialNumbersResponse400> 400
     */
    SDK.prototype.getProductSerialNumbers = function (metadata) {
        return this.core.fetch('/warehouse/goods/{warehouse_id}/{good_id}', 'get', metadata);
    };
    /**
     * Returns the list warehouse bins.
     *
     * @summary Get Warehouse Bins
     * @throws FetchError<400, types.GetWarehouseBinsResponse400> 400
     */
    SDK.prototype.getWarehouseBins = function (metadata) {
        return this.core.fetch('/warehouse/{warehouse_id}/cells', 'get', metadata);
    };
    /**
     * Returns list of transfers.
     *
     * @summary Get Transfers
     * @throws FetchError<400, types.GetTransfersResponse400> 400
     */
    SDK.prototype.getTransfers = function (metadata) {
        return this.core.fetch('/warehouse/moves/', 'get', metadata);
    };
    /**
     * Create transfer of products between warehouses/bins
     *
     * @summary Create Transfer
     * @throws FetchError<400, types.CreateTransferResponse400> 400
     */
    SDK.prototype.createTransfer = function (body) {
        return this.core.fetch('/warehouse/moves/', 'post', body);
    };
    /**
     * Returns list of write-offs.
     *
     * @summary Get Write-Offs
     * @throws FetchError<400, types.GetWriteOffsResponse400> 400
     */
    SDK.prototype.getWriteOffs = function (metadata) {
        return this.core.fetch('/warehouse/outcome-transactions/', 'get', metadata);
    };
    /**
     * This resource is used to create a write-off transaction of products.
     *
     * @summary Create Write-off
     * @throws FetchError<400, types.CreateWriteOffResponse400> 400
     */
    SDK.prototype.createWriteOff = function (body) {
        return this.core.fetch('/warehouse/outcome-transactions/', 'post', body);
    };
    /**
     * Get Estimate Statuses
     *
     * @throws FetchError<400, types.GetEstimateStatusesResponse400> 400
     */
    SDK.prototype.getEstimateStatuses = function () {
        return this.core.fetch('/estimate/statuses/', 'get');
    };
    /**
     * Get the list of order statuses.
     *
     * @summary Get Order Statuses *
     * @throws FetchError<400, types.GetOrderStatusesCopyResponse400> 400
     */
    SDK.prototype.getOrderStatusesCopy = function () {
        return this.core.fetch('/statuses/orders/', 'get');
    };
    /**
     * Returns the list of products and their stock balances for a given warehouse.
     *
     * @summary Get Stock *
     * @throws FetchError<400, types.GetStockCopyResponse400> 400
     */
    SDK.prototype.getStockCopy = function (metadata) {
        return this.core.fetch('/warehouse/goods/{warehouse_id} (COPY)', 'get', metadata);
    };
    /**
     * Returns the list of company services.
     *
     * @summary Get Services *
     * @throws FetchError<400, types.GetServicesCopy1Response400> 400
     */
    SDK.prototype.getServicesCopy1 = function (metadata) {
        return this.core.fetch('/books/service-operations/ (COPY)', 'get', metadata);
    };
    /**
     * Get the list of estimates.
     *
     * @summary Get Estimates
     * @throws FetchError<400, types.GetOrdersCopy2Response400> 400
     */
    SDK.prototype.getOrdersCopy2 = function (metadata) {
        return this.core.fetch('/estimate/', 'get', metadata);
    };
    /**
     * Get Estimate Goods and Services
     *
     * @throws FetchError<400, types.AddGoodsAndServicesResponse400> 400
     */
    SDK.prototype.addGoodsAndServices = function (metadata) {
        return this.core.fetch('/estimate/{estimate_id}/items', 'get', metadata);
    };
    SDK.prototype.getEstimateGoodsAndServicesCopy = function (body, metadata) {
        return this.core.fetch('/estimate/{estimate_id}/items', 'post', body, metadata);
    };
    /**
     * Returns the list of your company units of measurement.
     *
     * @summary Get Units of measurement
     * @throws FetchError<400, types.GetUnitsOfMeasurementResponse400> 400
     */
    SDK.prototype.getUnitsOfMeasurement = function () {
        return this.core.fetch('/catalogs/uoms', 'get');
    };
    /**
     * Get cashflow items
     *
     * @throws FetchError<400, types.GetCashflowItemsResponse400> 400
     */
    SDK.prototype.getCashflowItems = function (metadata) {
        return this.core.fetch('/cashflowites/', 'get', metadata);
    };
    /**
     * Create Payment
     *
     * @throws FetchError<400, types.CreatePaymentResponse400> 400
     */
    SDK.prototype.createPayment = function (body, metadata) {
        return this.core.fetch('/cashbox/{cashbox_id}/payment', 'post', body, metadata);
    };
    /**
     * Get the list of cashbox payments.
     *
     * @summary Get Cashflow Items
     * @throws FetchError<400, types.GetCashflowitemsResponse400> 400
     */
    SDK.prototype.getCashflowitems = function () {
        return this.core.fetch('/cashflowitems', 'get');
    };
    /**
     * Get the list of Assets.
     *
     * @summary Get Assets
     * @throws FetchError<400, types.GetAssetsResponse400> 400
     */
    SDK.prototype.getAssets = function (metadata) {
        return this.core.fetch('/warehouse/assets', 'get', metadata);
    };
    /**
     * Use this method to create new Assets.
     *
     * @summary Create Asset
     * @throws FetchError<400, types.CreateAssetResponse400> 400
     */
    SDK.prototype.createAsset = function (body, metadata) {
        return this.core.fetch('/warehouse/assets', 'post', body, metadata);
    };
    /**
     * Use this method to get information about a specific Asset by its ID.
     *
     * @summary Get Asset by ID
     * @throws FetchError<400, types.GetAssetByIdResponse400> 400
     */
    SDK.prototype.getAssetById = function (metadata) {
        return this.core.fetch('/warehouse/assets/{asset_id}', 'get', metadata);
    };
    SDK.prototype.updateAsset = function (body, metadata) {
        return this.core.fetch('/warehouse/assets/{asset_id}', 'put', body, metadata);
    };
    /**
     * Use this method to get the ​​custom fields of assets.
     *
     * @summary Get Asset Custom Fields
     * @throws FetchError<400, types.GetAssetCustomFieldsResponse400> 400
     */
    SDK.prototype.getAssetCustomFields = function () {
        return this.core.fetch('/warehouse/assets/custom-fields/', 'get');
    };
    SDK.prototype.moveAsset = function (body, metadata) {
        return this.core.fetch('/warehouse/assets/{asset_id}/move', 'post', body, metadata);
    };
    /**
     * Use this method to get the values ​​of assets groups-brands-models-modifications
     * directories.
     *
     * @summary Get Directories of Assets
     * @throws FetchError<400, types.GetDirectoriesOfAssetsResponse400> 400
     */
    SDK.prototype.getDirectoriesOfAssets = function (metadata) {
        return this.core.fetch('/warehouse/assets/directories', 'get', metadata);
    };
    /**
     * Get the list of clients by its ID.
     *
     * @summary Get Client by ID
     * @throws FetchError<400, types.GetClientsByIdResponse400> 400
     */
    SDK.prototype.getClientsById = function (metadata) {
        return this.core.fetch('/clients/{client_id}', 'get', metadata);
    };
    /**
     * Merge existed clients.
     *
     * @summary Merge Clients
     * @throws FetchError<400, types.MergeClientsResponse400> 400
     */
    SDK.prototype.mergeClients = function (body) {
        return this.core.fetch('/clients/merge', 'post', body);
    };
    /**
     * Use this method to get information about a specific Order by its ID.
     *
     * @summary Get Order by ID
     * @throws FetchError<400, types.GetOrderByIdResponse400> 400
     */
    SDK.prototype.getOrderById = function (metadata) {
        return this.core.fetch('/order/{order_id}', 'get', metadata);
    };
    /**
     * Returns the list of company Products.
     *
     * @summary Get Products
     * @throws FetchError<400, types.GetProductsResponse400> 400
     */
    SDK.prototype.getProducts = function (metadata) {
        return this.core.fetch('/products/', 'get', metadata);
    };
    /**
     * Create new Product.
     *
     * @summary Create Product
     * @throws FetchError<400, types.CreateProductResponse400> 400
     */
    SDK.prototype.createProduct = function (body, metadata) {
        return this.core.fetch('/products/', 'post', body, metadata);
    };
    /**
     * Returns the Product information by its ID.
     *
     * @summary Get Product by ID
     * @throws FetchError<400, types.GetProductByIdResponse400> 400
     */
    SDK.prototype.getProductById = function (metadata) {
        return this.core.fetch('/products/{product_id}', 'get', metadata);
    };
    /**
     * Update existed product.
     *
     * @summary Update Product
     * @throws FetchError<400, types.UpdateProductResponse400> 400
     */
    SDK.prototype.updateProduct = function (body, metadata) {
        return this.core.fetch('/products/{product_id}', 'put', body, metadata);
    };
    /**
     * Returns the list of company Services.
     *
     * @summary Get Services
     * @throws FetchError<400, types.GetServiceResponse400> 400
     */
    SDK.prototype.getService = function (metadata) {
        return this.core.fetch('/services/', 'get', metadata);
    };
    /**
     * Create new Service.
     *
     * @summary Create Service
     * @throws FetchError<400, types.CreateServiceResponse400> 400
     */
    SDK.prototype.createService = function (body) {
        return this.core.fetch('/services/', 'post', body);
    };
    /**
     * Returns the list of all service categories.
     *
     * @summary Get Service Categories
     * @throws FetchError<400, types.GetServiceCategoriesResponse400> 400
     */
    SDK.prototype.getServiceCategories = function () {
        return this.core.fetch('/services/categories/', 'get');
    };
    /**
     * Returns the Service information by its ID.
     *
     * @summary Get Service by ID
     * @throws FetchError<400, types.GetServiceByIdResponse400> 400
     */
    SDK.prototype.getServiceById = function (metadata) {
        return this.core.fetch('/services/{service_id}', 'get', metadata);
    };
    SDK.prototype.updateService = function (body, metadata) {
        return this.core.fetch('/services/{service_id}', 'put', body, metadata);
    };
    /**
     * Get Tasks
     *
     * @throws FetchError<400, types.GetTasksResponse400> 400
     */
    SDK.prototype.getTasks = function (metadata) {
        return this.core.fetch('/tasks', 'get', metadata);
    };
    /**
     * Create Task
     *
     * @throws FetchError<400, types.CreateTasksResponse400> 400
     */
    SDK.prototype.createTasks = function (body) {
        return this.core.fetch('/tasks', 'post', body);
    };
    /**
     * Get Task by ID
     *
     * @throws FetchError<400, types.GetTasksByIdResponse400> 400
     */
    SDK.prototype.getTasksById = function (metadata) {
        return this.core.fetch('/tasks/{task_id}', 'get', metadata);
    };
    /**
     * Update Task
     *
     * @throws FetchError<400, types.UpdateTaskResponse400> 400
     */
    SDK.prototype.updateTask = function (body, metadata) {
        return this.core.fetch('/tasks/{task_id}', 'put', body, metadata);
    };
    /**
     * Close Task
     *
     * @throws FetchError<400, types.CloseTaskResponse400> 400
     */
    SDK.prototype.closeTask = function (metadata) {
        return this.core.fetch('/tasks/{task_id}/close', 'post', metadata);
    };
    /**
     * Reopen Task
     *
     * @throws FetchError<400, types.ReopenTaskResponse400> 400
     */
    SDK.prototype.reopenTask = function (metadata) {
        return this.core.fetch('/tasks/{task_id}/reopen', 'post', metadata);
    };
    /**
     * Create Comment on Task
     *
     * @throws FetchError<400, types.CommentOnTaskResponse400> 400
     */
    SDK.prototype.commentOnTask = function (body, metadata) {
        return this.core.fetch('/tasks/{task_id}/comments', 'post', body, metadata);
    };
    /**
     * Create Comment on Lead
     *
     * @throws FetchError<400, types.CreateCommentOnLeadResponse400> 400
     */
    SDK.prototype.createCommentOnLead = function (body, metadata) {
        return this.core.fetch('/lead/{lead_id}/comments', 'post', body, metadata);
    };
    /**
     * Create Comment on Client
     *
     * @throws FetchError<400, types.CreateCommentOnClientResponse400> 400
     */
    SDK.prototype.createCommentOnClient = function (body, metadata) {
        return this.core.fetch('/clients/{client_id}/comments', 'post', body, metadata);
    };
    /**
     * Create Comment on Order
     *
     * @throws FetchError<400, types.CreateCommentOnOrderResponse400> 400
     */
    SDK.prototype.createCommentOnOrder = function (body, metadata) {
        return this.core.fetch('/order/{order_id}/comments', 'post', body, metadata);
    };
    /**
     * Returns a list of existing bundles.
     *
     * @summary Get Bundles
     * @throws FetchError<400, types.GetBundlesResponse400> 400
     */
    SDK.prototype.getBundles = function () {
        return this.core.fetch('/bundles/', 'get');
    };
    /**
     * Returns a list of entities within a particular bundle. If price of the entity is
     * default, it won't be returned in the response. If a different price is chosen, in case
     * it's of one of the existing price types, "price_id" field will be returned with a unique
     * identifier, and in case it was manually adjusted "custom_price" field will be returned.
     *
     * @summary Get Bundle Entities
     * @throws FetchError<400, types.GetBundleEntitiesResponse400> 400
     */
    SDK.prototype.getBundleEntities = function (metadata) {
        return this.core.fetch('/bundles/{bundle_id}/entities/', 'get', metadata);
    };
    /**
     * Returns public URL for the particular order.
     *
     * @summary Get Order Public URL
     * @throws FetchError<400, types.GetOrderPublicUrlResponse400> 400
     */
    SDK.prototype.getOrderPublicUrl = function (metadata) {
        return this.core.fetch('/order/{order_id}/public-url', 'get', metadata);
    };
    return SDK;
}());
var createSDK = (function () { return new SDK(); })();
module.exports = createSDK;
