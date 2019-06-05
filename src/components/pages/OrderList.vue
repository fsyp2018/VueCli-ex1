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
            <button class="btn btn-outline-danger btn-sm">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
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
                  <div class="form-group col-md-6">
                    <label for="origin_price">購買時間</label>
                    <input
                      type="number"
                      class="form-control"
                      id="origin_price"
                      v-model="tempOrderList.create_at"
                      placeholder="請輸入原價"
                    >
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">Email</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      v-model="tempOrderList.user.email"
                      placeholder="請輸入售價"
                    >
                  </div>
                </div>
                <hr>
                                  <div class="form-row">
                  <div class="form-group">
                    <label for="comment">購買款項</label>
                    <textarea name id="comment" class="form-control" cols="30" rows="10"></textarea>
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
                      placeholder="請輸入原價"
                    >
                  </div>
                <hr>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary">確認</button>
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
      tempOrderList: {        
        user:{
          email:'',
        },
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
        // vm.pagination = response.data.pagination;
      });
    },
    openModal(item) {
      const vm = this;
      // this.isNew = true;
      this.tempOrderList = Object.assign({}, item);
      // this.isNew = false;
      $("#orderModal").modal("show");
    }
  },
  created() {
    this.getOrderList();
  }
};
</script>