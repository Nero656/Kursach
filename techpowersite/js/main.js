let host = 'http://localhost/kursovaia/techpower/api/';


let f = async (method, url, body = null, bearerToken = null) => {

    let options = {
        method,
        headers: new Headers(),
    };

    if (bearerToken) {
        options.headers.append('Authorization', 'Bearer ' + bearerToken);
    }

    if (body) {
        options.headers.append('Content-Type', 'Application/json');
        options.body = JSON.stringify(body);
    }

    // Application/json

    const result = await fetch(host + url, options);
    return await result.json();
}


new Vue({
    el: "#shop",
    data: {
        max: 12,
        min: 3,
        confirmCategoryDeleteForm: false,
        confirmProductDeleteForm: false,
        confirmOrderDeleteForm: false,
        purchasesOfAllUsers: false,
        editProductInput: false,
        addProductInput: false,
        addProductForm: false,
        userProfileEdit: false,
        cardForm: false,
        orderList: false,
        historyList: false,
        profileForm: false,
        registerForm: false,
        authForm: false,
        error: false,
        errorLogin:false,
        errorEmail: false,
        isAuth: 'false',
        noAuth: false,
        productList: false,
        productPage: false,
        dropDownUser: false,
        dropDownCategory: false,
        addCategoryForm: false,
        editCategoryForm: false,
        randomProducts: true,
        userTable: false,
        categoryIndex: true,
        categoryId: 1,
        orderId: 0,
        categoryIdDel: null,
        token: '',
        query: '',
        userBay: '',
        reg: {
            name: "",
            login: "",
            email: "",
            password: "",
        },
        auth: {
            login: "",
            password: "",
        },
        user: [],
        users: [],
        userChanges: [],
        category: [],
        product: [],
        productIndex: {photo_url: null,},
        order: {},
        orderRequest: {},
        addProduct: {
            title: '',
            description: '',
            price: null,
            photo_url: null,
        },
        editProduct: {
            title: '',
            description: '',
            price: null,
            photo_url: null,
        },
        categoryName: {'name': ''},
        card: {},
        picture_create: null,
        categoryProductId: null,
        price: 0,
        bayId: null,
    },
    async mounted() {

        if (localStorage.isAuth) this.isAuth = localStorage.isAuth;
        if (localStorage.token) this.token = localStorage.token;

        if (localStorage.getItem('user')) {
            try {
                this.user = JSON.parse(localStorage.getItem('user'));
            } catch (e) {
                localStorage.removeItem('user');
            }
        }
    },
    methods: {
        regVoid: function () {
            this.registerForm = !this.registerForm;
            this.authForm = false
        },

        mainVoid: function () {
            if (this.categoryIndex !== true) {
                this.categoryIndex = !this.categoryIndex;
                this.product = [];
                this.productPage = false;
            }
        },

        authVoid: function () {
            this.authForm = !this.authForm;
            this.registerForm = false
        },

        async userTableVoid() {
            this.product = [];
            this.userTable = !this.userTable;
            this.users = await f('get', 'users');
        },

        userProfileEditVoid: function () {
            this.userProfileEdit = !this.userProfileEdit;
        },

        dropDownCategoryVoid: function () {
            this.dropDownCategory = !this.dropDownCategory;
        },

        dropDownUserVoid: function () {
            this.dropDownUser = !this.dropDownUser;
        },

        async addCategoryVoid() {
            this.addCategoryForm = !this.addCategoryForm;
        },

        async editCategoryVoid(id) {
            this.editCategoryForm = !this.editCategoryForm;
            this.categoryIdDel = id;
            this.categoryIndex = !this.categoryIndex;
            this.product = [];
        },

        addProductFormVoid: function () {
            this.addProductForm = !this.addProductForm;
        },

        editProductFormVoid: function () {
            this.editProductInput = !this.editProductInput;
            this.editProduct.title = this.productIndex.title;
            this.editProduct.price = this.productIndex.price;
            this.editProduct.description = this.productIndex.description;
        },

        addProductInputVoid: function (id) {
            this.addProductForm = !this.addProductForm;
            this.addProductInput = !this.addProductInput;
            this.categoryId = id;
        },

        bayForm: function (itemId, orderId) {
            this.cardForm = !this.cardForm;
            this.bayId = itemId;
            this.orderList = !this.orderList;
            this.orderId = orderId;
        },

        bayNoAuthForm: function () {
            this.noAuth = !this.noAuth;
        },

        bayNoAuth: function () {
            this.noAuth = !this.noAuth;
            alert('проверте почту' + this.reg.email);
        },

        productPageVoid: function (id, img, title, description, price) {
            this.productIndex.id = id;
            this.productIndex.price = price;
            this.productIndex.title = title;
            this.productIndex.description = description;
            this.productIndex.photo_url = img;
            this.productList = false;
            this.productPage = !this.productPage;
        },

        confirmCategoryDeleteVoid: function (id) {
            this.confirmCategoryDeleteForm = !this.confirmCategoryDeleteForm;
            this.categoryIdDel = id;
            this.categoryIndex = !this.categoryIndex;
            this.product = [];
        },

        confirmProductDeleteVoid: function (id) {
            this.confirmProductDeleteForm = !this.confirmProductDeleteForm;
            this.categoryIdDel = id;
            this.productPage = false;
            this.product = [];
            this.categoryIndex = true;
        },

        confirmOrderDeleteVoid: function (id) {
            this.confirmOrderDeleteForm = !this.confirmOrderDeleteForm;
            this.orderList = !this.orderList;
            this.orderId = id;
            this.productPage = false;
        },

        async registerAction() {
            if (!this.reg.name || !this.reg.login || !this.reg.email || !this.reg.password) {
                this.error = true;
            } else {
                this.error = false;
                let result = await f('post', 'users', this.reg);
                console.log(result.login);
                if (this.reg.login === result.login) {
                    console.log(result.login);
                    let auth = await f('post', 'login', this.reg);

                    this.token = auth.token;
                    this.user = await f('get', 'user', '', this.token);
                    this.isAuth = 'true';
                    this.user.role = btoa(this.user.role);
                    localStorage.isAuth = this.isAuth;
                    localStorage.token = this.token;
                    this.saveItems();

                    this.registerForm = false;
                }else{
                    this.errorLogin = true;
                }
            }
        },

        async authAction() {
            if (!this.auth.login || !this.auth.password) {
                this.error = true;
            } else {
                let result = await f('post', 'login', this.auth);
                if (!result.message) {
                    this.token = result.token;
                    this.user = await f('get', 'user', '', this.token);
                    this.isAuth = 'true';
                    this.user.role = btoa(this.user.role);
                    localStorage.isAuth = this.isAuth;
                    localStorage.token = this.token;
                    this.saveItems();
                    this.authForm = !this.authForm;
                } else {
                    this.errorEmail = true;
                }
            }
        },

        async getUser() {
            this.profileForm = !this.profileForm;
            this.user = await f('get', 'user', '', this.token);
            this.user.role = btoa(this.user.role);
            this.saveItems();
        },

        async userProfileEditAction(id,name,login,email,password) {

            let user = new FormData;

            if(login !== this.user.login) {
                if (!name) {
                } else {
                    user.append('name', name);
                }
                if (!login) {

                } else {
                    user.append('login', login);
                }

                if (!email) {

                } else {
                    user.append('email', email);
                }

                if (!password) {

                } else {
                    user.append('password', password);
                }
                axios({
                    method: 'post',
                    url: host + 'user/'+id+'?_method=patch',
                    data: user,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.token
                    },
                })

                this.user = await f('get', 'user', '', this.token);
                this.user.role = btoa(this.user.role);
                this.saveItems();
                this.profileForm = !this.profileForm;
                this.userProfileEdit = !this.userProfileEdit;
            }else {
                this.error = !this.error;
            }

            //let userEdit = await f('patch', 'user/' + id + '?_method=patch', user, this.token);


        },

        async userEdit(id, name, role) {
            this.userChanges = {'name': name, 'role': role};
            let userEdit = await f('patch', 'user/' + id + '?_method=patch', this.userChanges, this.token);
        },

        async exitAction() {
            let result = await f('post', 'logout', '', this.token);
            this.isAuth = 'false';
            this.user = [];
            localStorage.isAuth = this.isAuth;
            localStorage.token = null;
            localStorage.removeItem('user');
        },

        async categoryAction(id) {
            this.categoryIndex = false;
            this.productList = true;
            this.productPage = false;
            this.categoryProductId = id;
            this.product = await f('get', 'category/' + id + '/products/');
        },

        async addCategoryAction() {
            if (!this.categoryName) {
                this.error = true;
            } else {
                this.error = false;
                let category = await f('post', 'category/store', this.categoryName, this.token);
                this.addCategoryForm = false;
                this.category = await f('get', 'category');
            }
        },

        async editCategoryAction() {
            if (!this.categoryName) {
                this.error = true;
            } else {
                this.error = false;
                this.category = await f('post', 'category/update/' + this.categoryIdDel + '?_method=patch', this.reg, this.token);
                this.editCategoryForm = !this.editCategoryForm;
                this.category = await f('get', 'category');
            }
        },

        async destroyCategory(id) {
            let del = f('delete', 'category/destroy/' + id, '', this.token);
            this.confirmCategoryDeleteForm = !this.confirmCategoryDeleteForm;
            this.category = await f('get', 'category');
            this.categoryIndex = true;
        },

        async addOrderList(user_id, product_id) {
            this.orderRequest = {user_id, product_id};
            let orderRequest = await f('post', 'basket/store', this.orderRequest, this.token);
            this.orderList = !this.orderList;
        },


        async addOrderBay(user_id) {
            if (!this.card.number || !this.card.fio || !this.card.cvc || !this.card.dataM || !this.card.dataY) {
                this.error = true;
            } else {
                this.error = false;
                let status = 'купленно';
                let product_id = this.bayId;
                this.orderRequest = {user_id, product_id, status};
                let orderRequest = await f('post', 'basket/bay/' + this.orderId + '?_method=patch', this.orderRequest, this.token);
                this.cardForm = !this.cardForm;
                this.order = await f('get', 'basket', '', this.token);
                this.historyList = !this.historyList;
            }
        },

        async getOrderList() {
            this.orderList = !this.orderList;
            this.order = await f('get', 'basket', '', this.token);
        },

        async getHistoryList() {
            this.historyList = !this.historyList;
            this.order = await f('get', 'basket', '', this.token);
        },

        async getPurchasesOfAllUsersList() {
            this.purchasesOfAllUsers = !this.purchasesOfAllUsers;
            this.order = await f('get', 'basket', '', this.token);
        },

        async destroyOrder(id) {
            this.order = await f('delete', 'basket/destroy/' + id, '', this.token);
            this.confirmOrderDeleteForm = !this.confirmOrderDeleteForm;
            this.orderList = !this.orderList;
        },

        async destroyProduct(categoryId, productId) {
            console.log(categoryId, productId);
            let del = f('delete', 'category/' + categoryId + '/products/destroy/' + productId, '', this.token)
            this.category = await f('get', 'category');
            this.confirmProductDeleteForm = !this.confirmProductDeleteForm;
            this.productIndex = {};
            this.categoryIndex = !this.categoryIndex;
        },

        fileUpload(event) {
            this.addProduct.photo_url = event.target.files[0];
            this.picture_create = URL.createObjectURL(this.addProduct.photo_url);
        },

        async addProductAction(id) {

            console.log(this.addProduct);

            if (!this.addProduct.title || !this.addProduct.description ||
                !this.addProduct.price || !this.addProduct.photo_url) {
                this.error = true;
            } else {
                this.error = false;

                let fr = new FormData();

                fr.append('title', this.addProduct.title);
                fr.append('description', this.addProduct.description);
                fr.append('price', this.addProduct.price);
                fr.append('photo_url', this.addProduct.photo_url);

                URL.revokeObjectURL(this.picture_create);

                axios({
                    method: 'post',
                    url: host + 'category/' + id + '/products/store',
                    data: fr,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.token
                    },
                })
                this.addProductInput = !this.addProductInput;
                this.picture_create = null;
                this.addProduct = {};
            }
        },


        fileUploadEdit(event) {
            this.editProduct.photo_url = event.target.files[0];
            this.picture_create = URL.createObjectURL(this.editProduct.photo_url);
        },

        async editProductAction() {
                this.error = false;
                let category_id = this.categoryProductId
                let product_id = this.productIndex.id;

                let fr = new FormData();

                fr.append('title', this.editProduct.title);
                fr.append('description', this.editProduct.description);
                fr.append('price', this.editProduct.price);
                fr.append('photo_url', this.editProduct.photo_url);

                URL.revokeObjectURL(this.picture_create);

                axios({
                    method: 'post',
                    url: host + 'category/' + category_id + '/products/update/' + product_id + '?_method=patch',
                    data: fr,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.token
                    },
                })
                this.editProductInput = !this.editProductInput;
                this.picture_create = null;
                this.productPage = false;
                this.product = await f('get', 'category/' + category_id + '/products');
                this.productList = true;
        },


        saveItems() {
            const user = JSON.stringify(this.user);
            localStorage.setItem('user', user);
        },
    },


    async created() {
        this.category = await f('get', 'category');
        // this.basket = await f('get', 'cart', '', this.token);
    },

    computed: {
        computedList: function () {
            let vm = this
            return this.category.filter(function (item) {
                return item.name.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1
            })
        },
    },
})