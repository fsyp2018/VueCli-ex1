<template>
  <div>
    <!-- <loading :active.sync="isLoading"></loading> -->

    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="openModal(true)">建立新的優惠券</button>
    </div>
    <!-- 優惠券列表 -->
    <table class="table mt-4">
      <thead>
        <tr>
          <th>標題</th>
          <th width="120">優惠代碼</th>
          <th width="120">優惠百分比</th>
          <th width="120">截止日期</th>
          <th width="120">是否啟用</th>
          <th width="120">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in Coupons" :key="item.id">
          <td>{{ item.title }}</td>
          <td>{{ item.code }}</td>
          <td>{{ item.percent }}%</td>
          <td class="text-right">{{ item.due_date|date }}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm" @click="openModal(false,item)">編輯</button>
            <button class="btn btn-outline-danger btn-sm" @click="opendeModal(item)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 分頁 -->
    <nav aria-label="Page navigation example" class="d-flex justify-content-center">
      <ul class="pagination">
        <li class="page-item" :class="{'disabled':!pagination.has_pre}">
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
            @click.prevent="getCoupons(pagination.current_page -1)"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          class="page-item"
          v-for="page in pagination.total_pages"
          :key="page"
          :class="{'active':pagination.current_page === page}"
        >
          <a class="page-link" href="#" @click.prevent="getCoupons(page)">{{page}}</a>
        </li>

        <li class="page-item" :class="{'disabled':!pagination.has_next}">
          <a
            class="page-link"
            href="#"
            aria-label="Next"
            @click.prevent="getCoupons(pagination.current_page +1)"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
    <!-- 新增或編輯 -->
    <div
      class="modal fade"
      id="couponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增優惠券</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    v-model="tempCoupon.title"
                    placeholder="請輸入標題"
                  >
                </div>
                <hr>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="percent">優惠百分比</label>
                    <input
                      type="text"
                      class="form-control"
                      id="percent"
                      v-model="tempCoupon.percent"
                      placeholder="請輸入數字"
                    >
                  </div>
                  <div class="form-group col-md-6">
                    <label for="due_date">截止日期</label>
                    <input
                      type="date"
                      class="form-control"
                      id="due_date"
                      v-model="due_date"
                      placeholder="請輸入日期"
                    >
                  </div>
                </div>
                <hr>
                <div class="form-group">
                  <label for="code">優惠代碼</label>
                  <input
                    type="text"
                    class="form-control"
                    id="code"
                    v-model="tempCoupon.code"
                    placeholder="請輸入代碼"
                  >
                </div>
                <hr>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      v-model="tempCoupon.is_enabled"
                      :true-value="1"
                      :false-value="0"
                      id="is_enabled"
                    >
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateCoupon">確認</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 刪除優惠券 -->
    <div
      class="modal fade"
      id="delcouponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempCoupon.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="decoupons">確認刪除</button>
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
      Coupons: [],
      tempCoupon: {
        title: "",
        is_enabled: 0,
        percent: 100,
        due_date: 0,
        code: ""
      },
      pagination: {},
      isLoading: false,
      isNew: false,
      due_date: new Date()
    };
  },
  methods: {
    getCoupons(page = 1) {
      const api = `${process.env.APIPATH}/api/${
        process.env.CUSTOMPATH
      }/admin/coupons?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log(response.data);
        vm.isLoading = false;
        vm.Coupons = response.data.coupons;
        vm.pagination = response.data.pagination;
      });
    },
    openModal(isNew, item) {
      const vm =this;
      if (isNew) {
        this.tempCoupon = {};
        this.isNew = true;
      } else {
        this.tempCoupon = Object.assign({}, item);
        const dateAndTime = new Date(vm.tempCoupon.due_date * 1000)
          .toISOString()
          .split("T");
        vm.due_date = dateAndTime[0];
        this.isNew = false;
      }
      $("#couponModal").modal("show");
    },
    updateCoupon() {
      const vm = this;
      let api = `${process.env.APIPATH}/api/${
        process.env.CUSTOMPATH
      }/admin/coupon`;
      let httpMethod = "post";

      if (!vm.isNew) {
        api = `${process.env.APIPATH}/api/${
          process.env.CUSTOMPATH
        }/admin/coupon/${vm.tempCoupon.id}`;
        httpMethod = "put";
      }
      vm.due_date = new Date(vm.tempCoupon.due_date * 1000);
      this.$http[httpMethod](api, { data: vm.tempCoupon }).then(response => {
        if (response.data.success) {
          $("#couponModal").modal("hide");
          vm.getCoupons();
        } else {
          $("#couponModal").modal("hide");
          vm.getCoupons();
          console.log("新增失敗");
        }
      });
    },
    opendeModal(item) {
      this.tempCoupon = Object.assign({}, item);
      $("#delcouponModal").modal("show");
    },
    decoupons() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${
        process.env.CUSTOMPATH
      }/admin/coupon/${vm.tempCoupon.id}`;

      this.$http.delete(api).then(response => {
        if (response.data.success) {
          $("#delcouponModal").modal("hide");
          vm.getCoupons();
        } else {
          $("#delcouponModal").modal("hide");
          vm.getCoupons();
          console.log("刪除失敗");
        }
      });
    }
  },
  created() {
    this.getCoupons();
  },
  watch: {
    due_date() {
      const vm = this;
      const timestamp = Math.floor(new Date(vm.due_date) / 1000);
      vm.tempCoupon.due_date = timestamp;
    }
  }
};
</script>