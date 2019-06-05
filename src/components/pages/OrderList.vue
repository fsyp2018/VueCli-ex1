<template>
  <div>
    <!-- 優惠券列表 -->
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">購買時間</th>
          <th width="120">Email</th>
          <th>購買款項</th>
          <th width="120">應付金額</th>
          <th width="120">是否付款</th>
          <th width="120">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in OrderList" :key="item.id">
          <td>{{ item.create_at|date }}</td>
          <td>{{ item.user.email }}</td>
          <td>
            <ul class="list-unstyled">
              <li v-for="(product, i) in item.products" :key="i">
                {{ product.product.title }} 數量：{{ product.qty }}
                {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td>{{ item.total | currency }}</td>
          <td class="text-success" v-if="item.is_paid">已付款</td>
          <td class="text-muted" v-else>尚未付款</td>
          <td>
            <button class="btn btn-outline-primary btn-sm" @click="openModal(item)">編輯</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 分頁 -->
    <nav aria-label="Page navigation example" class="d-flex justify-content-center">
      <ul class="pagination">
        <li class="page-item" :class="{'disabled':!pagination.has_pre}">
          <a class="page-link" href="#" aria-label="Previous"
           @click.prevent="getOrderList(pagination.current_page -1)">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item" v-for="page in pagination.total_pages" :key="page"
        :class="{'active':pagination.current_page === page}">
          <a class="page-link" href="#" @click.prevent="getOrderList(page)">{{page}}</a>
        </li>

        <li class="page-item" :class="{'disabled':!pagination.has_next}">
          <a class="page-link" href="#" aria-label="Next" @click.prevent="getOrderList(pagination.current_page +1)">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
    <!-- 編輯 -->
    <div
      class="modal fade"
      id="orderModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>訂單內容</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-8">
                <div class="form-row">
                  <!-- <div class="form-group col-md-6">
                    <label for="origin_price">購買時間</label>
                    <input
                      type="number"
                      class="form-control"
                      id="origin_price"
                      v-model="tempOrderList.create_at"
                      placeholder
                    >
                  </div>-->
                  <div class="form-group col-md-6">
                    <label for="price">Email</label>
                    <input
                      type="mail"
                      class="form-control"
                      id="price"
                      v-model="tempOrderList.user.email"
                      placeholder
                    >
                  </div>
                </div>
                <hr>
                <div class="form-row">
                  <div class="form-group">
                    <label for="comment">購買款項</label>
                    <ul class="list-unstyled">
                      <li v-for="(product, i) in tempOrderList.products" :key="i">
                        {{ product.product.title }}數量：
                        <input
                          type="number"
                          class="form-control"
                          id="price"
                          v-model="product.qty"
                          placeholder
                        >
                        {{ product.product.unit }}
                      </li>
                    </ul>
                  </div>
                </div>
                <hr>
                <div class="form-group col-md-6">
                  <label for="origin_price">應付金額</label>
                  <input
                    type="number"
                    class="form-control"
                    id="origin_price"
                    v-model="tempOrderList.total"
                    placeholder
                  >
                </div>
                
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateOrder">確認</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//目前不認識'$'所以要加入import jquery
import $ from "jquery";
export default {
  data() {
    return {
      OrderList: {},
      pagination: {},
      tempOrderList: {
        user: {}
      }
    };
  },
  methods: {
    getOrderList(page = 1) {
      const api = `${process.env.APIPATH}/api/${
        process.env.CUSTOMPATH
      }/admin/orders?page=${page}`;
      const vm = this;
      //   vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log(response.data);
        // vm.isLoading = false;
        vm.OrderList = response.data.orders;
        vm.pagination = response.data.pagination;
      });
    },
    openModal(item) {
      const vm = this;
      // this.isNew = true;
      vm.tempOrderList = Object.assign({}, item);
      // this.isNew = false;
      $("#orderModal").modal("show");
    },
    updateOrder() {
      const vm = this;
      let api = `${process.env.APIPATH}/api/${
        process.env.CUSTOMPATH
      }/admin/order/${vm.tempOrderList.id}`;
      this.$http.put(api, { data: vm.tempOrderList }).then(response => {
        if (response.data.success) {
          $("#orderModal").modal("hide");
          vm.getOrderList();
        } else {
          $("#orderModal").modal("hide");
          vm.getOrderList();
          console.log("新增失敗");
        }
      });
    }
  },
  created() {
    this.getOrderList();
  }
};
</script>